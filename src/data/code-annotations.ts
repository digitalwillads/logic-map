import type { CodeAnnotation } from "../components/CodeView";

// ============================================================
// EMAIL TRIAGE
// ============================================================

export const emailTriagePipeline: CodeAnnotation = {
  file: "src/email/pipeline.rs",
  sections: [
    {
      title: "Blacklist filter - checking user-defined rules",
      code: `pub fn check_blacklist(rules: &[EmailFilterRule], sender: &str, subject: &str) -> Option<String> {
    let sender_lower = sender.to_lowercase();
    let subject_lower = subject.to_lowercase();
    let sender_domain = extract_email_domain(&sender_lower);

    for rule in rules {
        let value_lower = rule.value.to_lowercase();
        let matched = match rule.rule_type.as_str() {
            "sender" => {
                if sender_lower.contains(&value_lower) {
                    Some(format!("Sender '{}' matches rule: {}", sender, rule.value))
                } else { None }
            }
            "domain" => {
                sender_domain.as_ref().and_then(|domain| {
                    if domain.contains(&value_lower) {
                        Some(format!("Domain '{}' matches rule: {}", domain, rule.value))
                    } else { None }
                })
            }
            "keyword" => {
                if subject_lower.contains(&value_lower) || sender_lower.contains(&value_lower) {
                    Some(format!("Keyword '{}' found", rule.value))
                } else { None }
            }
            _ => None,
        };
        if let Some(reason) = matched { return Some(reason); }
    }
    None
}`,
      explanation: "First line of defense. Before we spend money calling Claude, check the email against the user's own blacklist rules. Three types: exact sender match, domain match (e.g. block everything from @noreply.github.com), and keyword match (searches both subject and sender). If any rule hits, the email is filtered immediately with the reason logged. Everything is case-insensitive.",
    },
    {
      title: "AI filter - Claude decides keep or filter",
      code: `pub async fn ai_filter_email(
    http_client: &reqwest::Client,
    sender: &str, subject: &str, body_preview: &str,
) -> Result<Option<String>, String> {
    let truncated_body = truncate_str(body_preview, 1000);

    let prompt = format!(r#"You are an email triage assistant for a digital marketing agency owner.
Determine whether this email should be FILTERED OUT or KEPT for review.

FILTER OUT: Automated receipts, calendar invites, system notifications,
newsletters, sales pitches, social media notifications, account security
(unless suspicious), automated onboarding emails, spam.

KEEP: Direct personal messages expecting a reply, client communications,
emails where a human is asking a specific question, urgent alerts.

When in doubt, FILTER.

From: {sender}  Subject: {subject}  Body: {body}

Respond EXACTLY: KEEP or FILTER: <reason>"#);

    // ... calls Claude API non-streaming, parses response ...
    if response_text.starts_with("FILTER:") {
        Ok(Some(response_text["FILTER:".len()..].trim().to_string()))
    } else {
        Ok(None) // KEEP
    }
}`,
      explanation: 'Second line of defense. If the blacklist didn\'t catch it, we ask Claude. The body is truncated to 1,000 characters to keep cost down - we don\'t need the full email to classify it. The prompt is tuned for Will\'s needs: filter receipts, calendar invites, newsletters, sales pitches. Keep real human messages that need a response. "When in doubt, FILTER" - Will would rather miss a newsletter than get buried in noise. This is a non-streaming call since we just need a short classification.',
    },
    {
      title: "Calendar context gathering",
      code: `pub async fn gather_context(
    http_client: &reqwest::Client,
    user_access_token: &str,
    sender_email: &str,
) -> String {
    let now = chrono::Utc::now();
    let thirty_days_ago = now - chrono::Duration::days(30);

    let calendar_client = CalendarClient::new(http_client.clone(), user_access_token.to_string());

    let result = calendar_client.list_events(
        "primary",
        Some(&time_min), Some(&time_max),
        Some(&email_addr),  // searches by attendee email
        5,                   // max 5 recent meetings
        None,
    ).await;

    match result {
        Err(_) => String::new(),  // fail silently - never block on optional enrichment
        Ok(events) => events.iter().map(|event| {
            format!("- Meeting: '{}' on {}", event.summary, event.start_date)
        }).collect::<Vec<_>>().join("\\n")
    }
}`,
      explanation: "Before generating the AI summary, we look up the last 30 days of calendar events involving the email sender. This gives Claude context like \"you met with this person last week about Q2 Planning.\" If the Calendar API fails, we return an empty string and summarize without context - we never block the pipeline on optional enrichment. Limited to 5 events to keep the context concise.",
    },
    {
      title: "AI summary generation",
      code: `pub async fn ai_summarize_email(
    http_client: &reqwest::Client,
    sender: &str, subject: &str, body: &str, context: &str,
) -> Result<String, String> {
    let truncated_body = truncate_str(body, 3000);

    let context_section = if context.is_empty() {
        String::new()
    } else {
        format!("\\nContext about the sender:\\n{}", context)
    };

    let prompt = format!(r#"Summarize this email in 1-2 sentences.
Focus on what the sender wants and any action required.{context_section}

From: {sender}  Subject: {subject}  Body: {body}

Summary (1-2 sentences):"#);

    // ... calls Claude API, returns summary text ...
}`,
      explanation: "For emails that survive both filters, we generate a 1-2 sentence summary. The body gets 3,000 characters (more than the filter step) because we need enough content to write a good summary. The calendar context is injected if available. The prompt asks for action-oriented summaries - \"what does the sender want\" and \"what action is required\" - because the whole point is helping Will decide what to do with each email quickly.",
    },
    {
      title: "Main pipeline orchestrator",
      code: `pub async fn process_email(
    app_state: &AppState, user_id: i32, user_access_token: &str,
    gmail_message: &GmailMessage, filter_rules: &[EmailFilterRule],
) -> Result<Option<i32>, String> {
    // 1. Skip if already in queue (free DB check)
    if database::email_exists_in_queue(&mut conn, gmail_message_id, user_id)? {
        return Ok(None);
    }

    // 2. Parse the raw Gmail message
    let parsed = parse_email(gmail_message);

    // 3. Check blacklist rules (free, instant)
    if let Some(reason) = check_blacklist(filter_rules, sender, subject) {
        database::insert_email_queue_entry(/* filtered_out=true */)?;
        return Ok(Some(id));
    }

    // 4. Ask Claude to classify (costs ~$0.001, takes ~1s)
    if let Ok(Some(reason)) = ai_filter_email(/* ... */).await {
        database::insert_email_queue_entry(/* filtered_out=true */)?;
        return Ok(Some(id));
    }

    // 5. Gather calendar context (free, may fail silently)
    let context = gather_context(/* ... */).await;

    // 6. Generate AI summary (costs ~$0.001, takes ~1s)
    let ai_summary = ai_summarize_email(/* ... */).await.ok();

    // 7. Store the kept email with its summary
    database::insert_email_queue_entry(/* filtered_out=false, ai_summary */)?;
    Ok(Some(id))
}`,
      explanation: 'The orchestrator runs the full pipeline for a single email. The order is deliberate: cheapest checks first. (1) Skip duplicates. (2) Parse. (3) Run blacklist rules (free). (4) Only if blacklist passed, call Claude to classify (~$0.001). (5) Only if kept, gather calendar context. (6) Only if kept, generate summary. Each filter step short-circuits - if filtered at step 3, we never pay for steps 4-6. A kept email costs two Claude calls (filter + summarize), a blacklisted one costs zero.',
    },
  ],
};

