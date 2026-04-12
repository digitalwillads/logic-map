import { useState } from "react";
import type { LogicMap, System } from "../types/logic-map";
import "./document.css";

interface DocumentViewProps {
  logicMap: LogicMap;
}

export function DocumentView({ logicMap }: DocumentViewProps) {
  // Nav state: which page are we on?
  const [activePage, setActivePage] = useState<string>(
    logicMap.systems[0]?.id || ""
  );

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

  // Build nav
  const navItems: {
    id: string;
    label: string;
    indent: boolean;
    color: string;
  }[] = [];
  for (const system of logicMap.systems) {
    // Assign colors by role
    let color = "#6b7280"; // default gray
    if (system.id === "chat_engine") color = "#3b82f6"; // blue
    if (system.id === "auth" || system.id === "database") color = "#8b5cf6"; // purple - infra
    if (system.id === "email_triage" || system.id === "meeting_review")
      color = "#10b981"; // green - pipelines

    navItems.push({ id: system.id, label: system.name, indent: false, color });
    for (const child of system.children || []) {
      navItems.push({
        id: child.id,
        label: child.name,
        indent: true,
        color: "#94a3b8",
      });
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
        <div className="nav-title">{logicMap.project}</div>
        <ul>
          {navItems.map((item) => (
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
          ))}
        </ul>
      </nav>

      {/* Page content */}
      <main className="doc-content" key={activePage}>
        {activeSystem ? (
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
      <p className="page-body">{system.description}</p>

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

      {/* Child systems (tools) */}
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
