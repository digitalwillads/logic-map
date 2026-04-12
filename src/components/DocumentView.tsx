import { useState } from "react";
import type { LogicMap, System } from "../types/logic-map";
import "./document.css";

interface DocumentViewProps {
  logicMap: LogicMap;
}

export function DocumentView({ logicMap }: DocumentViewProps) {
  const [expandedSystems, setExpandedSystems] = useState<Set<string>>(
    new Set(logicMap.systems.map((s) => s.id))
  );
  const [expandedChildren, setExpandedChildren] = useState<Set<string>>(
    new Set()
  );
  const [expandedFunctions, setExpandedFunctions] = useState<Set<string>>(
    new Set()
  );

  const toggle = (
    set: Set<string>,
    setter: React.Dispatch<React.SetStateAction<Set<string>>>,
    id: string
  ) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    const allSystems = new Set(logicMap.systems.map((s) => s.id));
    const allChildren = new Set<string>();
    const allFns = new Set<string>();
    for (const s of logicMap.systems) {
      for (const f of s.functions) allFns.add(f.id);
      for (const c of s.children || []) {
        allChildren.add(c.id);
        for (const f of c.functions) allFns.add(f.id);
      }
    }
    setExpandedSystems(allSystems);
    setExpandedChildren(allChildren);
    setExpandedFunctions(allFns);
  };

  const collapseAll = () => {
    setExpandedSystems(new Set());
    setExpandedChildren(new Set());
    setExpandedFunctions(new Set());
  };

  const renderFunction = (fn: System["functions"][0]) => {
    const isExpanded = expandedFunctions.has(fn.id);
    const hasDecisions = fn.decisions.length > 0;

    return (
      <div
        key={fn.id}
        className={`doc-fn ${isExpanded ? "expanded" : ""} ${fn.uncertain ? "uncertain" : ""}`}
      >
        <div
          className="doc-fn-header"
          onClick={() =>
            hasDecisions &&
            toggle(expandedFunctions, setExpandedFunctions, fn.id)
          }
          style={{ cursor: hasDecisions ? "pointer" : "default" }}
        >
          <div className="doc-fn-title">
            {hasDecisions && (
              <span className="chevron">{isExpanded ? "\u25BC" : "\u25B6"}</span>
            )}
            <h4>
              {fn.name}
              {fn.uncertain && <span className="badge-uncertain">?</span>}
            </h4>
          </div>
          <p>{fn.description}</p>
          {fn.source && <code className="source-path">{fn.source}</code>}
        </div>

        {fn.uncertain && fn.uncertainty_note && (
          <div className="note-uncertain">{fn.uncertainty_note}</div>
        )}

        {isExpanded && hasDecisions && (
          <div className="doc-decisions">
            {fn.decisions.map((dec) => (
              <div
                key={dec.id}
                className={`doc-dec ${dec.uncertain ? "uncertain" : ""}`}
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
                  <div className="note-uncertain">{dec.uncertainty_note}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderChildSystem = (child: System) => {
    const isExpanded = expandedChildren.has(child.id);
    const hasInvariants = child.invariants && child.invariants.length > 0;
    const hasEntities = child.entities && child.entities.length > 0;
    const relatedEdges = logicMap.relationships.filter(
      (r) => r.from.startsWith(child.id) || r.to.startsWith(child.id)
    );

    return (
      <div
        key={child.id}
        className={`doc-child ${isExpanded ? "expanded" : ""}`}
      >
        <div
          className="doc-child-header"
          onClick={() =>
            toggle(expandedChildren, setExpandedChildren, child.id)
          }
        >
          <span className="chevron">{isExpanded ? "\u25BC" : "\u25B6"}</span>
          <div>
            <h4>{child.name}</h4>
            <p>{child.intent}</p>
          </div>
        </div>

        {isExpanded && (
          <div className="doc-child-body">
            {hasInvariants && (
              <div className="doc-rules">
                <h6>Rules</h6>
                {child.invariants!.map((inv) => (
                  <div key={inv.id} className="doc-rule">
                    <strong>{inv.name}</strong>
                    <p>{inv.description}</p>
                  </div>
                ))}
              </div>
            )}

            {hasEntities && (
              <div className="doc-data">
                <h6>Data</h6>
                {child.entities!.map((entity) => (
                  <div key={entity.id} className="doc-entity-inline">
                    <strong>{entity.name}</strong>
                    <p>{entity.description}</p>
                    <div className="entity-fields-inline">
                      {entity.key_fields.map((f, i) => (
                        <span key={i} className="field-tag">{f}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {relatedEdges.length > 0 && (
              <div className="doc-connections">
                <h6>Connections</h6>
                {relatedEdges.map((rel, i) => (
                  <p key={i} className="connection-line">{rel.description}</p>
                ))}
              </div>
            )}

            <div className="doc-fns">
              {child.functions.map(renderFunction)}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="doc-view">
      <div className="doc-scroll">
        <header className="doc-header">
          <h1>{logicMap.project}</h1>
          <p className="doc-intent">{logicMap.intent}</p>
          <div className="doc-header-meta">
            <span className="doc-version">v{logicMap.version}</span>
            <div className="doc-controls">
              <button onClick={expandAll}>Expand All</button>
              <button onClick={collapseAll}>Collapse All</button>
            </div>
          </div>
        </header>

        {logicMap.systems.map((system) => {
          const isExpanded = expandedSystems.has(system.id);
          const hasInvariants = system.invariants && system.invariants.length > 0;
          const hasEntities = system.entities && system.entities.length > 0;
          const hasChildren = system.children && system.children.length > 0;
          const relatedEdges = logicMap.relationships.filter(
            (r) =>
              r.from.startsWith(system.id) || r.to.startsWith(system.id)
          );

          return (
            <section
              key={system.id}
              className={`doc-system ${isExpanded ? "expanded" : ""}`}
            >
              <div
                className="doc-system-header"
                onClick={() =>
                  toggle(expandedSystems, setExpandedSystems, system.id)
                }
              >
                <span className="chevron lg">
                  {isExpanded ? "\u25BC" : "\u25B6"}
                </span>
                <div>
                  <h2>{system.name}</h2>
                  <p className="system-intent">{system.intent}</p>
                </div>
              </div>

              {isExpanded && (
                <div className="doc-system-body">
                  <p className="system-desc">{system.description}</p>

                  {hasInvariants && (
                    <div className="doc-rules">
                      <h6>Rules</h6>
                      {system.invariants!.map((inv) => (
                        <div key={inv.id} className="doc-rule">
                          <strong>{inv.name}</strong>
                          <p>{inv.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {hasEntities && (
                    <div className="doc-data">
                      <h6>Data</h6>
                      {system.entities!.map((entity) => (
                        <div key={entity.id} className="doc-entity-inline">
                          <strong>{entity.name}</strong>
                          <p>{entity.description}</p>
                          <div className="entity-fields-inline">
                            {entity.key_fields.map((f, i) => (
                              <span key={i} className="field-tag">{f}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {relatedEdges.length > 0 && (
                    <div className="doc-connections">
                      <h6>Connections</h6>
                      {relatedEdges.map((rel, i) => (
                        <p key={i} className="connection-line">
                          {rel.description}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Core functions of this system */}
                  {system.functions.length > 0 && (
                    <div className="doc-fns">
                      <h6>Functions</h6>
                      {system.functions.map(renderFunction)}
                    </div>
                  )}

                  {/* Child systems (tools) */}
                  {hasChildren && (
                    <div className="doc-children">
                      <h6>Tools</h6>
                      {system.children!.map(renderChildSystem)}
                    </div>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