export const emailTriagePolling: CodeAnnotation = {
  file: "src/email/polling.rs",
  sections: [
    {
      title: "Background polling loop",
      code: `pub fn start_polling_task(app_state: AppState, poll_interval_secs: u64) {
    tokio::spawn(async move {
        let interval = tokio::time::Duration::from_secs(poll_interval_secs);
        loop {
            match poll_all_users(&app_state).await {
                Ok(user_count) => { /* log success */ }
                Err(e) => { /* log error, continue */ }
            }
            tokio::time::sleep(interval).await;
        }
    });
}`,
      explanation: "Spawns a tokio task that runs forever. Every poll_interval_secs (120 seconds), it wakes up and polls all users. This is the development stopgap - in production, Gmail webhooks will trigger processing immediately. The loop never panics - errors are logged and the next cycle continues.",
    },
    {
      title: "Per-user email fetch and deduplication",
      code: `pub async fn poll_user_emails(/* ... */) -> Result<(), String> {
    let access_token = get_valid_access_token(app_state, user_id).await?;
    let gmail = GmailClient::new(app_state.reqwest_client.clone(), access_token);

    let message_list = gmail
        .list_messages_by_labels(&["INBOX", "UNREAD"], None, 20)
        .await?;

    let filter_rules = database::list_email_filter_rules(&mut conn, user_id)?;

    // Deduplicate by thread: only process newest message per thread
    let mut seen_threads: HashSet<String> = HashSet::new();
    let mut new_message_ids: Vec<String> = Vec::new();
    for msg_ref in &message_list.messages {
        if seen_threads.contains(&msg_ref.thread_id) { continue; }
        seen_threads.insert(msg_ref.thread_id.clone());

        if !database::email_exists_in_queue(&mut conn, &msg_ref.id, user_id)?
           && !database::email_thread_exists_in_queue(&mut conn, &msg_ref.thread_id, user_id)? {
            new_message_ids.push(msg_ref.id.clone());
        }
    }

    for message_id in &new_message_ids {
        let full_msg = gmail.get_message(message_id).await?;
        pipeline::process_email(app_state, user_id, &access_token, &full_msg, &filter_rules).await;
    }
    Ok(())
}`,
      explanation: "Fetches up to 20 unread inbox messages, then deduplicates by thread - if a thread has multiple unread messages, only the newest one gets processed. Also checks if the thread is already in the queue. This deduplication matters because Gmail returns individual messages but users think in threads. Without it, a 5-message email thread would show up as 5 separate items in the triage queue.",
    },
  ],
};

