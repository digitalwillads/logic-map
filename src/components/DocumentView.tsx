import { useState, useRef, useEffect, useCallback } from "react";
import type { LogicMap, System } from "../types/logic-map";
import "./document.css";

interface DocumentViewProps {
  logicMap: LogicMap;
}

export function DocumentView({ logicMap }: DocumentViewProps) {
  const [activeId, setActiveId] = useState<string>(
    logicMap.systems[0]?.id || ""
  );
  const contentRef = useRef<HTMLDivElement>(null);

  // Track which section is visible as user scrolls
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { root: container, rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    const sections = container.querySelectorAll("[data-nav-id]");
    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [logicMap]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const renderFunction = (fn: System["functions"][0]) => (
    <div key={fn.id} className="doc-fn">
      <h4>
        {fn.name}
        {fn.uncertain && <span className="badge-uncertain">?</span>}
      </h4>
      <p>{fn.description}</p>
      {fn.source && <code className="source-path">{fn.source}</code>}
      {fn.uncertain && fn.uncertainty_note && (
        <aside className="note-uncertain">{fn.uncertainty_note}</aside>
      )}
      {fn.decisions.length > 0 && (
        <div className="doc-decisions">
          {fn.decisions.map((dec) => (
            <div key={dec.id} className="doc-dec">
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
                <aside className="note-uncertain">{dec.uncertainty_note}</aside>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderChildSystem = (child: System) => {
    const relatedEdges = logicMap.relationships.filter(
      (r) => r.from.startsWith(child.id) || r.to.startsWith(child.id)
    );

    return (
      <div key={child.id} id={child.id} data-nav-id className="doc-child-section">
        <h3>{child.name}</h3>
        <p className="section-lead">{child.intent}</p>

        {child.invariants && child.invariants.length > 0 && (
          <>
            <h5>Rules</h5>
            <dl className="def-list">
              {child.invariants.map((inv) => (
                <div key={inv.id}>
                  <dt>{inv.name}</dt>
                  <dd>{inv.description}</dd>
                </div>
              ))}
            </dl>
          </>
        )}

        {child.entities && child.entities.length > 0 && (
          <>
            <h5>Data</h5>
            {child.entities.map((entity) => (
              <div key={entity.id} className="entity-block">
                <h6>{entity.name}</h6>
                <p>{entity.description}</p>
                <div className="field-list">
                  {entity.key_fields.map((f, i) => (
                    <code key={i}>{f}</code>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {relatedEdges.length > 0 && (
          <>
            <h5>Connections</h5>
            <ul className="connection-list">
              {relatedEdges.map((rel, i) => (
                <li key={i}>{rel.description}</li>
              ))}
            </ul>
          </>
        )}

        {child.functions.map(renderFunction)}
      </div>
    );
  };

  // Build nav items
  const navItems: { id: string; label: string; indent: boolean }[] = [];
  for (const system of logicMap.systems) {
    navItems.push({ id: system.id, label: system.name, indent: false });
    for (const child of system.children || []) {
      navItems.push({ id: child.id, label: child.name, indent: true });
    }
  }

  return (
    <div className="doc-layout">
      {/* Left nav */}
      <nav className="doc-nav">
        <div className="nav-title">{logicMap.project}</div>
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                className={`${item.indent ? "indent" : ""} ${activeId === item.id ? "active" : ""}`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main content */}
      <main className="doc-content" ref={contentRef}>
        <header className="doc-header">
          <h1>{logicMap.project}</h1>
          <p className="doc-intent">{logicMap.intent}</p>
          <span className="doc-version">Updated {logicMap.version}</span>
        </header>

        {logicMap.systems.map((system) => {
          const hasInvariants = system.invariants && system.invariants.length > 0;
          const hasEntities = system.entities && system.entities.length > 0;
          const hasChildren = system.children && system.children.length > 0;
          const relatedEdges = logicMap.relationships.filter(
            (r) =>
              r.from.startsWith(system.id) || r.to.startsWith(system.id)
          );

          return (
            <section key={system.id} id={system.id} data-nav-id className="doc-section">
              <h2>{system.name}</h2>
              <p className="section-lead">{system.intent}</p>
              <p className="section-body">{system.description}</p>

              {hasInvariants && (
                <>
                  <h5>Rules</h5>
                  <dl className="def-list">
                    {system.invariants!.map((inv) => (
                      <div key={inv.id}>
                        <dt>{inv.name}</dt>
                        <dd>{inv.description}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              )}

              {hasEntities && (
                <>
                  <h5>Data</h5>
                  {system.entities!.map((entity) => (
                    <div key={entity.id} className="entity-block">
                      <h6>{entity.name}</h6>
                      <p>{entity.description}</p>
                      <div className="field-list">
                        {entity.key_fields.map((f, i) => (
                          <code key={i}>{f}</code>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}

              {relatedEdges.length > 0 && (
                <>
                  <h5>Connections</h5>
                  <ul className="connection-list">
                    {relatedEdges.map((rel, i) => (
                      <li key={i}>{rel.description}</li>
                    ))}
                  </ul>
                </>
              )}

              {system.functions.map(renderFunction)}

              {hasChildren && (
                <div className="doc-children-group">
                  {system.children!.map(renderChildSystem)}
                </div>
              )}
            </section>
          );
        })}
      </main>
    </div>
  );
}
