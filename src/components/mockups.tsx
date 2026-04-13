import "./mockups.css";

export function ChatMockup() {
  return (
    <div className="mockup">
      <div className="mock-chat">
        <div className="mock-sidebar">
          <div className="mock-sidebar-header">
            <span className="mock-btn-new">+ New Chat</span>
          </div>
          <div className="mock-thread active">Meeting prep - Barbara Ann</div>
          <div className="mock-thread">Nzymes campaign review</div>
          <div className="mock-thread">Eddie's inbox check</div>
        </div>
        <div className="mock-main">
          <div className="mock-tabs">
          </div>
          <div className="mock-messages">
            <div className="mock-msg user">What's on my calendar tomorrow?</div>
            <div className="mock-tool">get_calendar_events</div>
            <div className="mock-msg assistant">You have 3 meetings tomorrow: <br/>- 9:00 AM - Team standup<br/>- 11:00 AM - Barbara Ann (client call)<br/>- 2:00 PM - Nzymes ad review with Eddie</div>
            <div className="mock-msg user">Draft a prep email to Barbara Ann about tomorrow's call</div>
            <div className="mock-tool">search_emails</div>
            <div className="mock-tool">search_recording_by_event</div>
            <div className="mock-msg assistant">Here's a draft based on your last meeting notes and recent emails...</div>
          </div>
          <div className="mock-input">
            <span>Type a message...</span>
            <span className="mock-send">Send</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmailTriageMockup() {
  return (
    <div className="mockup">
      <div className="mock-triage">
        <div className="mock-triage-header">
          <span className="mock-triage-count">Email 3 of 28</span>
          <div className="mock-triage-actions">
            <span className="mock-btn">Archive</span>
            <span className="mock-btn primary">Next</span>
          </div>
        </div>
        <div className="mock-email">
          <div className="mock-email-meta">
            <strong>Sarah Chen</strong> &lt;sarah@nzymes.com&gt;
            <span className="mock-email-date">Today, 2:34 PM</span>
          </div>
          <div className="mock-email-subject">Re: Q2 campaign budget approval</div>
          <div className="mock-email-summary">
            <span className="mock-ai-tag">AI Summary</span>
            Sarah is asking for approval on the revised Q2 budget. She's increased the social spend by 15% based on last month's performance. Needs a response by Friday.
          </div>
          <div className="mock-email-body">
            Hi Will,<br/><br/>
            Following up on our call yesterday - I've attached the revised Q2 budget with the changes we discussed. Main update is the 15% increase to social...<br/><br/>
            <span className="mock-faded">[ full email body ]</span>
          </div>
          <div className="mock-email-context">
            <span className="mock-context-tag">Last meeting: Apr 8 - Q2 Planning</span>
            <span className="mock-context-tag">4 emails this week</span>
          </div>
        </div>
        <div className="mock-email-chat">
          <div className="mock-msg assistant">This needs a response - Sarah is waiting on budget approval. Want me to draft a reply?</div>
          <div className="mock-input">
            <span>Ask about this email...</span>
            <span className="mock-send">Send</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MeetingReviewMockup() {
  return (
    <div className="mockup">
      <div className="mock-meeting">
        <div className="mock-meeting-header">
          <div>
            <div className="mock-meeting-name">Built for me w/ Brandon Douglas &amp; DigitalWill</div>
            <div className="mock-meeting-meta">Apr 09 at 3:12 PM - 4 attendees - 1 of 6</div>
          </div>
          <span className="mock-btn primary">Done - Next Meeting</span>
        </div>
        <div className="mock-meeting-body">
          <div className="mock-tasks-header">Action Items</div>
          <div className="mock-task">
            <span className="mock-task-title">Send payment link to Brandon</span>
            <span className="mock-task-actions">
              <span className="mock-btn small">Triage Now</span>
              <span className="mock-btn small outline">Report</span>
            </span>
          </div>
          <div className="mock-task">
            <span className="mock-task-title">Find and activate pond aquatics sales and pond aquatics service campaigns</span>
            <span className="mock-task-actions">
              <span className="mock-btn small">Triage Now</span>
              <span className="mock-btn small outline">Report</span>
            </span>
          </div>
          <div className="mock-task">
            <span className="mock-task-title">Put notes about pond campaigns that need to be found and activated</span>
            <span className="mock-task-actions">
              <span className="mock-btn small">Triage Now</span>
              <span className="mock-btn small outline">Report</span>
            </span>
          </div>
          <div className="mock-task">
            <span className="mock-task-title">Set shopping campaigns location targeting to 50 miles radius</span>
            <span className="mock-task-actions">
              <span className="mock-btn small">Triage Now</span>
              <span className="mock-btn small outline">Report</span>
            </span>
          </div>
        </div>
        <div className="mock-email-chat">
          <div className="mock-input">
            <span>Ask about this meeting...</span>
            <span className="mock-send">Send</span>
          </div>
        </div>
      </div>
    </div>
  );
}
