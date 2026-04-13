import { useState, useRef, useEffect } from "react";
import type { LogicMap, System } from "../types/logic-map";
import { ChatMockup, EmailTriageMockup, MeetingReviewMockup } from "./mockups";
import { CodeView, type CodeAnnotation } from "./CodeView";
import {
  emailTriagePipeline, emailTriagePolling, emailChatEndpoint,
  chatEndpoint, toolExecutor, claudeClient, toolDefinitions,
  meetingPipeline, meetingPolling, meetingChatEndpoint,
  gmailClient, gmailTools, calendarClient, calendarTools,
  recorderTools, chadAdsTools, tasksTools, tasksClient, stripeTools,
  adminDelegation, authOauth,
  mainServer, databaseLayer,
  emailTriageUI, emailAPI,
  meetingReviewUI, meetingAPI,
  chatPage, chatBox, chatBoxServer,
} from "../data/code-annotations";
import "./document.css";

// Map function/system IDs to their UI mockups
const mockupMap: Record<string, () => JSX.Element> = {
  "chat_engine": ChatMockup,
  "email_triage.ui": EmailTriageMockup,
  "meeting_review.ui": MeetingReviewMockup,
};

// Map system IDs to their annotated code files
const codeMap: Record<string, { label: string; annotation: CodeAnnotation }[]> = {
  "chat_engine": [
    { label: "chat_endpoint.rs - SSE streaming and tool loop", annotation: chatEndpoint },
    { label: "tool_executor.rs - Tool dispatch and scope checking", annotation: toolExecutor },
    { label: "claude_client.rs - API request construction", annotation: claudeClient },
    { label: "tools/mod.rs - Tool definitions and admin gating", annotation: toolDefinitions },
    { label: "chat_box.rs - Chat UI and SSE handling", annotation: chatBox },
    { label: "chat_box.rs - Server functions (save, title, start)", annotation: chatBoxServer },
    { label: "chat_page.rs - Tab management and badge polling", annotation: chatPage },
    { label: "main.rs - Server setup and background tasks", annotation: mainServer },
    { label: "database.rs - All persistence operations (47 functions)", annotation: databaseLayer },
  ],
  "auth": [
    { label: "oauth.rs - Login flow, token refresh, scope management", annotation: authOauth },
    { label: "admin.rs - Service account delegation and JWT creation", annotation: adminDelegation },
  ],
  "email_triage": [
    { label: "pipeline.rs - Email processing pipeline", annotation: emailTriagePipeline },
    { label: "polling.rs - Background polling loop", annotation: emailTriagePolling },
    { label: "chat_endpoint.rs - Email-specific chat with send confirmation", annotation: emailChatEndpoint },
    { label: "email_triage.rs - Triage queue UI component", annotation: emailTriageUI },
    { label: "email_api.rs - Email queue server functions", annotation: emailAPI },
  ],
  "meeting_review": [
    { label: "pipeline.rs - Barbara Ann task extraction", annotation: meetingPipeline },
    { label: "polling.rs - Recording poll loop", annotation: meetingPolling },
    { label: "chat_endpoint.rs - Meeting chat with task management tools", annotation: meetingChatEndpoint },
    { label: "meeting_review.rs - Meeting review UI component", annotation: meetingReviewUI },
    { label: "meeting_api.rs - Meeting queue and task approval server functions", annotation: meetingAPI },
  ],
  "gmail": [
    { label: "tools/gmail.rs - Search, send, reply, draft tools (9 functions)", annotation: gmailTools },
    { label: "client.rs - Gmail API client and MIME parsing (15 functions)", annotation: gmailClient },
  ],
  "calendar": [
    { label: "client.rs - Calendar API client (8 functions)", annotation: calendarClient },
    { label: "tools/calendar.rs - Timezone handling and event formatting (7 functions)", annotation: calendarTools },
  ],
  "recorder": [
    { label: "tools/recorder.rs - Recording search and transcripts (6 functions)", annotation: recorderTools },
  ],
  "chad_ads": [
    { label: "tools/chad_ads.rs - Google Ads conversational interface (3 functions)", annotation: chadAdsTools },
  ],
  "google_tasks": [
    { label: "tools/tasks.rs - Google Tasks tool handlers (12 functions)", annotation: tasksTools },
    { label: "tasks/client.rs - Google Tasks API client (12 functions)", annotation: tasksClient },
  ],
  "stripe": [
    { label: "tools/stripe.rs - Stripe billing queries (5 functions)", annotation: stripeTools },
  ],
};

