import type { CodeAnnotation } from "../components/CodeView";

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
                    if domain.contains(&value_lower) || value_lower.contains(domain.as_str()) {
                        Some(format!("Sender domain '{}' matches rule: {}", domain, rule.value))
                    } else { None }
                })
            }
            "keyword" => {
                if subject_lower.contains(&value_lower) || sender_lower.contains(&value_lower) {
                    Some(format!("Keyword '{}' found in subject or sender", rule.value))
                } else { None }
                }
            _ => None,
        };
        if let Some(reason) = matched {
            return Some(reason);
        }
    }
    None
}`,
      explanation:
        "First line of defense. Before we spend money calling Claude, check the email against the user's own blacklist rules. Three types of rules: exact sender match, domain match (e.g. block everything from @noreply.github.com), and keyword match (searches both subject and sender). If any rule hits, the email is filtered immediately with the reason logged. Everything is case-insensitive.",
    },
    {
      title: "AI filter - Claude decides keep or filter",
      code: `pub async fn ai_filter_email(
    http_client: &reqwest::Client,
    sender: &str,
    subject: &str,
    body_preview: &str,
) -> Result<Option<String>, String> {
    let truncated_body = truncate_str(body_preview, 1000);

    let prompt = format!(
        r#"You are an email triage assistant for a digital marketing agency owner.
Determine whether this email should be FILTERED OUT or KEPT for review.

FILTER OUT all of these:
- Automated receipts, invoices, and billing confirmations
- Calendar invite notifications
- System notifications (GitHub, CI/CD, deployment)
- Newsletters, marketing emails, promotional content
- Sales pitches and cold outreach
- Social media notifications
- Account security notifications (unless suspicious)
- Automated onboarding/welcome emails from SaaS products

KEEP only emails that are:
- Direct personal messages from real people who expect a reply
- Client or prospect communications that need a response
- Emails where a human is asking a specific question
- Urgent alerts that indicate something is broken

When in doubt, FILTER.

From: {sender}
Subject: {subject}
Body preview: {body}

Respond with EXACTLY: KEEP or FILTER: <reason>"#);

    // ... calls Claude API, parses response ...
    if response_text.starts_with("FILTER:") {
        Ok(Some(response_text["FILTER:".len()..].trim().to_string()))
    } else {
        Ok(None) // KEEP
    }
}`,
      explanation:
        'Second line of defense. If the blacklist didn\'t catch it, we ask Claude. The body is truncated to 1,000 characters to keep cost down - we don\'t need the full email to classify it. The prompt is tuned for Will\'s specific needs as an agency owner: filter receipts, calendar invites, newsletters, sales pitches. Keep real human messages that need a response. "When in doubt, FILTER" - Will would rather miss a newsletter than get buried in noise. Claude responds with either "KEEP" or "FILTER: reason" which gets stored as the filter_reason in the database. This is a non-streaming call since we just need a short classification, not a conversation.',
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

    let calendar_client = CalendarClient::new(
        http_client.clone(),
        user_access_token.to_string(),
    );

    let result = calendar_client.list_events(
        "primary",
        Some(&time_min),
        Some(&time_max),
        Some(&email_addr), // searches by attendee email
        5,                  // max 5 recent meetings
        None,
    ).await;

    match result {
        Err(_) => String::new(), // fail silently
        Ok(events) => events.iter().map(|event| {
            let summary = event.summary.as_deref().unwrap_or("Untitled");
            let start_time = /* extract date */;
            format!("- Meeting: '{}' on {}", summary, start_time)
        }).collect::<Vec<_>>().join("\\n")
    }
}`,
      explanation:
        "Before generating the AI summary, we look up the last 30 days of calendar events involving the email sender. This gives Claude context like \"you met with this person last week about Q2 Planning.\" The result is a simple newline-joined list that gets injected into the summarization prompt. If the Calendar API fails, we just return an empty string and summarize without context - we never block the pipeline on optional enrichment. Limited to 5 events to keep the context concise.",
    },
    {
      title: "AI summary generation",
      code: `pub async fn ai_summarize_email(
    http_client: &reqwest::Client,
    sender: &str,
    subject: &str,
    body: &str,
    context: &str,
) -> Result<String, String> {
    let truncated_body = truncate_str(body, 3000);

    let context_section = if context.is_empty() {
        String::new()
    } else {
        format!("\\nContext about the sender:\\n{}", context)
    };

    let prompt = format!(
        r#"Summarize this email in 1-2 sentences. Focus on what the sender
wants or is communicating and any action required.{context_section}

From: {sender}
Subject: {subject}
Body: {body}

Summary (1-2 sentences):"#);

    // ... calls Claude API, returns summary text ...
}`,
      explanation:
        "For emails that survive both filters, we generate a 1-2 sentence summary. The body gets 3,000 characters here (more than the filter step) because we need enough content to write a good summary. The calendar context from the previous step is injected if available, so the summary can reference recent meetings. The prompt asks for action-oriented summaries - \"what does the sender want\" and \"what action is required\" - because the whole point is helping Will decide what to do with each email quickly.",
    },
    {
      title: "Main pipeline - orchestrating the full flow",
      code: `pub async fn process_email(
    app_state: &AppState,
    user_id: i32,
    user_access_token: &str,
    gmail_message: &GmailMessage,
    filter_rules: &[EmailFilterRule],
) -> Result<Option<i32>, String> {

    // 1. Skip if already in queue
    let already_exists = database::email_exists_in_queue(&mut conn, gmail_message_id, user_id)?;
    if already_exists { return Ok(None); }

    // 2. Parse the raw Gmail message
    let parsed = parse_email(gmail_message);

    // 3. Check blacklist rules (free, instant)
    let blacklist_result = check_blacklist(filter_rules, sender, subject);
    if let Some(reason) = blacklist_result {
        database::insert_email_queue_entry(/* ... filtered_out=true ... */)?;
        return Ok(Some(id));
    }

    // 4. Ask Claude to classify (costs money, takes ~1s)
    let ai_filter_result = ai_filter_email(/* ... */).await;
    if let Ok(Some(reason)) = ai_filter_result {
        database::insert_email_queue_entry(/* ... filtered_out=true ... */)?;
        return Ok(Some(id));
    }

    // 5. Gather calendar context (free, may fail silently)
    let context = gather_context(/* ... */).await;

    // 6. Generate AI summary (costs money, takes ~1s)
    let ai_summary = ai_summarize_email(/* ... */).await.ok();

    // 7. Store the kept email with its summary
    let id = database::insert_email_queue_entry(
        /* ... filtered_out=false, ai_summary, raw_json ... */
    )?;

    Ok(Some(id))
}`,
      explanation:
        'This is the main orchestrator - it runs the full pipeline for a single email. The order is deliberate: cheapest checks first. (1) Skip duplicates (free database check). (2) Parse the email. (3) Run blacklist rules (free, instant). (4) Only if the blacklist passed, call Claude to classify (costs ~$0.001, takes ~1 second). (5) Only if Claude said KEEP, gather calendar context. (6) Only if kept, generate the AI summary. (7) Store everything. Each filter step short-circuits - if the email is filtered at step 3, we never pay for steps 4-6. A single email costs two Claude API calls if kept (filter + summarize), zero if blacklisted, one if AI-filtered.',
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
                Err(e) => { /* log error */ }
            }
            tokio::time::sleep(interval).await;
        }
    });
}`,
      explanation:
        "Spawns a tokio task that runs forever. Every poll_interval_secs (currently 120 seconds), it wakes up and polls all users. This is the development stopgap - in production, Gmail push notifications (webhooks) will trigger processing immediately when new email arrives. The loop never panics - errors are logged and the next cycle continues.",
    },
    {
      title: "Discovering users to poll",
      code: `pub async fn poll_all_users(app_state: &AppState) -> Result<usize, String> {
    let user_ids: Vec<(i32, String)> = {
        use crate::schema::{google_tokens, users};
        google_tokens::table
            .inner_join(users::table.on(users::id.eq(google_tokens::user_id)))
            .select((users::id, users::email))
            .load(&mut conn)?
    };

    drop(conn); // release connection before async work

    for (user_id, user_email) in &user_ids {
        poll_user_emails(app_state, *user_id, user_email).await;
    }
    Ok(user_ids.len())
}`,
      explanation:
        "Finds every user who has stored Google OAuth tokens (meaning they've logged in and granted Gmail access). Important detail: the database connection is dropped before starting the async polling loop. This is because each poll_user_emails call will acquire its own connection, and holding one across await points would block other requests from using the connection pool.",
    },
    {
      title: "Per-user email fetch and deduplication",
      code: `pub async fn poll_user_emails(/* ... */) -> Result<(), String> {
    let access_token = get_valid_access_token(app_state, user_id).await?;
    let gmail = GmailClient::new(app_state.reqwest_client.clone(), access_token.clone());

    // Fetch unread inbox messages (max 20 per poll)
    let message_list = gmail
        .list_messages_by_labels(&["INBOX", "UNREAD"], None, 20)
        .await?;

    let filter_rules = database::list_email_filter_rules(&mut conn, user_id)?;

    // Deduplicate by thread: only process newest message per thread,
    // skip threads already in the queue
    let mut seen_threads: HashSet<String> = HashSet::new();
    let mut new_message_ids: Vec<String> = Vec::new();
    for msg_ref in &message_list.messages {
        if seen_threads.contains(&msg_ref.thread_id) { continue; }
        seen_threads.insert(msg_ref.thread_id.clone());

        let exists = database::email_exists_in_queue(&mut conn, &msg_ref.id, user_id)?;
        if !exists {
            let thread_exists = database::email_thread_exists_in_queue(
                &mut conn, &msg_ref.thread_id, user_id
            )?;
            if !thread_exists {
                new_message_ids.push(msg_ref.id.clone());
            }
        }
    }

    // Process each new message through the pipeline
    for message_id in &new_message_ids {
        let full_msg = gmail.get_message(message_id).await?;
        pipeline::process_email(app_state, user_id, &access_token, &full_msg, &filter_rules).await;
    }

    Ok(())
}`,
      explanation:
        "The core per-user polling logic. Fetches up to 20 unread inbox messages, then deduplicates by thread - if a thread has multiple unread messages, only the newest one gets processed. Also checks if the thread is already in the queue to avoid reprocessing. This deduplication is important because Gmail returns individual messages, but the user thinks in threads. Without it, a 5-message email thread would show up as 5 separate items in the triage queue. Each surviving message gets fetched in full and sent through the pipeline.",
    },
    {
      title: "Token refresh",
      code: `async fn get_valid_access_token(
    app_state: &AppState,
    user_id: i32,
) -> Result<String, String> {
    let stored_token = database::get_google_tokens(&mut conn, user_id)?
        .ok_or("No Google tokens stored")?
        .access_token;

    // Quick validation call
    let resp = app_state.reqwest_client
        .get("https://www.googleapis.com/oauth2/v3/tokeninfo")
        .query(&[("access_token", &stored_token)])
        .send().await;

    if let Ok(r) = resp {
        if r.status().is_success() {
            return Ok(stored_token);
        }
    }

    // Token expired - refresh using the app's OAuth infrastructure
    crate::auth::oauth::refresh_access_token(app_state, user_id).await
}`,
      explanation:
        "Background polling can't rely on the user being logged in, so it needs to handle token refresh itself. First tries the stored token with a quick validation call to Google's tokeninfo endpoint. If the token is expired (returns non-200), falls back to the app's existing refresh_access_token function which uses the stored refresh token to get a new access token. This reuses the auth infrastructure the Chat Engine already built - the polling system doesn't reinvent OAuth.",
    },
  ],
};
