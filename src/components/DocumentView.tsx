import { useState } from "react";
import type { LogicMap } from "../types/logic-map";
import "./document.css";

interface DocumentViewProps {
  logicMap: LogicMap;
}

export function DocumentView({ logicMap }: DocumentViewProps) {
  const [expandedSystems, setExpandedSystems] = useState<Set<string>>(
    new Set(logicMap.systems.map((s) => s.id))
  );
  const [expandedFunctions, setExpandedFunctions] = useState<Set<string>>(
    new Set()
  );

  const toggleSystem = (id: string) => {
    setExpandedSystems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleFunction = (id: string) => {
    setExpandedFunctions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedSystems(new Set(logicMap.systems.map((s) => s.id)));
    setExpandedFunctions(
      new Set(
        logicMap.systems.flatMap((s) => s.functions.map((f) => f.id))
      )
    );
  };

  const collapseAll = () => {
    setExpandedSystems(new Set());
    setExpandedFunctions(new Set());
  };

  return (
    <div className="doc-view">
      <div className="doc-scroll">
        {/* Header */}
        <div className="doc-header">
          <h1>{logicMap.project}</h1>
          <p className="doc-intent">{logicMap.intent}</p>
          <p className="doc-meta">Last updated: {logicMap.version}</p>
          <div className="doc-controls">
            <button onClick={expandAll}>Expand All</button>
            <button onClick={collapseAll}>Collapse All</button>
          </div>
        </div>

        {/* Systems */}
        {logicMap.systems.map((system) => {
          const isExpanded = expandedSystems.has(system.id);
          const relatedEdges = logicMap.relationships.filter(
            (r) =>
              r.from.startsWith(system.id) || r.to.startsWith(system.id)
          );
          const hasInvariants = system.invariants && system.invariants.length > 0;
          const hasEntities = system.entities && system.entities.length > 0;

          return (
            <div
              key={system.id}
              className={`doc-system ${isExpanded ? "expanded" : ""}`}
            >
              <div
                className="doc-system-header"
                onClick={() => toggleSystem(system.id)}
              >
                <span className="doc-chevron">
                  {isExpanded ? "\u25BC" : "\u25B6"}
                </span>
                <div>
                  <h3>{system.name}</h3>
                  <p className="doc-system-intent">{system.intent}</p>
                </div>
              </div>

              {isExpanded && (
                <div className="doc-system-body">
                  <p className="doc-system-desc">{system.description}</p>

                  {/* Invariants inside the system */}
                  {hasInvariants && (
                    <div className="doc-system-invariants">
                      <h5>Rules</h5>
                      {system.invariants!.map((inv) => (
                        <div key={inv.id} className="doc-invariant">
                          <h4>{inv.name}</h4>
                          <p>{inv.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Entities inside the system */}
                  {hasEntities && (
                    <div className="doc-system-entities">
                      <h5>Data</h5>
                      <div className="doc-entities">
                        {system.entities!.map((entity) => (
                          <div key={entity.id} className="doc-entity">
                            <h4>{entity.name}</h4>
                            <p>{entity.description}</p>
                            <ul>
                              {entity.key_fields.map((field, i) => (
                                <li key={i}>{field}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {relatedEdges.length > 0 && (
                    <div className="doc-relationships">
                      <h5>Connections</h5>
                      {relatedEdges.map((rel, i) => (
                        <div key={i} className="doc-relationship">
                          {rel.description}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="doc-functions">
                    {system.functions.map((fn) => {
                      const fnExpanded = expandedFunctions.has(fn.id);

                      return (
                        <div
                          key={fn.id}
                          className={`doc-function ${fnExpanded ? "expanded" : ""} ${fn.uncertain ? "uncertain" : ""}`}
                        >
                          <div
                            className="doc-function-header"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFunction(fn.id);
                            }}
                          >
                            {fn.decisions.length > 0 && (
                              <span className="doc-chevron small">
                                {fnExpanded ? "\u25BC" : "\u25B6"}
                              </span>
                            )}
                            <div>
                              <h4>
                                {fn.name}
                                {fn.uncertain && (
                                  <span className="doc-uncertain-badge">
                                    ?
                                  </span>
                                )}
                              </h4>
                              <p>{fn.description}</p>
                              {fn.source && (
                                <code className="doc-source">
                                  {fn.source}
                                </code>
                              )}
                            </div>
                          </div>

                          {fn.uncertain && fn.uncertainty_note && (
                            <div className="doc-uncertainty-note">
                              {fn.uncertainty_note}
                            </div>
                          )}

                          {fnExpanded && fn.decisions.length > 0 && (
                            <div className="doc-decisions">
                              {fn.decisions.map((dec) => (
                                <div
                                  key={dec.id}
                                  className={`doc-decision ${dec.uncertain ? "uncertain" : ""}`}
                                >
                                  <h5>
                                    {dec.name}
                                    {dec.uncertain && (
                                      <span className="doc-uncertain-badge">
                                        ?
                                      </span>
                                    )}
                                  </h5>
                                  <p>{dec.description}</p>
                                  {dec.rationale && (
                                    <p className="doc-rationale">
                                      <strong>Why:</strong> {dec.rationale}
                                    </p>
                                  )}
                                  {dec.source && (
                                    <code className="doc-source">
                                      {dec.source}
                                    </code>
                                  )}
                                  {dec.uncertain &&
                                    dec.uncertainty_note && (
                                      <div className="doc-uncertainty-note">
                                        {dec.uncertainty_note}
                                      </div>
                                    )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