interface DocumentViewProps {
  logicMap: LogicMap;
}

export function DocumentView({ logicMap }: DocumentViewProps) {
  // Nav state: which page are we on?
  const [activePage, setActivePage] = useState<string>("overview");
  const [activeCode, setActiveCode] = useState<CodeAnnotation | null>(null);
  const contentRef = useRef<HTMLElement>(null);

  // Scroll content to top when page changes
  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
  }, [activePage]);

  // Find the active system (could be top-level or a child)
  let activeSystem: System | null = null;
  let parentSystem: System | null = null;
  for (const system of logicMap.systems) {
    if (system.id === activePage) {
      activeSystem = system;
      break;
    }
    for (const child of system.children || []) {
      if (child.id === activePage) {
        activeSystem = child;
        parentSystem = system;
        break;
      }
    }
    if (activeSystem) break;
  }

  // Build nav with grouped sections
  type NavItem =
    | { type: "header"; label: string }
    | { type: "link"; id: string; label: string; indent: boolean; color: string };

  const navItems: NavItem[] = [];
  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

  for (let i = 0; i < logicMap.systems.length; i++) {
    const system = logicMap.systems[i];
    const color = colors[i % colors.length];
    navItems.push({ type: "link", id: system.id, label: system.name, indent: false, color });
    for (const child of system.children || []) {
      navItems.push({ type: "link", id: child.id, label: child.name, indent: true, color: "#94a3b8" });
    }
  }

  const relatedEdges = activeSystem
    ? logicMap.relationships.filter(
        (r) =>
          r.from.startsWith(activeSystem!.id) ||
          r.to.startsWith(activeSystem!.id)
      )
    : [];

  return (
    <div className="doc-layout">
      {/* Left nav */}
      <nav className="doc-nav">
        <a
          className={`nav-title ${activePage === "overview" ? "active" : ""}`}
          onClick={() => setActivePage("overview")}
        >
          {logicMap.project}
        </a>
        <ul>
          {navItems.map((item, i) =>
            item.type === "header" ? (
              <li key={`h-${i}`} className="nav-section-header">
                {item.label}
              </li>
            ) : (
              <li key={item.id}>
                <a
                  className={`${item.indent ? "indent" : ""} ${activePage === item.id ? "active" : ""}`}
                  onClick={() => setActivePage(item.id)}
                >
                  <span
                    className="nav-dot"
                    style={{ background: item.color }}
                  />
                  {item.label}
                </a>
              </li>
            )
          )}
        </ul>
      </nav>

      {/* Page content */}
      <main className="doc-content" key={activeCode ? "code" : activePage} ref={contentRef}>
        {activeCode ? (
          <CodeView
            annotations={activeCode}
            onBack={() => setActiveCode(null)}
            backLabel={activeSystem?.name || "Back"}
          />
        ) : activePage === "overview" ? (
          <OverviewPage logicMap={logicMap} onNavigate={setActivePage} />
        ) : activePage === "automation_overview" ? (
          <AutomationOverviewPage
            automations={logicMap.systems.filter((s) =>
              ["email_triage", "meeting_review"].includes(s.id)
            )}
            onNavigate={setActivePage}
          />
        ) : activeSystem ? (
          <SystemPage
            system={activeSystem}
            parent={parentSystem}
            relationships={relatedEdges}
            onNavigate={setActivePage}
            onViewCode={setActiveCode}
          />
        ) : (
          <div className="doc-empty">Select a system from the left.</div>
        )}
      </main>
    </div>
  );
}

/* ---- Overview Page ---- */

/* ---- Automation Overview Page ---- */