// ============================================================
// CHAT ENGINE
// ============================================================

export const chatEndpoint: CodeAnnotation = {
  file: "src/chat/chat_endpoint.rs",
  sections: [
    {
      title: "System prompt - injecting user context",
      code: `let system_prompt = format!(
    "{base_prompt}\\n\\nUser context:\\n\
     - Name: {name}\\n\
     - Email: {email}\\n\
     - Timezone: {tz}\\n\
     - Local time: {local_time}",
    base_prompt = SYSTEM_PROMPT,
    name = user.name,
    email = user.email,
    tz = request.user_timezone,
    local_time = request.user_local_time,
);`,
      explanation: "Every chat request gets a system prompt with the user's name, email, timezone, and current local time injected. This is how Claude knows what 'today' and 'this week' mean - without it, date calculations would use UTC and be wrong for US timezones. The base prompt includes instructions for email confirmation, calendar handling, recording search strategy, and Chad Ads conversation management.",
    },
    {
      title: "The tool execution loop (max 50 iterations)",
      code: `let max_iterations = 50;
for iteration in 0..max_iterations {
    let result = claude.stream_response(&api_messages, &system_prompt, &tool_defs, &tx).await?;

    // Accumulate text and send to UI via SSE
    for block in &result.content_blocks {
        if let ContentStreamBlock::Text(text) = block {
            accumulated_text.push_str(text);
        }
    }

    // If no tool calls, we're done
    if result.tool_calls.is_empty() { break; }

    // Execute each tool with timeout
    for tc in &result.tool_calls {
        let timeout = if tc.name == "ask_chad_ads" { 1800 } else { 300 };
        let tool_result = tokio::time::timeout(
            Duration::from_secs(timeout),
            executor.execute(&tc.id, &tc.name, tc.input.clone()),
        ).await;
        // Add result back to message history
    }

    // Save progress to DB after each iteration
    save_assistant_message(&mut conn, thread_id, &accumulated_text).await;
}`,
      explanation: "The core loop: send messages to Claude, get back text and tool calls, execute tools, feed results back, repeat. Max 50 iterations prevents infinite loops. Tool timeout is 300 seconds by default, but Chad Ads gets 1800 seconds (30 minutes) because Google Ads queries can be slow. After each iteration, the assistant's accumulated text is saved to the database so the user sees progress even if the connection drops. The loop ends when Claude stops calling tools.",
    },
    {
      title: "SSE streaming to the browser",
      code: `pub async fn chat_stream(/* ... */) -> Sse<impl Stream<Item = ...>> {
    // start_generation spawns two tasks:
    // 1. The generation task (tool loop above)
    // 2. A relay task that forwards events to SSE

    let (tx, _) = tokio::sync::broadcast::channel(256);

    // Generation task sends events: Text, ToolCall, ToolResult, ToolProgress, Done
    // Browser receives them as SSE events and renders in real-time

    Sse::new(BroadcastStream::new(rx).map(|event| {
        Ok(Event::default().event(event_type_str(&event)).data(event_data(&event)))
    }))
}`,
      explanation: "The endpoint returns a Server-Sent Events stream. Two async tasks run: one does the Claude loop and tool execution, the other relays events to the browser. Event types include text (Claude's words appearing), tool_call (which tool is being called), tool_result (what the tool returned), tool_progress (long-running tool updates), and done. The browser renders these in real-time so the user sees Claude thinking and acting.",
    },
  ],
};

export const toolExecutor: CodeAnnotation = {
  file: "src/chat/tool_executor.rs",
  sections: [
    {
      title: "Tool dispatch and scope checking",
      code: `impl ToolExecutor {
    pub async fn execute(&self, id: &str, name: &str, input: Value) -> ToolResult {
        match name {
            "search_emails" => { let client = self.get_gmail_client().await?; /* ... */ }
            "send_email"    => { let client = self.get_gmail_send_client().await?; /* ... */ }
            "get_calendar_events" => { let client = self.get_calendar_client().await?; /* ... */ }
            "list_tasks"    => { let client = self.get_tasks_client().await?; /* ... */ }
            "ask_chad_ads"  => { let client = self.get_chad_ads_client().await?; /* ... */ }
            // ... 30+ more tools ...
            _ => ToolResult::error(format!("Unknown tool: {}", name)),
        }
    }

    async fn get_gmail_send_client(&self) -> Result<GmailClient, ToolResult> {
        // Check that user has granted gmail.send scope
        let tokens = database::get_google_tokens(&mut conn, self.user_id)?;
        if !tokens.scopes.contains("gmail.send") {
            return Err(ToolResult::error("Missing gmail.send scope - ask user to authorize"));
        }
        let token = refresh_access_token(app_state, self.user_id).await?;
        Ok(GmailClient::new(self.http_client.clone(), token))
    }
}`,
      explanation: "The dispatcher routes tool calls by name to the right handler. Before executing, each client getter validates OAuth scopes - if the user hasn't granted gmail.send, Claude gets a clear error message telling it to ask the user to authorize. This prevents cryptic 403 errors from Google. The access token is refreshed before every call (proactive, not reactive). Output is truncated at 256KB to prevent context overflow.",
    },
  ],
};

