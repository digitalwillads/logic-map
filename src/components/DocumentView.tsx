import { useState, useRef, useEffect } from "react";
import type { LogicMap, System } from "../types/logic-map";
import { ChatMockup, EmailTriageMockup, MeetingReviewMockup } from "./mockups";
import "./document.css";

// Map function/system IDs to their UI mockups
const mockupMap: Record<string, () => JSX.Element> = {
  "chat_engine": ChatMockup,
  "email_triage.ui": EmailTriageMockup,
  "meeting_review.ui": MeetingReviewMockup,
};

interface DocumentViewProps {
  logicMap: LogicMap;
}

export function DocumentView({ logicMap }: DocumentViewProps) {
  // Nav state: which page are we on?
  const [activePage, setActivePage] = useState<string>("overview");
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

  // Chat Engine + its children
  const chatEngine = logicMap.systems.find((s) => s.id === "chat_engine");
  if (chatEngine) {
    navItems.push({ type: "link", id: chatEngine.id, label: chatEngine.name, indent: false, color: "#3b82f6" });
    for (const child of chatEngine.children || []) {
      navItems.push({ type: "link", id: child.id, label: child.name, indent: true, color: "#94a3b8" });
    }
  }

  // Chat Automation Tabs
  const automationIds = ["email_triage", "meeting_review"];
  const automations = logicMap.systems.filter((s) => automationIds.includes(s.id));
  if (automations.length > 0) {
    navItems.push({ type: "header", label: "Chat Automation Tabs" });
    for (const s of automations) {
      navItems.push({ type: "link", id: s.id, label: s.name, indent: false, color: "#10b981" });
    }
  }

  // System
  const infraIds = ["auth", "database"];
  const infra = logicMap.systems.filter((s) => infraIds.includes(s.id));
  if (infra.length > 0) {
    navItems.push({ type: "header", label: "System" });
    for (const s of infra) {
      navItems.push({ type: "link", id: s.id, label: s.name, indent: false, color: "#8b5cf6" });
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
      <main className="doc-content" key={activePage} ref={contentRef}>
        {activePage === "overview" ? (
          <OverviewPage logicMap={logicMap} onNavigate={setActivePage} />
        ) : activeSystem ? (
          <SystemPage
            system={activeSystem}
            parent={parentSystem}
            relationships={relatedEdges}
            onNavigate={setActivePage}
          />
        ) : (
          <div className="doc-empty">Select a system from the left.</div>
        )}
      </main>
    </div>
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
  // Count totals
  let totalFunctions = 0;
  let totalDecisions = 0;
  let totalRelationships = logicMap.relationships.length;

  const countSystem = (s: System) => {
    totalFunctions += s.functions.length;
    for (const fn of s.functions) totalDecisions += fn.decisions.length;
    for (const c of s.children || []) countSystem(c);
  };
  for (const s of logicMap.systems) countSystem(s);

  // Group systems by role
  const core = logicMap.systems.filter((s) => s.id === "chat_engine");
  const pipelines = logicMap.systems.filter(
    (s) => s.id === "email_triage" || s.id === "meeting_review"
  );
  const infra = logicMap.systems.filter(
    (s) => s.id === "auth" || s.id === "database"
  );

  return (
    <>
      <h1>{logicMap.project}</h1>
      <p className="page-lead">{logicMap.intent}</p>
      <span className="doc-version">Updated {logicMap.version}</span>

      <div className="overview-stats">
        <div className="stat">
          <span className="stat-number">{logicMap.systems.length}</span>
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
      </div>

      <section className="overview-group">
        <h3 className="overview-group-title">
          <span className="nav-dot" style={{ background: "#3b82f6" }} />
          Core
        </h3>
        <p className="overview-group-desc">
          The chat engine and its integrations - how the team interacts with everything.
        </p>
        {core.map((s) => (
          <div key={s.id}>
            <OverviewCard system={s} onNavigate={onNavigate} />
            {s.children && s.children.length > 0 && (
              <div className="overview-children">
                {s.children.map((c) => (
                  <OverviewCardSmall key={c.id} system={c} onNavigate={onNavigate} />
                ))}
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="overview-group">
        <h3 className="overview-group-title">
          <span className="nav-dot" style={{ background: "#10b981" }} />
          Pipelines
        </h3>
        <p className="overview-group-desc">
          Background processing that runs automatically - email filtering and meeting task extraction.
        </p>
        {pipelines.map((s) => (
          <OverviewCard key={s.id} system={s} onNavigate={onNavigate} />
        ))}
      </section>

      <section className="overview-group">
        <h3 className="overview-group-title">
          <span className="nav-dot" style={{ background: "#8b5cf6" }} />
          Infrastructure
        </h3>
        <p className="overview-group-desc">
          Authentication and data storage that everything else depends on.
        </p>
        {infra.map((s) => (
          <OverviewCard key={s.id} system={s} onNavigate={onNavigate} />
        ))}
      </section>
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
}: {
  system: System;
  parent: System | null;
  relationships: { from: string; to: string; description: string }[];
  onNavigate: (id: string) => void;
}) {
  const hasInvariants = system.invariants && system.invariants.length > 0;
  const hasEntities = system.entities && system.entities.length > 0;
  const hasChildren = system.children && system.children.length > 0;

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