function AutomationOverviewPage({
  automations,
  onNavigate,
}: {
  automations: System[];
  onNavigate: (id: string) => void;
}) {
  return (
    <>
      <h1>Chat Automation Tabs</h1>
      <p className="page-lead">
        Dedicated UI tabs that extend the Chat Engine with proactive, automated workflows. Instead of waiting for a user to ask Claude a question, these tabs process data in the background and present it for human review.
      </p>

      <div className="context-block">
        <div className="context-row">
          <span className="context-label">How they relate to the Chat Engine</span>
          <p>
            Each automation tab reuses the Chat Engine's existing infrastructure - the same Claude API client, the same tool executor, the same Gmail/Calendar/Tasks integrations. They don't rebuild any of that. What they add is a background polling pipeline that fetches and processes data automatically, and a dedicated UI tab that presents the results for human review. The chat input inside each tab connects to the same Claude but with narrower context - it knows about the specific email or meeting being reviewed.
          </p>
        </div>
        <div className="context-row">
          <span className="context-label">Architecture pattern</span>
          <p>
            Every automation tab follows the same pattern: (1) a webhook endpoint that receives events from the external service (Gmail push notifications for new emails, recording service callbacks when a transcript is ready), (2) an AI processing pipeline that classifies, summarizes, or extracts structured data from the raw input, (3) a database queue that stores processed items with their status, (4) a dedicated chat endpoint that gives Claude context about the specific item being reviewed, and (5) a UI card component that presents the queue and lets users take action. Currently using polling as a stopgap during development - webhooks are the real architecture.
          </p>
        </div>
        <div className="context-row">
          <span className="context-label">Why they're separate from the main chat</span>
          <p>
            The main chat is reactive - the user asks, Claude responds. These tabs are proactive - the system processes data before the user asks. Email Triage pre-sorts the inbox so the user reviews a filtered queue instead of raw email. Meeting Review pre-extracts action items so the user approves tasks instead of watching transcripts. Both save hours of manual work by doing the AI processing upfront.
          </p>
        </div>
      </div>

      <h3 className="section-heading" style={{ marginTop: 32, borderBottom: "1px solid #e5e7eb", paddingBottom: 8 }}>Tabs</h3>
      {automations.map((s) => (
        <a key={s.id} className="overview-card" onClick={() => onNavigate(s.id)}>
          <h4>{s.name}</h4>
          <p>{s.intent}</p>
          {s.why && <p className="overview-why">{s.why}</p>}
        </a>
      ))}
    </>
  );
}

/* ---- Overview Page ---- */