export const claudeClient: CodeAnnotation = {
  file: "src/chat/claude_client.rs",
  sections: [
    {
      title: "Request construction with advisor and web search",
      code: `pub async fn stream_response(&self, messages: &[ApiMessage], system: &str,
    tool_defs: &[ToolDefinition], tx: &Sender<StreamEvent>
) -> Result<StreamResult, String> {
    let mut tools: Vec<Value> = tool_defs.iter().map(/* serialize */).collect();

    // Add web search server tool (max 5 searches per response)
    tools.push(json!({
        "type": "web_search_20250305",
        "name": "web_search",
        "max_uses": 5
    }));

    // Add advisor server tool (Claude Opus for hard questions, max 3 uses)
    tools.push(json!({
        "type": "advisor_20260301",
        "name": "advisor",
        "model": "claude-opus-4-6",
        "max_uses": 3,
        "cache_control": { "type": "ephemeral" }  // 5-minute TTL
    }));

    let request = json!({
        "model": "claude-sonnet-4-6",
        "max_tokens": 16384,
        "system": system,
        "tools": tools,
        "messages": messages,
        "stream": true
    });
    // ... sends request, processes SSE stream ...
}`,
      explanation: "Builds the API request with three types of tools: (1) custom tools like Gmail/Calendar/Tasks that the ToolExecutor handles, (2) web search (up to 5 searches per response for looking up current information), and (3) an advisor tool that escalates hard questions to Claude Opus (up to 3 uses, with ephemeral caching so repeated similar questions are cheap). The main model is Sonnet for speed, Opus for depth when needed.",
    },
  ],
};

// ============================================================
// MEETING REVIEW
// ============================================================

