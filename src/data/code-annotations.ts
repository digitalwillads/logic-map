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

export const gmailTools: CodeAnnotation = {
  file: "src/chat/tools/gmail.rs",
  sections: [
    {
      title: "Email search with progress updates and category filtering",
      code: `pub async fn search_emails(
    client: &GmailClient, query: &str, max_results: u32,
    user_email: &str, category: Option<&str>, progress: ProgressSender,
) -> ToolResult {
    send_progress(&progress, "Searching emails...").await;

    // Category filtering uses Gmail's internal label IDs, not query syntax
    let list = match category.and_then(|c| category_to_label_id(c)) {
        Some(label_id) => client.list_messages_by_labels(&[label_id], q, max_results).await,
        None => client.list_messages(q, max_results, None).await,
    };

    let total = list.messages.len();
    let mut output = format!("Found {} email(s):\\n\\n", total);

    for (i, msg_ref) in list.messages.iter().enumerate() {
        if i > 0 && i % 10 == 0 {
            send_progress(&progress, format!("Loading email {}/{}...", i + 1, total)).await;
        }
        let msg = client.get_message(&msg_ref.id).await?;
        let parsed = parse_email(&msg);
        output.push_str(&format!(
            "---\\nFrom: {}\\nSubject: {}\\nDate: {}\\nLink: {}\\n",
            parsed.from, parsed.subject, parsed.date,
            gmail_link(&parsed.thread_id, user_email)
        ));
    }
    ToolResult::success_truncated(output)
}`,
      explanation: "Searches Gmail and fetches full details for each result. Progress updates fire every 10 emails so the user sees something happening during large searches. Category filtering (primary, social, promotions, updates) uses Gmail's internal label IDs because the query syntax for categories doesn't work through the API. Each result includes a Gmail deep link with the authuser parameter for multi-account support. Failed individual message loads don't abort the whole search.",
    },
    {
      title: "Send email with user confirmation gate",
      code: `pub async fn send_email(
    client: &GmailClient, user_email: &str,
    to: &[String], cc: &[String], bcc: &[String],
    subject: &str, body: &str, user_confirmed: bool,
) -> ToolResult {
    if !user_confirmed {
        return ToolResult::error(
            "Cannot send email without user confirmation. \
             Draft the email in chat first, show the recipients and content, \
             then ask them to confirm. Only set user_confirmed=true after they explicitly agree."
        );
    }

    let raw = build_rfc2822_message(user_email, &to_refs, &cc_refs, &bcc_refs,
        subject, body, None, None);

    match client.send_message(&raw).await {
        Ok(resp) => ToolResult::success(format!("Email sent! ID: {}", resp.id)),
        Err(e) => ToolResult::error(format!("Failed to send: {}", e)),
    }
}`,
      explanation: "The primary safety gate for email sending. If user_confirmed is false, the tool returns an error message that instructs Claude to draft the email first and ask for confirmation. This is enforced in code, not just the system prompt - Claude cannot bypass it. The error message is carefully worded to guide Claude through the correct workflow: draft, show recipients and content, then ask the user to confirm.",
    },
    {
      title: "Reply with threading header extraction",
      code: `pub async fn reply_to_email(
    client: &GmailClient, user_email: &str,
    message_id: &str, thread_id: &str,
    to: &[String], cc: &[String], bcc: &[String],
    body: &str, user_confirmed: bool,
) -> ToolResult {
    if !user_confirmed { return ToolResult::error("...confirmation required..."); }

    // Fetch original message to get threading headers
    let original = client.get_message(message_id).await?;
    let payload = original.payload.as_ref()?;

    let original_subject = extract_header(payload, "Subject");
    let reply_subject = if original_subject.to_lowercase().starts_with("re: ") {
        original_subject
    } else {
        format!("Re: {}", original_subject)
    };

    // Build References chain for proper threading
    let original_message_id = extract_header(payload, "Message-ID");
    let original_references = extract_header(payload, "References");
    let references = if original_references.is_empty() {
        original_message_id.clone()
    } else {
        format!("{} {}", original_references, original_message_id)
    };

    let raw = build_rfc2822_message(user_email, &to_refs, &cc_refs, &bcc_refs,
        &reply_subject, body, Some(&original_message_id), Some(&references));

    client.send_reply(&raw, thread_id).await
}`,
      explanation: "Replying requires fetching the original message to extract its Message-ID and References headers. These are critical for email threading - without them, the reply shows up as a new conversation in every email client. The References header is built by appending the original's Message-ID to the existing References chain (per RFC 5322). The subject gets 'Re: ' prepended only if it's not already there. The same confirmation gate applies.",
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

// ============================================================
// EMAIL TRIAGE - CHAT ENDPOINT
// ============================================================

export const emailChatEndpoint: CodeAnnotation = {
  file: "src/email/chat_endpoint.rs",
  sections: [
    {
      title: "Email-specific system prompt and send confirmation logic",
      code: `let system_prompt = format!(
    "You are a concise email assistant. The user is reviewing an email and may want to reply.\\n\\n\
     Email context:\\n\
     From: {sender}\\nSubject: {subject}\\nBody:\\n{body}\\n\\n\
     You have the email's message_id ({message_id}) and thread_id ({thread_id}).\\n\
     To reply, use reply_to_email or reply_all with these IDs.\\n\\n\
     SEND CONFIRMATION RULES:\\n\
     If the user clearly communicates intent to send NOW (e.g. 'tell him X and send it',\\n\
     'reply saying Y go ahead and send'), draft and send immediately with user_confirmed=true.\\n\
     Use judgment - the user must be explicitly asking you to send, not just using the word\\n\
     'send' in passing. 'Send' alone after seeing a draft is confirmation.\\n\
     'What should I send?' is NOT confirmation.\\n\
     When in doubt, show the draft and ask to confirm."
);`,
      explanation: "The email chat endpoint is a specialized version of the main chat. Key differences: (1) The email body, sender, subject, message_id, and thread_id are pre-loaded into the system prompt so Claude doesn't need to search for them. (2) reply_to_email is preferred over send_email since we already have the IDs. (3) The send confirmation logic has nuanced heuristics - 'tell him X and send it' means send immediately, but 'what should I send?' is a question, not a command. This prevents both accidental sends and unnecessary confirmation prompts.",
    },
  ],
};

// ============================================================
// MEETING REVIEW - CHAT ENDPOINT
// ============================================================

export const meetingChatEndpoint: CodeAnnotation = {
  file: "src/meetings/chat_endpoint.rs",
  sections: [
    {
      title: "Meeting-specific tools for task management",
      code: `// Three inline tools added on top of the standard tool set
let meeting_tools = vec![
    ToolDefinition {
        name: "update_meeting_task".to_string(),
        description: "Update a draft task's title or assignee by task number".to_string(),
        input_schema: json!({
            "properties": {
                "task_number": { "type": "integer", "description": "1-based task number" },
                "title": { "type": "string" },
                "suggested_assignee": { "type": "string" },
                "assignee_email": { "type": "string" }
            },
            "required": ["task_number"]
        }),
    },
    ToolDefinition {
        name: "reject_meeting_task".to_string(),
        description: "Remove a draft task by marking it rejected".to_string(),
        // ...
    },
    ToolDefinition {
        name: "add_meeting_task".to_string(),
        description: "Add a new draft task for this meeting".to_string(),
        // ...
    },
];`,
      explanation: "The meeting chat endpoint adds three tools that the main chat doesn't have: update, reject, and add draft tasks. These are handled inline (not through the ToolExecutor) because they need direct access to the meeting's task list in the database. Task numbers are 1-based so Claude can say 'update task 3' matching what the user sees in the UI. The current task list is reloaded from the database before each tool loop iteration to handle concurrent modifications.",
    },
    {
      title: "Transcript context injection",
      code: `let transcript_snippet = entry.transcript_text
    .map(|t| {
        let bytes = t.as_bytes();
        if bytes.len() > 15000 {
            let truncated = std::str::from_utf8(&bytes[..15000])
                .unwrap_or(&t[..t.len().min(15000)]);
            format!("{}\\n[...transcript truncated]", truncated)
        } else { t }
    })
    .unwrap_or_default();

let system_prompt = format!(
    "You are reviewing a meeting. You can modify the draft action items.\\n\\n\
     Meeting: {name}\\nDate: {date}\\nAttendees: {attendees}\\n\\n\
     Draft tasks:\\n{task_list}\\n\\n\
     Transcript:\\n{transcript}",
);`,
      explanation: "The meeting's transcript is injected into the system prompt, truncated to 15KB at a UTF-8 boundary to stay within context limits. The draft tasks are listed with their current titles and assignees so Claude can reference them by number. Claude can then use its meeting-specific tools to update, reject, or add tasks based on the conversation with the user.",
    },
  ],
};

// ============================================================
// ADMIN DELEGATION
// ============================================================

export const adminDelegation: CodeAnnotation = {
  file: "src/gmail/admin.rs",
  sections: [
    {
      title: "JWT creation for service account impersonation",
      code: `pub async fn get_delegated_access_token(
    http_client: &reqwest::Client,
    target_email: &str,
    scopes: &str,
) -> Result<String, String> {
    let sa_path = std::env::var("SERVICE_ACCOUNT_PATH")
        .unwrap_or_else(|_| SERVICE_ACCOUNT_PATH_DEFAULT.to_string());
    let sa_key: ServiceAccountKey = serde_json::from_reader(File::open(&sa_path)?)?;

    let now = chrono::Utc::now().timestamp();
    let claims = JwtClaims {
        iss: sa_key.client_email.clone(),   // service account email
        sub: target_email.to_string(),       // user to impersonate
        scope: scopes.to_string(),           // what permissions to request
        aud: sa_key.token_uri.clone(),       // Google's token endpoint
        iat: now,                            // issued now
        exp: now + 3600,                     // expires in 1 hour
    };

    let header = Header::new(Algorithm::RS256);
    let key = EncodingKey::from_rsa_pem(sa_key.private_key.as_bytes())?;
    let jwt = encode(&header, &claims, &key)?;

    // Exchange JWT for access token
    let response = http_client.post("https://oauth2.googleapis.com/token")
        .form(&[
            ("grant_type", "urn:ietf:params:oauth:grant-type:jwt-bearer"),
            ("assertion", &jwt),
        ])
        .send().await?;

    let token_response: TokenResponse = response.json().await?;
    Ok(token_response.access_token)
}`,
      explanation: "This is how admin users access other team members' Gmail and Calendar. A Google service account with domain-wide delegation creates a JWT that says 'I am the service account, let me act as target_email.' The JWT is signed with RS256 using the service account's private key, then exchanged at Google's token endpoint for an access token that has the requested scopes for the target user. The token expires after 1 hour. This is the same pattern used for admin email search, admin calendar access, and admin task management.",
    },
    {
      title: "Workspace user listing via Directory API",
      code: `pub async fn list_workspace_users(
    http_client: &reqwest::Client,
    admin_access_token: &str,
    domain: &str,
) -> Result<Vec<DirectoryUserEntry>, String> {
    let mut all_users = Vec::new();
    let mut page_token: Option<String> = None;

    loop {
        let mut url = format!(
            "https://admin.googleapis.com/admin/directory/v1/users?domain={}&maxResults=200",
            domain
        );
        if let Some(token) = &page_token {
            url.push_str(&format!("&pageToken={}", token));
        }

        let response = http_client.get(&url)
            .bearer_auth(admin_access_token)
            .send().await?;

        let body: DirectoryResponse = response.json().await?;
        all_users.extend(body.users);

        match body.next_page_token {
            Some(token) => page_token = Some(token),
            None => break,
        }
    }
    Ok(all_users)
}`,
      explanation: "Lists all users in the @digitalwillads.com Google Workspace domain. Handles pagination (Google returns max 200 users per page). Used by the 'list workspace users' admin tool so Claude can help Will find team members' emails, check who's in the directory, etc. The admin access token comes from the same service account delegation mechanism.",
    },
  ],
};

// ============================================================
// AUTHENTICATION
// ============================================================

export const authOauth: CodeAnnotation = {
  file: "src/auth/oauth.rs",
  sections: [
    {
      title: "OAuth login flow - code exchange to session token",
      code: `#[server(RequestOAuthTokens, "/api")]
pub async fn request_oauth_tokens(authcode: AuthCode) -> Result<String, ServerFnError> {
    // 1. Exchange auth code for tokens
    let body = json!({
        "client_id": client_secret.client_id,
        "client_secret": client_secret.client_secret,
        "code": authcode.code,
        "grant_type": "authorization_code",
        "redirect_uri": redirect_uri,
    });
    let token_response: TokenResponse = client.post(&client_secret.token_uri)
        .json(&body).send().await?.json().await?;

    // 2. Fetch user profile from Google
    let user_profile: UserProfile = client
        .get("https://www.googleapis.com/oauth2/v3/userinfo")
        .query(&[("access_token", &token_response.access_token)])
        .send().await?.json().await?;

    // 3. Check admin status (best-effort - doesn't block login)
    let is_admin = check_admin_status(&client, &token_response.access_token, &user_profile.email).await;

    // 4. Upsert user record (create or update)
    let user_id = database::upsert_user(&mut conn, &user_profile.sub, &user_profile.email,
        &user_profile.name, user_profile.picture.as_deref(), is_admin)?;

    // 5. Store OAuth tokens (access + refresh + scopes)
    database::store_google_tokens(&mut conn, user_id, &token_response.access_token,
        token_response.refresh_token.as_deref().unwrap_or(""), Some(&token_response.scope))?;

    // 6. Generate session token (UUID stored in auth_tokens table)
    let auth_token = database::store_auth_token(&mut conn, user_id)?;
    Ok(auth_token)  // returned to browser, stored in localStorage
}`,
      explanation: "The complete login flow in one function. Google redirects back with an auth code, we exchange it for tokens, fetch the user's profile, check if they're an admin (best-effort - failures don't block login), upsert the user record (so profile changes are picked up), store the OAuth tokens, and generate a UUID session token. The session token goes back to the browser and gets stored in localStorage. Every subsequent API call includes this token for authentication.",
    },
    {
      title: "Incremental scope authorization",
      code: `const REQUIRED_EXTRA_SCOPES: &[(&str, &str)] = &[
    ("https://www.googleapis.com/auth/gmail.readonly", "Email read access"),
    ("https://www.googleapis.com/auth/gmail.send", "Email sending"),
    ("https://www.googleapis.com/auth/calendar.readonly", "Calendar access"),
    ("https://www.googleapis.com/auth/tasks", "Google Tasks access"),
];

#[server(CheckMissingScopes, "/api")]
pub async fn check_missing_scopes(auth_token: String) -> Result<Vec<String>, ServerFnError> {
    let tokens = database::get_google_tokens(&mut conn, user.id)?;
    let stored_scopes = tokens.map(|t| t.scopes.unwrap_or_default()).unwrap_or_default();

    let missing: Vec<String> = REQUIRED_EXTRA_SCOPES.iter()
        .filter(|(scope_url, _)| !stored_scopes.contains(scope_url))
        .map(|(_, label)| label.to_string())
        .collect();
    Ok(missing)
}

#[server(GetScopeAuthUrl, "/api")]
pub async fn get_scope_auth_url(auth_token: String) -> Result<String, ServerFnError> {
    // Build OAuth URL with ONLY the missing scopes
    // include_granted_scopes=true tells Google to merge with existing grants
    let params = HashMap::from([
        ("include_granted_scopes", "true"),
        ("prompt", "consent"),
        ("scope", &missing_scope_urls.join(" ")),
        // ...
    ]);
    Ok(url.to_string())
}`,
      explanation: "Users don't have to grant all permissions at once. On page load, the UI checks which scopes are missing. If gmail.send isn't granted yet, a banner appears asking the user to authorize email sending. The key is include_granted_scopes=true - this tells Google to ADD the new scope to existing grants, not replace them. Without it, granting gmail.send would revoke gmail.readonly. After authorization, the callback goes through the same login flow and the stored scopes are updated.",
    },
    {
      title: "Token refresh",
      code: `pub async fn refresh_access_token(app_state: &AppState, user_id: i32) -> Result<String, String> {
    let tokens = database::get_google_tokens(&mut conn, user_id)?
        .ok_or("No Google tokens found")?;

    let body = json!({
        "client_id": client_secret.client_id,
        "client_secret": client_secret.client_secret,
        "refresh_token": tokens.refresh_token,
        "grant_type": "refresh_token",
    });

    let response = app_state.reqwest_client
        .post("https://oauth2.googleapis.com/token")
        .json(&body).send().await?;

    let refresh_response: RefreshResponse = response.json().await?;

    database::update_access_token(&mut conn, user_id, &refresh_response.access_token)?;
    Ok(refresh_response.access_token)
}`,
      explanation: "Called proactively before every Gmail/Calendar API call. Uses the stored refresh token (which never expires if offline access was granted) to get a fresh access token from Google. The new token is saved to the database. This function is called by the ToolExecutor, the email polling loop, and the meeting polling loop - all sharing the same refresh mechanism.",
    },
  ],
};

// ============================================================
// CALENDAR TOOLS
// ============================================================

export const calendarTools: CodeAnnotation = {
  file: "src/chat/tools/calendar.rs",
  sections: [
    {
      title: "Timezone offset extraction from user's local time",
      code: `pub fn extract_tz_offset(user_local_time: &str) -> &str {
    // Input: "2026-04-06T14:30:00-04:00" -> "-04:00"
    // Input: "2026-04-06T14:30:00Z"      -> "+00:00"
    if user_local_time.ends_with('Z') {
        return "+00:00";
    }
    let bytes = user_local_time.as_bytes();
    let len = bytes.len();
    if len >= 6 {
        let candidate = &user_local_time[len - 6..];
        if candidate.starts_with('+') || candidate.starts_with('-') {
            return candidate;
        }
    }
    "+00:00"  // fallback to UTC
}

pub fn date_to_rfc3339_start(date: &str, tz_offset: &str) -> String {
    format!("{}T00:00:00{}", date, tz_offset)  // start of day
}

pub fn date_to_rfc3339_end_inclusive(date: &str, tz_offset: &str) -> String {
    // Calendar API uses exclusive upper bound, so "through April 12"
    // needs to be "before April 13 00:00"
    if let Ok(d) = NaiveDate::parse_from_str(date, "%Y-%m-%d") {
        let next_day = d + Duration::days(1);
        format!("{}T00:00:00{}", next_day.format("%Y-%m-%d"), tz_offset)
    } else {
        format!("{}T23:59:59{}", date, tz_offset)  // fallback
    }
}`,
      explanation: "The timezone handling that took three tries to get right. The user's browser sends their local time as an ISO 8601 string with the timezone offset baked in. We parse the last 6 characters to extract the offset (e.g. '-04:00' for EDT). This offset is then used to construct RFC3339 date boundaries for the Calendar API. The end date is incremented by one day because the API uses exclusive upper bounds - 'events on April 12' needs time_max of April 13 midnight, not April 12 midnight.",
    },
    {
      title: "Two-phase participant filtering",
      code: `pub async fn get_calendar_events_by_participant(
    client: &CalendarClient, participant: &str,
    start_date: Option<&str>, end_date: Option<&str>,
    user_local_time: &str, user_timezone: &str, progress: ProgressSender,
) -> ToolResult {
    // Phase 1: Use Calendar API's "q" parameter for initial server-side search
    let events = list_events_all_calendars(
        client, time_min, time_max, Some(participant), 2500, tz_param
    ).await?;

    // Phase 2: Client-side verification - API search is fuzzy, so we double-check
    let participant_lower = participant.to_lowercase();
    let filtered: Vec<&ParsedEvent> = events.iter().filter(|e| {
        for a in &e.attendees {
            if a.to_lowercase().contains(&participant_lower) { return true; }
        }
        if e.organizer.to_lowercase().contains(&participant_lower) { return true; }
        false
    }).collect();

    // Format and return filtered results
}`,
      explanation: "Finding events with a specific person uses two phases because the Calendar API's search is fuzzy - it matches against event titles and descriptions too, not just attendees. Phase 1 uses the API's 'q' parameter for a broad server-side search. Phase 2 filters client-side to only events where the person is actually an attendee or organizer. The case-insensitive contains match handles variations like 'Sarah' matching 'Sarah Chen <sarah@nzymes.com>'.",
    },
  ],
};

// ============================================================
// SERVER SETUP
// ============================================================

export const mainServer: CodeAnnotation = {
  file: "src/main.rs",
  sections: [
    {
      title: "Database initialization with SQLite pragmas",
      code: `struct SqlitePragmas;

impl CustomizeConnection<SqliteConnection, r2d2::Error> for SqlitePragmas {
    fn on_acquire(&self, conn: &mut SqliteConnection) -> Result<(), r2d2::Error> {
        // WAL mode allows concurrent readers during writes
        sql_query("PRAGMA journal_mode = WAL").execute(conn)?;
        // Wait up to 5s for a write lock instead of failing immediately
        sql_query("PRAGMA busy_timeout = 5000").execute(conn)?;
        Ok(())
    }
}

let db_pool = Pool::builder()
    .max_size(5)
    .connection_customizer(Box::new(SqlitePragmas))
    .build(manager)?;

// Run migrations on startup
conn.run_pending_migrations(MIGRATIONS)?;`,
      explanation: "Every database connection gets two pragmas set on acquire. WAL (Write-Ahead Logging) mode lets the background polling tasks read while the chat endpoint writes - without it, concurrent access would deadlock. The 5-second busy timeout prevents immediate failures when multiple writes compete - instead of erroring, SQLite waits up to 5 seconds for the lock. Pool is capped at 5 connections because SQLite has limited concurrency. Migrations run automatically on startup so the schema stays in sync with code.",
    },
    {
      title: "Route registration and background task spawning",
      code: `// API routes
let chat_routes = Router::new()
    .route("/api/chat", post(chat_endpoint::chat_stream))
    .route("/api/chat/stop", post(chat_endpoint::stop_stream))
    .route("/api/chat/subscribe", post(chat_endpoint::subscribe_stream))
    .route("/api/email-chat", post(email::chat_endpoint::email_chat_stream))
    .route("/api/meeting-chat", post(meetings::chat_endpoint::meeting_chat_stream))
    .route("/api/chad-ads/callback", get(chad_ads_callback))
    .layer(DefaultBodyLimit::max(16 * 1024 * 1024));  // 16MB for image uploads

// Background tasks - polling (will be replaced by webhooks)
let email_interval: u64 = env::var("EMAIL_POLL_INTERVAL_SECS")
    .ok().and_then(|v| v.parse().ok()).unwrap_or(120);
email::polling::start_polling_task(app_state.clone(), email_interval);

let meeting_interval: u64 = env::var("MEETING_POLL_INTERVAL_SECS")
    .ok().and_then(|v| v.parse().ok()).unwrap_or(300);
meetings::polling::start_polling_task(app_state.clone(), meeting_interval);`,
      explanation: "Three chat SSE endpoints (main, email, meeting) plus a Chad Ads OAuth callback. The 16MB body limit accommodates image uploads (users can paste images into chat). Two background polling tasks spawn on startup with configurable intervals via environment variables - 120s for email, 300s for meetings. These run independently from the web server, sharing the same database pool and HTTP client through AppState.",
    },
  ],
};

// ============================================================
// TOOL DEFINITIONS
// ============================================================

export const toolDefinitions: CodeAnnotation = {
  file: "src/chat/tools/mod.rs",
  sections: [
    {
      title: "Conditional tool availability based on admin status",
      code: `pub fn tool_definitions(is_admin: bool) -> Vec<ToolDefinition> {
    let mut tools = vec![
        // --- Non-admin tools (available to everyone) ---
        ToolDefinition {
            name: SEARCH_EMAILS.to_string(),
            description: "Search emails using Gmail query syntax...".to_string(),
            input_schema: json!({
                "type": "object",
                "properties": {
                    "query": { "type": "string", "description": "Gmail search query" },
                    "max_results": { "type": "integer", "description": "Max results (default 10)" },
                    "category": { "type": "string", "enum": ["primary","social","promotions","updates"] }
                },
                "required": ["query"]
            }),
        },
        // ... ~20 more non-admin tools for Gmail, Calendar, Tasks, Recorder, Chad Ads ...
    ];

    if is_admin {
        tools.push(ToolDefinition {
            name: ADMIN_SEARCH_USER_EMAILS.to_string(),
            description: "Admin only: Search another workspace user's Gmail...".to_string(),
            input_schema: json!({
                "properties": {
                    "target_user_email": { "type": "string" },
                    "query": { "type": "string" }
                },
                "required": ["target_user_email", "query"]
            }),
        });
        // ... admin variants for Gmail, Calendar, Tasks, Directory ...
    }

    tools
}`,
      explanation: "This is the master file that defines every tool Claude can use - about 30+ tools total. The is_admin flag controls which tools are included in the API request. Non-admin users get Gmail read/send, Calendar read, Tasks CRUD, Recording search, and Chad Ads. Admin users additionally get workspace-wide search across all team members' email, calendar, and tasks, plus the Directory API for listing users. By conditionally including tools (not just checking permissions at execution), Claude literally doesn't know admin tools exist for non-admin users - it can't try to call what it can't see.",
    },
  ],
};

// ============================================================
// FRONTEND - EMAIL TRIAGE UI
// ============================================================

export const emailTriageUI: CodeAnnotation = {
  file: "src/components/email_triage.rs",
  sections: [
    {
      title: "Queue management and email advancement",
      code: `// State
let email_queue: RwSignal<Vec<EmailQueueItem>> = RwSignal::new(vec![]);
let current_index: RwSignal<usize> = RwSignal::new(0);
let queue_state: RwSignal<String> = RwSignal::new("loading".to_string());
let email_body: RwSignal<String> = RwSignal::new(String::new());

// Load queue on mount
Effect::new(move || {
    spawn_local(async move {
        let queue = get_email_queue(auth_token).await?;
        if queue.is_empty() {
            queue_state.set("empty".to_string());
        } else {
            email_queue.set(queue);
            queue_state.set("active".to_string());
        }
    });
});

// When current_index changes, load the new email's body and reset chat
Effect::new(move || {
    let idx = current_index.get();
    let queue = email_queue.get();
    if let Some(entry) = queue.get(idx) {
        spawn_local(async move {
            let body = get_email_content(auth_token, entry.id).await?;
            email_body.set(body);
            chat_messages.set(vec![]);  // reset chat for new email
        });
    }
});

fn advance_to_next() {
    let idx = current_index.get();
    let queue = email_queue.get();
    if idx + 1 < queue.len() {
        current_index.set(idx + 1);
    } else {
        // End of queue - reload to check for new emails
        spawn_local(async move {
            let new_queue = get_email_queue(auth_token).await?;
            if new_queue.is_empty() {
                queue_state.set("complete".to_string());
            } else {
                email_queue.set(new_queue);
                current_index.set(0);
            }
        });
    }
}`,
      explanation: "The email triage UI works like a card deck - you review one email at a time, take action, then advance to the next. When you reach the end, it reloads the queue to check for new emails that arrived while you were triaging. Each email advance loads the full body (lazy, not preloaded) and resets the chat conversation. The queue_state signal drives the UI between loading, active (has emails), empty (nothing to review), and complete (finished the batch).",
    },
  ],
};

// ============================================================
// FRONTEND - EMAIL API
// ============================================================

export const emailAPI: CodeAnnotation = {
  file: "src/components/email_api.rs",
  sections: [
    {
      title: "Archive with Gmail label removal",
      code: `#[server(UpdateEmailStatusApi, "/api")]
pub async fn update_email_status_api(
    auth_token: String, entry_id: i32, status: String,
) -> Result<(), ServerFnError> {
    // Verify ownership
    let user = database::verify_auth_token(&mut conn, &auth_token)?
        .ok_or(ServerFnError::new("Invalid token"))?;
    let entry = database::get_email_queue_entry(&mut conn, entry_id)?;
    if entry.user_id != user.id { return Err(ServerFnError::new("Not your email")); }

    // Update status in our database
    database::update_email_status(&mut conn, entry_id, &status)?;

    // Also remove from Gmail INBOX (best-effort, non-blocking)
    if status == "archived" {
        if let Ok(token) = refresh_access_token(&app_state, user.id).await {
            let gmail = GmailClient::new(app_state.reqwest_client.clone(), token);
            let _ = gmail.modify_message(&entry.gmail_message_id,
                &[], &["INBOX"]  // add no labels, remove INBOX
            ).await;  // ignore errors - archiving in our DB is what matters
        }
    }
    Ok(())
}`,
      explanation: "When the user archives an email in the triage queue, two things happen: (1) the status is updated in our database (the important part), and (2) the INBOX label is removed from the email in Gmail (best-effort). The Gmail API call is fire-and-forget - if it fails, the email stays in Gmail's inbox but is still marked as processed in our queue. This prevents the email from reappearing in the next triage cycle. Ownership is verified before any action.",
    },
  ],
};

// ============================================================
// FRONTEND - MEETING REVIEW UI
// ============================================================

export const meetingReviewUI: CodeAnnotation = {
  file: "src/components/meeting_review.rs",
  sections: [
    {
      title: "Batch task approval on Done",
      code: `fn on_done() {
    spawn_local(async move {
        let tasks = draft_tasks.get();
        let pending_tasks: Vec<_> = tasks.iter()
            .filter(|t| t.status == "pending")
            .collect();

        // Approve all pending tasks (creates Google Tasks)
        for task in &pending_tasks {
            let _ = approve_draft_task_api(
                auth_token, task.id, &task.title,
                task.assignee_email.as_deref(),
            ).await;
        }

        // Mark meeting as reviewed
        mark_meeting_reviewed_api(auth_token, meeting_id).await?;

        // Advance to next meeting
        advance_to_next();
    });
}

fn on_reject(task_id: i32) {
    // Remove from local list immediately (optimistic UI)
    draft_tasks.update(|tasks| {
        tasks.retain(|t| t.id != task_id);
    });
    // Then persist the rejection
    spawn_local(async move {
        reject_draft_task_api(auth_token, task_id).await;
    });
}`,
      explanation: "When the user clicks 'Done - Next Meeting', all remaining pending tasks are batch-approved (each creates a Google Task), the meeting is marked as reviewed, and the UI advances to the next meeting. Individual task rejection is optimistic - the task is removed from the UI immediately, then the API call happens in the background. This makes the UI feel snappy even if the network is slow.",
    },
  ],
};

// ============================================================
// FRONTEND - MEETING API
// ============================================================

export const meetingAPI: CodeAnnotation = {
  file: "src/components/meeting_api.rs",
  sections: [
    {
      title: "Task approval with delegation and deduplication",
      code: `#[server(ApproveDraftTaskApi, "/api")]
pub async fn approve_draft_task_api(
    auth_token: String, task_id: i32, title: String,
    assignee_email: Option<String>,
) -> Result<(), ServerFnError> {
    // Determine whose Google Tasks to create in
    let (tasks_client, target_label) = if let Some(ref email) = assignee_email {
        if email.ends_with("@digitalwillads.com") {
            // Workspace user - use service account delegation
            match create_delegated_tasks_client(&app_state.reqwest_client, email).await {
                Ok(client) => (client, format!("{}'s tasks", email)),
                Err(_) => {
                    // Delegation failed - fall back to current user's account
                    let client = get_tasks_client_for_user(&app_state, user.id).await?;
                    (client, format!("your tasks (delegation to {} failed)", email))
                }
            }
        } else {
            // External user - create in current user's account with note
            let client = get_tasks_client_for_user(&app_state, user.id).await?;
            (client, "your tasks".to_string())
        }
    } else {
        let client = get_tasks_client_for_user(&app_state, user.id).await?;
        ("your tasks".to_string())
    };

    // Find or create "Meeting Action Items" task list
    let lists = tasks_client.list_task_lists().await?;
    let list_id = lists.iter()
        .find(|l| l.title == "Meeting Action Items")
        .map(|l| l.id.clone())
        .unwrap_or_else(|| {
            tasks_client.create_task_list("Meeting Action Items").await?.id
        });

    // Deduplication - skip if task with same title already exists
    let existing = tasks_client.list_tasks(&list_id, false, None, None, None, None).await?;
    if existing.iter().any(|t| t.title == title) {
        return Ok(());  // already exists
    }

    // Create the task with meeting context in notes
    let task = tasks_client.create_task(&list_id, &title, Some(&notes), None, None, None).await?;

    // Update draft task status to "approved" with google_task_id
    database::update_draft_task_status(&mut conn, task_id, "approved",
        Some(&task.id), Some(&list_id))?;
    Ok(())
}`,
      explanation: "The most complex approval logic in the app. When a draft task is approved: (1) If the assignee is a @digitalwillads.com user, try to create the task directly in THEIR Google Tasks using service account delegation. (2) If delegation fails, fall back to the current user's account with a note. (3) If the assignee is external (not workspace), create in the current user's account. Tasks always go into a 'Meeting Action Items' list (created if it doesn't exist). Deduplication prevents the same task from being created twice if the user clicks Done multiple times. The google_task_id is stored so we can reference it later.",
    },
  ],
};

// ============================================================
// FRONTEND - CHAT PAGE
// ============================================================

export const chatPage: CodeAnnotation = {
  file: "src/components/chat_page.rs",
  sections: [
    {
      title: "Tab management and badge polling",
      code: `// Tab state
let active_tab: RwSignal<String> = RwSignal::new("chat".to_string());
let email_badge_count: RwSignal<i64> = RwSignal::new(0);
let meeting_badge_count: RwSignal<i64> = RwSignal::new(0);

// Scope checking on load
Effect::new(move || {
    spawn_local(async move {
        let missing = check_missing_scopes(auth_token).await?;
        if !missing.is_empty() {
            chat_disabled.set(true);
            missing_scopes.set(missing);
            scope_auth_url.set(Some(get_scope_auth_url(auth_token).await?));
        }
    });
});

// Badge polling loop - runs every 30 seconds
Effect::new(move || {
    spawn_local(async move {
        loop {
            if let Ok(count) = get_email_badge_count(auth_token).await {
                email_badge_count.set(count);
            }
            if let Ok(count) = get_meeting_badge_count(auth_token).await {
                meeting_badge_count.set(count);
            }
            gloo_timers::future::sleep(Duration::from_secs(30)).await;
        }
    });
});

// Tab rendering
match active_tab.get().as_str() {
    "email" => view! { <EmailTriageCard auth_token badge_count=email_badge_count /> },
    "meetings" => view! { <MeetingReviewCard auth_token badge_count=meeting_badge_count /> },
    _ => view! { <ChatBox auth_token /* ... */ /> },
}`,
      explanation: "The main page orchestrates three tabs: Chat (default), Email (triage), and Meetings (review). On load, it checks for missing OAuth scopes and shows an authorization banner if any are missing. Badge counts poll every 30 seconds so the user sees how many emails and meetings are waiting for review without switching tabs. Each tab renders its own self-contained component. The Chad Ads connection check is separate and non-blocking - it shows a banner but doesn't disable chat.",
    },
  ],
};

// ============================================================
// FRONTEND - CHAT BOX
// ============================================================

export const chatBox: CodeAnnotation = {
  file: "src/components/chat_box.rs",
  sections: [
    {
      title: "SSE streaming and thread management",
      code: `fn send_message() {
    // Build message with image blocks (if pasted) + text
    let blocks = pending_images.get().iter()
        .map(|(data, mime)| UiContentBlock::Image { data, media_type: mime })
        .chain(std::iter::once(UiContentBlock::Text { text: input_text.get() }))
        .collect();

    let message = UiChatMessage { role: "user", content: blocks };

    // Create thread if needed (uses first 40 chars as title)
    if current_thread_id.get().is_none() {
        let title = if has_only_images { "Image" } else { &text[..40] };
        let thread_id = create_thread_api(auth_token, title).await?;
        current_thread_id.set(Some(thread_id));
    }

    // Trigger server-side generation
    start_chat_api(auth_token, thread_id, messages).await?;

    // Subscribe to SSE stream
    subscribe_to_stream(thread_id);
}

fn subscribe_to_stream(thread_id: i32) {
    let event_source = EventSource::new(&format!("/api/chat/subscribe?thread_id={}", thread_id));
    event_source.on_message(move |event| {
        match event.type_ {
            "text"        => streaming_text.update(|t| t.push_str(&event.data)),
            "tool_call"   => { /* show tool indicator */ },
            "tool_result" => { /* show tool output */ },
            "done"        => { is_streaming.set(false); merge_streaming_text(); },
            "error"       => { /* show error */ },
        }
    });
}

fn stop_message() {
    stream_cancel.set(true);
    // Merge any in-flight text
    // Mark pending tool calls as "Interrupted"
}`,
      explanation: "The main chat UI handles the full lifecycle: composing messages (text + pasted images), creating threads on first message, triggering server-side generation, and subscribing to the SSE stream for real-time updates. Streaming text accumulates in a separate signal (streaming_text) to avoid DOM thrashing - it's only merged into the message list when the stream completes. The stop button cancels gracefully by marking pending tool calls as 'Interrupted' so the user knows what was in progress. Thread titles are auto-generated from the first 40 characters of the first message.",
    },
  ],
};