function OverviewPage({
  logicMap,
  onNavigate,
}: {
  logicMap: LogicMap;
  onNavigate: (id: string) => void;
}) {
  // Count totals (including children)
  let totalSystems = 0;
  let totalFunctions = 0;
  let totalDecisions = 0;
  let totalRelationships = logicMap.relationships.length;
  let totalCodeFiles = Object.values(codeMap).reduce((sum, files) => sum + files.length, 0);

  const countSystem = (s: System) => {
    totalSystems++;
    totalFunctions += s.functions.length;
    for (const fn of s.functions) totalDecisions += fn.decisions.length;
    for (const c of s.children || []) countSystem(c);
  };
  for (const s of logicMap.systems) countSystem(s);

  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

  return (
    <>
      <h1>{logicMap.project}</h1>
      <p className="page-lead">{logicMap.intent}</p>
      <span className="doc-version">Updated {logicMap.version}</span>

      <div className="overview-stats">
        <div className="stat">
          <span className="stat-number">{totalSystems}</span>
          <span className="stat-label">systems</span>
        </div>
        <div className="stat">
          <span className="stat-number">{totalFunctions}</span>
          <span className="stat-label">functions</span>
        </div>
        <div className="stat">
          <span className="stat-number">{totalDecisions}</span>
          <span className="stat-label">decisions</span>
        </div>
        <div className="stat">
          <span className="stat-number">{totalRelationships}</span>
          <span className="stat-label">connections</span>
        </div>
        <div className="stat">
          <span className="stat-number">{totalCodeFiles}</span>
          <span className="stat-label">annotated files</span>
        </div>
      </div>

      {logicMap.systems.map((s, i) => (
        <section key={s.id} className="overview-group">
          <h3 className="overview-group-title">
            <span className="nav-dot" style={{ background: colors[i % colors.length] }} />
            {s.name}
          </h3>
          {s.intent && <p className="overview-group-desc">{s.intent}</p>}
          <div>
            <OverviewCard system={s} onNavigate={onNavigate} />
            {s.children && s.children.length > 0 && (
              <div className="overview-children">
                {s.children.map((c) => (
                  <OverviewCardSmall key={c.id} system={c} onNavigate={onNavigate} />
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </>
  );
}

function OverviewCard({
  system,
  onNavigate,
}: {
  system: System;
  onNavigate: (id: string) => void;
}) {
  return (
    <a className="overview-card" onClick={() => onNavigate(system.id)}>
      <h4>{system.name}</h4>
      <p>{system.intent}</p>
      {system.why && <p className="overview-why">{system.why}</p>}
    </a>
  );
}

function OverviewCardSmall({
  system,
  onNavigate,
}: {
  system: System;
  onNavigate: (id: string) => void;
}) {
  return (
    <a className="overview-card-sm" onClick={() => onNavigate(system.id)}>
      <h5>{system.name}</h5>
      <p>{system.intent}</p>
    </a>
  );
}

/* ---- System Page ---- */

function SystemPage({
  system,
  parent,
  relationships,
  onNavigate,
  onViewCode,
}: {
  system: System;
  parent: System | null;
  relationships: { from: string; to: string; description: string }[];
  onNavigate: (id: string) => void;
  onViewCode: (annotation: CodeAnnotation) => void;
}) {
  const hasInvariants = system.invariants && system.invariants.length > 0;
  const hasEntities = system.entities && system.entities.length > 0;
  const hasChildren = system.children && system.children.length > 0;
  const codeFiles = codeMap[system.id];

  return (
    <>
      {/* Breadcrumb */}
      {parent && (
        <div className="breadcrumb">
          <a onClick={() => onNavigate(parent.id)}>{parent.name}</a>
          <span className="breadcrumb-sep">/</span>
          <span>{system.name}</span>
        </div>
      )}

      {/* Header */}
      <h1>{system.name}</h1>
      <p className="page-lead">{system.intent}</p>

      {/* Context block: why, who, description */}
      <div className="context-block">
        {system.why && (
          <div className="context-row">
            <span className="context-label">Why this exists</span>
            <p>{system.why}</p>
          </div>
        )}
        {system.who && (
          <div className="context-row">
            <span className="context-label">Who uses this</span>
            <p>{system.who}</p>
          </div>
        )}
        <div className="context-row">
          <span className="context-label">How it works</span>
          <p>{system.description}</p>
        </div>
      </div>

      {/* Limitations */}
      {system.limitations && system.limitations.length > 0 && (
        <div className="limitations-block">
          <h5 className="limitations-heading">Known limitations</h5>
          <ul>
            {system.limitations.map((lim, i) => (
              <li key={i}>{lim}</li>
            ))}
          </ul>
        </div>
      )}

      {/* UI Mockup */}
      {mockupMap[system.id] && (
        <div className="screenshot-block">{mockupMap[system.id]()}</div>
      )}
      {system.screenshot && (
        <div className="screenshot-block">
          <img src={system.screenshot} alt={`${system.name} UI`} />
        </div>
      )}

      {/* History */}
      {system.history && system.history.length > 0 && (
        <CollapsibleSection title="History" defaultOpen={false}>
          <ol className="history-list">
            {system.history.map((entry, i) => (
              <li key={i}>{entry}</li>
            ))}
          </ol>
        </CollapsibleSection>
      )}

      {/* Rules */}
      {hasInvariants && (
        <CollapsibleSection title="Rules" defaultOpen>
          <dl className="def-list">
            {system.invariants!.map((inv) => (
              <div key={inv.id} className="def-item">
                <dt>{inv.name}</dt>
                <dd>{inv.description}</dd>
              </div>
            ))}
          </dl>
        </CollapsibleSection>
      )}

      {/* Data */}
      {hasEntities && (
        <CollapsibleSection title="Data" defaultOpen>
          {system.entities!.map((entity) => (
            <EntityBlock key={entity.id} entity={entity} />
          ))}
        </CollapsibleSection>
      )}

      {/* Connections */}
      {relationships.length > 0 && (
        <CollapsibleSection title="Connections" defaultOpen={false}>
          <ul className="connection-list">
            {relationships.map((rel, i) => (
              <li key={i}>{rel.description}</li>
            ))}
          </ul>
        </CollapsibleSection>
      )}

      {/* Functions */}
      {system.functions.length > 0 && (
        <CollapsibleSection title="Functions" defaultOpen>
          {system.functions.map((fn) => (
            <FunctionBlock key={fn.id} fn={fn} />
          ))}
        </CollapsibleSection>
      )}

      {/* Child systems (integrations) */}
      {hasChildren && (
        <section className="children-section">
          <h3 className="section-heading">Tools</h3>
          <div className="children-grid">
            {system.children!.map((child) => (
              <a
                key={child.id}
                className="child-card"
                onClick={() => onNavigate(child.id)}
              >
                <h4>{child.name}</h4>
                <p>{child.intent}</p>
                <span className="child-meta">
                  {child.functions.length} function
                  {child.functions.length !== 1 ? "s" : ""}
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {codeFiles && codeFiles.length > 0 && (
        <section className="code-links-section">
          <h3 className="section-heading">Source Code</h3>
          {codeFiles.map((cf, i) => (
            <a
              key={i}
              className="code-link"
              onClick={() => onViewCode(cf.annotation)}
            >
              <span className="code-link-icon">{"</>"}</span>
              <span>{cf.label}</span>
            </a>
          ))}
        </section>
      )}
    </>
  );
}

/* ---- Collapsible Section ---- */

function CollapsibleSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="collapsible">
      <button
        className="collapsible-header"
        onClick={() => setOpen(!open)}
      >
        <h3 className="section-heading">{title}</h3>
        <span className="collapsible-indicator">{open ? "\u2212" : "+"}</span>
      </button>
      {open && <div className="collapsible-body">{children}</div>}
    </section>
  );
}

/* ---- Entity Block ---- */

function EntityBlock({
  entity,
}: {
  entity: { id: string; name: string; description: string; key_fields: string[] };
}) {
  const [showFields, setShowFields] = useState(false);

  return (
    <div className="entity-block">
      <div className="entity-header">
        <h4>{entity.name}</h4>
        {entity.key_fields.length > 0 && (
          <button
            className="entity-toggle"
            onClick={() => setShowFields(!showFields)}
          >
            {showFields ? "Hide fields" : `${entity.key_fields.length} fields`}
          </button>
        )}
      </div>
      <p>{entity.description}</p>
      {showFields && (
        <div className="field-list">
          {entity.key_fields.map((f, i) => (
            <div key={i} className="field-row">{f}</div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---- Function Block ---- */

function FunctionBlock({ fn }: { fn: System["functions"][0] }) {
  const [showDecisions, setShowDecisions] = useState(false);
  const hasDecisions = fn.decisions.length > 0;

  return (
    <div className={`fn-block ${fn.uncertain ? "uncertain" : ""}`}>
      <div className="fn-header">
        <h4>
          {fn.name}
          {fn.uncertain && <span className="badge-uncertain">?</span>}
        </h4>
        {hasDecisions && (
          <button
            className="fn-toggle"
            onClick={() => setShowDecisions(!showDecisions)}
          >
            {showDecisions
              ? "Hide decisions"
              : `${fn.decisions.length} decision${fn.decisions.length > 1 ? "s" : ""}`}
          </button>
        )}
      </div>
      <p>{fn.description}</p>
      {fn.source && <code className="source-path">{fn.source}</code>}
      {mockupMap[fn.id] && (
        <div className="screenshot-block">{mockupMap[fn.id]()}</div>
      )}
      {fn.screenshot && (
        <div className="screenshot-block">
          <img src={fn.screenshot} alt={`${fn.name} UI`} />
        </div>
      )}
      {fn.uncertain && fn.uncertainty_note && (
        <aside className="note-uncertain">{fn.uncertainty_note}</aside>
      )}

      {showDecisions && (
        <div className="decisions-list">
          {fn.decisions.map((dec) => (
            <div
              key={dec.id}
              className={`dec-block ${dec.uncertain ? "uncertain" : ""}`}
            >
              <h5>
                {dec.name}
                {dec.uncertain && <span className="badge-uncertain">?</span>}
              </h5>
              <p>{dec.description}</p>
              {dec.rationale && (
                <p className="rationale">
                  <strong>Why:</strong> {dec.rationale}
                </p>
              )}
              {dec.source && <code className="source-path">{dec.source}</code>}
              {dec.uncertain && dec.uncertainty_note && (
                <aside className="note-uncertain">
                  {dec.uncertainty_note}
                </aside>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