export const meetingPipeline: CodeAnnotation = {
  file: "src/meetings/pipeline.rs",
  sections: [
    {
      title: "Main pipeline - processing a recording",
      code: `pub async fn process_recording(
    app_state: &AppState, user_id: i32, user_email: &str,
    user_name: &str, recording: &Recording,
) -> Result<Option<i32>, String> {
    // Skip if already processed
    if database::meeting_exists_in_queue(&mut conn, recording_id, user_id)? {
        return Ok(None);
    }

    // Fetch transcript from recording service
    let transcript_response = recorder.get_transcript(recording_id).await?;
    if transcript_response.segments.is_empty() { return Ok(None); }

    // Format transcript as "Speaker: text" lines
    let transcript_lines: Vec<String> = transcript_response.segments.iter()
        .filter_map(|seg| {
            let text = seg.text.as_deref()?.trim();
            if text.is_empty() { return None; }
            Some(format!("{}: {}", seg.speaker.as_deref().unwrap_or("Unknown"), text))
        }).collect();

    // Extract tasks using Barbara Ann (Claude + full tool access)
    let extracted_tasks = extract_tasks(
        app_state, user_id, user_email, user_name,
        meeting_name, &transcript_text, &attendees,
    ).await;

    // Store meeting + draft tasks in database
    let meeting_id = database::insert_meeting_queue_entry(/* ... */)?;
    for task in &tasks {
        database::insert_meeting_draft_task(&mut conn, meeting_id, &task.title,
            task.suggested_assignee.as_deref(), task.assignee_email.as_deref())?;
    }
    Ok(Some(meeting_id))
}`,
      explanation: "Processes one recording through the full pipeline: skip duplicates, fetch the transcript, format it with speaker labels, run Barbara Ann to extract tasks, then store everything. The transcript is formatted as simple \"Speaker: text\" lines because that's what Claude needs to understand who said what. Empty segments are filtered out. If the transcript is empty (recording with no speech), the recording is skipped entirely.",
    },
    {
      title: "Barbara Ann - AI task extraction with tool access",
      code: `async fn extract_tasks(
    app_state: &AppState, user_id: i32, user_email: &str, user_name: &str,
    meeting_name: &str, transcript: &str, attendees: &[String],
) -> Result<Vec<ExtractedTask>, String> {
    let claude = ClaudeClient::new()?;

    let tool_defs = tools::tool_definitions(true); // full tool access
    let executor = ToolExecutor::new(
        app_state.clone(), user_id, auth_token, true, tx,
        "America/New_York".to_string(),  // default timezone for background work
        user_email.to_string(),
        chrono::Utc::now().format("%Y-%m-%dT%H:%M:%SZ").to_string(),
    );

    let system_prompt = "You are Barbara Ann, an executive assistant for Digital Will.
You are analyzing a meeting transcript to extract actionable tasks.
You have access to tools - use them to look up context:
- Search emails for prior conversations with participants
- Check the calendar for related events

Your final message MUST end with a JSON array:
[{\\"title\\": \\"..\\", \\"suggested_assignee\\": \\"..\\", \\"assignee_email\\": \\"..\\"}]";

    let mut api_messages = vec![ApiMessage { role: "user", content: user_message }];

    // Barbara Ann gets up to 10 iterations to gather context and extract tasks
    for iteration in 0..10 {
        let result = claude.stream_response(&api_messages, &system_prompt, &tool_defs, &tx).await?;

        for block in &result.content_blocks {
            if let ContentStreamBlock::Text(text) = block { final_text.push_str(text); }
        }

        if result.tool_calls.is_empty() { break; }  // done gathering context

        // Execute tools (email search, calendar lookup, etc.)
        for tc in &result.tool_calls {
            let tool_result = executor.execute(&tc.id, &tc.name, tc.input.clone()).await;
            // feed results back to Claude
        }
        final_text.clear();  // we want the LAST response, not accumulated
    }

    // Parse JSON array from Barbara Ann's final response
    let tasks: Vec<ExtractedTask> = serde_json::from_str(&extract_json_array(&final_text)?)?;
    Ok(tasks)
}`,
      explanation: "Barbara Ann is a full Claude instance with access to ALL the same tools as the chat interface - Gmail, Calendar, Recordings, Tasks. She gets up to 10 iterations to gather context before extracting tasks. A typical flow: she reads the transcript, searches emails for context about the client, checks the calendar for upcoming meetings, then produces a JSON array of tasks with suggested assignees. The transcript is truncated to 30KB to stay within context limits. The JSON extraction handles both markdown code blocks and raw arrays.",
    },
  ],
};

export const meetingPolling: CodeAnnotation = {
  file: "src/meetings/polling.rs",
  sections: [
    {
      title: "Polling loop with seed mode",
      code: `pub fn start_polling_task(app_state: AppState, poll_interval_secs: u64) {
    tokio::spawn(async move {
        let interval = tokio::time::Duration::from_secs(poll_interval_secs);
        let mut first_poll = true;

        loop {
            let seed_mode = first_poll;
            poll_all_users(&app_state, seed_mode).await;
            first_poll = false;
            tokio::time::sleep(interval).await;
        }
    });
}`,
      explanation: "Similar to email polling but with a seed mode twist: the first poll only fetches 3 recordings per user (to avoid processing a huge backlog on startup), subsequent polls fetch 10. This is the development stopgap - webhooks from the recording service will replace this.",
    },
    {
      title: "Per-user recording fetch",
      code: `pub async fn poll_user_meetings(
    app_state: &AppState, user_id: i32, user_email: &str,
    user_name: &str, seed_mode: bool,
) -> Result<(), String> {
    let recorder = RecorderClient::new(app_state.reqwest_client.clone(), api_key);
    let limit = if seed_mode { 3 } else { 10 };

    // Search recordings where this user was a participant
    let recordings = recorder.search_by_participant(Some(user_email), None, limit, 0).await?;

    // Only process recordings that have transcripts
    let with_transcripts: Vec<_> = recordings.iter()
        .filter(|r| r.has_transcript).collect();

    // Skip recordings already in the queue
    let mut new_recordings = Vec::new();
    for recording in &with_transcripts {
        if !database::meeting_exists_in_queue(&mut conn, &recording.id, user_id)? {
            new_recordings.push(recording);
        }
    }

    // Process each new recording through the pipeline
    for recording in &new_recordings {
        pipeline::process_recording(app_state, user_id, user_email, user_name, recording).await;
    }
    Ok(())
}`,
      explanation: "For each user, searches recordings by participant email, filters to those with transcripts (no point processing a recording with no speech), skips any already in the queue, and sends the rest through the pipeline. The has_transcript flag from the recording service saves us from fetching transcripts that don't exist.",
    },
  ],
};

// ============================================================
// GMAIL INTEGRATION
// ============================================================

export const gmailClient: CodeAnnotation = {
  file: "src/gmail/client.rs",
  sections: [
    {
      title: "RFC 2822 email construction",
      code: `pub fn build_rfc2822_message(
    from: &str, to: &[&str], cc: &[&str], bcc: &[&str],
    subject: &str, body: &str,
    in_reply_to: Option<&str>, references: Option<&str>,
) -> String {
    let mut headers = String::new();
    headers.push_str(&format!("From: {}\\r\\n", from));
    headers.push_str(&format!("To: {}\\r\\n", to.join(", ")));
    if !cc.is_empty() { headers.push_str(&format!("Cc: {}\\r\\n", cc.join(", "))); }
    if !bcc.is_empty() { headers.push_str(&format!("Bcc: {}\\r\\n", bcc.join(", "))); }
    headers.push_str(&format!("Subject: {}\\r\\n", subject));
    headers.push_str("MIME-Version: 1.0\\r\\n");
    headers.push_str("Content-Type: text/plain; charset=utf-8\\r\\n");

    if let Some(reply_to) = in_reply_to {
        headers.push_str(&format!("In-Reply-To: {}\\r\\n", reply_to));
    }
    if let Some(refs) = references {
        headers.push_str(&format!("References: {}\\r\\n", refs));
    }

    format!("{}\\r\\n{}", headers, body)
}`,
      explanation: "Builds raw email messages in RFC 2822 format - the standard that all email systems understand. The In-Reply-To and References headers are critical for threading: without them, a reply would show up as a new conversation instead of being grouped with the original thread. The message is base64url-encoded before sending to the Gmail API. This function is shared by send_email, reply_to_email, reply_all, and save_draft.",
    },
    {
      title: "Email body extraction from Gmail's MIME structure",
      code: `fn extract_body(payload: &GmailPayload) -> (String, String) {
    // Try direct body first
    if let Some(body) = &payload.body {
        if let Some(data) = &body.data {
            let decoded = base64url_decode(data);
            return (decoded.clone(), decoded);
        }
    }

    // Walk multipart structure recursively
    let (plain_parts, html_parts) = extract_parts_recursive(&payload.parts);

    // Prefer text/plain over text/html
    if !plain_parts.is_empty() {
        return (plain_parts.join("\\n"), html_parts.join("\\n"));
    }
    (html_parts.join("\\n"), html_parts.join("\\n"))
}

fn extract_parts_recursive(parts: &[GmailPart]) -> (Vec<String>, Vec<String>) {
    let mut plain = Vec::new();
    let mut html = Vec::new();
    for part in parts {
        match part.mime_type.as_deref() {
            Some("text/plain") => { /* decode and collect */ }
            Some("text/html")  => { /* decode and collect */ }
            Some(t) if t.starts_with("multipart/") => {
                // Recurse into nested parts
                let (p, h) = extract_parts_recursive(&part.parts);
                plain.extend(p); html.extend(h);
            }
            _ => {}
        }
    }
    (plain, html)
}`,
      explanation: "Gmail stores email bodies as nested MIME structures - a single email might have a text/plain part, an HTML part, and attachments, all nested inside multipart/alternative containers. This code walks the tree recursively, collecting all text/plain and text/html parts. It prefers text/plain because that's what Claude works best with - HTML markup just adds noise. The base64url decoding handles Gmail's encoding format.",
    },
  ],
};

// ============================================================
// CALENDAR INTEGRATION
// ============================================================

export const calendarClient: CodeAnnotation = {
  file: "src/calendar/client.rs",
  sections: [
    {
      title: "Multi-calendar event aggregation and deduplication",
      code: `pub async fn list_events_all_calendars(
    client: &CalendarClient,
    time_min: Option<&str>, time_max: Option<&str>,
    query: Option<&str>, max_results: u32, time_zone: Option<&str>,
) -> Result<Vec<ParsedEvent>, String> {
    let calendars = client.list_calendars().await?;

    // Query each calendar and deduplicate by iCalUID
    let mut seen: HashMap<String, ParsedEvent> = HashMap::new();

    for cal in &calendars {
        match client.list_events(&cal.id, time_min, time_max, query, max_results, time_zone).await {
            Ok(events) => {
                for event in events {
                    let parsed = parse_event(&event, &cal.summary);
                    if let Some(existing) = seen.get_mut(&event.i_cal_uid) {
                        // Duplicate - append source calendar name
                        existing.source_calendars.push(cal.summary.clone());
                    } else {
                        seen.insert(event.i_cal_uid.clone(), parsed);
                    }
                }
            }
            Err(e) => { /* log and continue - don't fail on one calendar */ }
        }
    }

    let mut results: Vec<ParsedEvent> = seen.into_values().collect();
    results.sort_by(|a, b| a.start_time.cmp(&b.start_time));
    Ok(results)
}`,
      explanation: "When a user asks 'what's on my calendar tomorrow?', we need to search ALL their calendars - personal, work, shared team calendars. This iterates through each one, deduplicates by iCalUID (the same event on multiple calendars has the same UID), and returns a sorted list. Errors on individual calendars are logged but don't fail the whole query - if one shared calendar is down, the user still sees their other events.",
    },
  ],
};

// ============================================================
// RECORDER INTEGRATION
// ============================================================

export const recorderTools: CodeAnnotation = {
  file: "src/chat/tools/recorder.rs",
  sections: [
    {
      title: "Transcript fetching and formatting",
      code: `pub async fn get_meeting_transcript(
    client: &RecorderClient, recording_id: &str,
) -> ToolResult {
    let transcript = client.get_transcript(recording_id).await?;

    let formatted: Vec<String> = transcript.segments.iter()
        .filter_map(|seg| {
            let text = seg.text.as_deref()?.trim();
            if text.is_empty() { return None; }
            let speaker = seg.speaker.as_deref().unwrap_or("Unknown");
            let start = format_ms(seg.start_ms);
            let end = format_ms(seg.end_ms);
            Some(format!("[{} - {} to {}] {}", speaker, start, end, text))
        }).collect();

    ToolResult::success(formatted.join("\\n"))
}

fn format_ms(ms: Option<i64>) -> String {
    match ms {
        Some(ms) => {
            let secs = ms / 1000;
            format!("{:02}:{:02}:{:02}", secs / 3600, (secs % 3600) / 60, secs % 60)
        }
        None => "??:??:??".to_string(),
    }
}`,
      explanation: "Formats meeting transcripts for Claude to read. Each segment gets a speaker label and timestamps in HH:MM:SS format (converted from milliseconds). Empty segments are filtered out. The format is designed for readability: \"[Will Arnett - 00:02:15 to 00:02:32] We need to increase the social budget by 15%.\" This is the same format used by both the chat tools and the meeting review pipeline.",
    },
    {
      title: "Two-step event-to-transcript lookup",
      code: `pub async fn get_meeting_transcript_by_event(
    client: &RecorderClient, event_id: &str, user_email: Option<&str>,
) -> ToolResult {
    // Step 1: Find recording linked to this calendar event
    let search = client.search_by_event(event_id).await?;
    let recordings: Vec<_> = search.recordings.iter()
        .filter(|r| r.has_transcript).collect();

    if recordings.is_empty() {
        return ToolResult::error("No recording with transcript found for this event");
    }

    // Step 2: Fetch the transcript
    let recording = recordings[0];
    let transcript = client.get_transcript(&recording.id).await?;

    // Format and return with recording metadata
    ToolResult::success(format!(
        "Recording: {}\\nDuration: {} min\\nAttendees: {}\\n\\nTranscript:\\n{}",
        recording.meeting_name, recording.duration_seconds / 60,
        attendee_list, formatted_transcript
    ))
}`,
      explanation: "The most common path for finding transcripts: user mentions a meeting, Claude looks up the calendar event, then uses the event ID to find the linked recording. Two API calls chained together. Picks the first recording that has a transcript (some recordings may still be processing). Returns the transcript with metadata so Claude has the full picture - who was there, how long it was, and what was said.",
    },
  ],
};

// ============================================================
// CHAD ADS INTEGRATION
// ============================================================

export const chadAdsTools: CodeAnnotation = {
  file: "src/chat/tools/chad_ads.rs",
  sections: [
    {
      title: "Multi-turn conversation with Google Ads API",
      code: `pub async fn ask_chad_ads(
    app_state: &AppState, user_id: i32, client: &ChadAdsClient,
    messages: &[ChadAdsMessage], tx: &Sender<StreamEvent>, tool_use_id: &str,
) -> ToolResult {
    // Filter out empty assistant messages (prevents API errors)
    let clean_messages: Vec<_> = messages.iter()
        .filter(|m| !(m.role == "assistant" && m.content.is_empty()))
        .collect();

    // Stream response from Chad Ads API
    let response = client.send_message(&clean_messages, customer_id).await?;

    // Build updated conversation history with customer_id marker
    let history_json = serde_json::to_string(&updated_messages)?;
    let output = format!(
        "{}\\n\\n[CHAD_ADS_CONVERSATION_HISTORY:customer_id={}:{}]",
        response.text, customer_id, history_json
    );

    ToolResult::success(output)
}`,
      explanation: "Chad Ads wraps Google Ads in a conversational API. Each call includes the full conversation history so follow-up questions work ('now show me last month' after asking about this month). The history is stored as a JSON marker in the tool output text - not in the database - so it persists across tool loop iterations but is lost between chat sessions. Empty assistant messages are filtered because the API rejects them. The customer_id tag lets Claude track which ad account the conversation is about.",
    },
    {
      title: "Customer auto-selection",
      code: `pub async fn list_customers(
    app_state: &AppState, user_id: i32, admin_secret: &str,
) -> ToolResult {
    let customers = client.list_customers().await?;

    if customers.len() == 1 {
        // Auto-select the only account
        database::update_chad_ads_customer(&mut conn, user_id, &customers[0].id)?;
        ToolResult::success(format!("Auto-selected: {} ({})", customers[0].name, customers[0].id))
    } else {
        // Show list for user to choose
        let list = customers.iter()
            .map(|c| format!("- {} (ID: {})", c.name, c.id))
            .join("\\n");
        ToolResult::success(format!("Multiple accounts:\\n{}\\nUse select_customer to choose.", list))
    }
}`,
      explanation: "When listing Google Ads accounts, if there's only one, it's auto-selected - no need to ask 'which account?' every time. For users managing multiple client accounts, it shows a list and asks Claude to use select_customer with the right ID. The selected customer_id is stored in the database so it persists across sessions.",
    },
  ],
};

// ============================================================
// GOOGLE TASKS INTEGRATION
// ============================================================

export const tasksTools: CodeAnnotation = {
  file: "src/chat/tools/tasks.rs",
  sections: [
    {
      title: "Outstanding tasks across all lists",
      code: `pub async fn get_outstanding_tasks(
    client: &TasksClient, tasklist_id: Option<&str>,
    due_max: Option<&str>, progress: ProgressSender, user_email: &str,
) -> ToolResult {
    // If no specific list, iterate ALL task lists
    let lists = if let Some(id) = tasklist_id {
        vec![TaskList { id: id.to_string(), title: "".to_string() }]
    } else {
        client.list_task_lists().await?
    };

    let mut all_tasks = Vec::new();
    for list in &lists {
        progress.send(format!("Checking {}...", list.title)).await;
        match client.list_tasks(&list.id, false, None, due_max, None, None).await {
            Ok(tasks) => all_tasks.extend(tasks),
            Err(e) => { /* log and continue */ }
        }
    }

    // Format with checkboxes, due dates, and deep links
    let formatted = all_tasks.iter().map(|task| {
        let checkbox = if task.status == "completed" { "[x]" } else { "[ ]" };
        let due = task.due.as_deref().unwrap_or("no due date");
        let link = format!("https://tasks.google.com/task/{}?authuser={}", task.id, user_email);
        format!("{} {} (due: {}) - {}", checkbox, task.title, due, link)
    }).join("\\n");

    ToolResult::success(formatted)
}`,
      explanation: "When the user asks 'what tasks do I have?', this searches across all their task lists - not just one. Sends progress updates for each list being checked so the user sees activity. The output includes checkboxes, due dates, and deep links with the authuser parameter so links open in the correct Google account. Errors on individual lists don't fail the whole query - if one shared list is inaccessible, other tasks still show up.",
    },
  ],
};

// ============================================================
// STRIPE INTEGRATION
// ============================================================

export const stripeTools: CodeAnnotation = {
  file: "src/stripe/tools.rs",
  sections: [
    {
      title: "Invoice listing with date range and currency formatting",
      code: `pub async fn list_invoices(
    client: &stripe::Client,
    customer_id: Option<&str>, status: Option<&str>,
    date_from: Option<&str>, date_to: Option<&str>,
    limit: i64, starting_after: Option<&str>,
) -> ToolResult {
    let mut params = ListInvoices::new();
    if let Some(cid) = customer_id {
        params.customer = Some(CustomerId::from_str(cid)?);
    }
    if let Some(s) = status { params.status = Some(parse_invoice_status(s)?); }
    params.created = build_date_range(date_from, date_to)?;

    let invoices = Invoice::list(client, &params).await?;

    let formatted = invoices.data.iter().map(|inv| {
        format!("Invoice {}\\n  Customer: {}\\n  Status: {:?}\\n  Amount due: {}\\n  Amount paid: {}\\n  Created: {}",
            inv.id,
            inv.customer_name.as_deref().unwrap_or("Unknown"),
            inv.status,
            format_amount(inv.amount_due, &inv.currency),
            format_amount(inv.amount_paid, &inv.currency),
            format_ts(inv.created),
        )
    }).join("\\n\\n");

    ToolResult::success(formatted)
}

fn format_amount(cents: i64, currency: &Currency) -> String {
    // Handle zero-decimal currencies (JPY, KRW, etc.)
    if is_zero_decimal(currency) {
        format!("{} {}", cents, currency.to_uppercase())
    } else {
        format!("{:.2} {}", cents as f64 / 100.0, currency.to_uppercase())
    }
}`,
      explanation: "Admin-only tool for querying Stripe invoices. Supports filtering by customer, status, and date range. The date range uses Stripe's RangeQuery with inclusive end-of-day handling (if you ask for invoices through April 12, it includes the whole day, not just midnight). Currency formatting handles both normal currencies (divide by 100 for dollars) and zero-decimal currencies like JPY where the amount is already in the base unit.",
    },
  ],
};
