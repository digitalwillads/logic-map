import { useMemo } from "react";
import type { LogicMap, Invariant, Entity } from "../types/logic-map";
import "./sidebar.css";

interface SidebarProps {
  logicMap: LogicMap;
  isOpen: boolean;
  onToggle: () => void;
  activeTab: "entities" | "invariants";
  onTabChange: (tab: "entities" | "invariants") => void;
}

export function Sidebar({
  logicMap,
  isOpen,
  onToggle,
  activeTab,
  onTabChange,
}: SidebarProps) {
  // Aggregate from top-level + all systems
  const allInvariants = useMemo(() => {
    const result: { systemName: string; inv: Invariant }[] = [];
    for (const inv of logicMap.invariants) {
      result.push({ systemName: "Global", inv });
    }
    for (const system of logicMap.systems) {
      for (const inv of system.invariants || []) {
        result.push({ systemName: system.name, inv });
      }
    }
    return result;
  }, [logicMap]);

  const allEntities = useMemo(() => {
    const result: { systemName: string; entity: Entity }[] = [];
    for (const entity of logicMap.entities) {
      result.push({ systemName: "Global", entity });
    }
    for (const system of logicMap.systems) {
      for (const entity of system.entities || []) {
        result.push({ systemName: system.name, entity });
      }
    }
    return result;
  }, [logicMap]);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="sidebar-toggle" onClick={onToggle}>
        {isOpen ? "\u203a" : "\u2039"}
      </button>

      {isOpen && (
        <>
          <div className="sidebar-header">
            <h2>Reference</h2>
          </div>

          <div className="sidebar-tabs">
            <button
              className={`tab ${activeTab === "entities" ? "active" : ""}`}
              onClick={() => onTabChange("entities")}
            >
              Entities
            </button>
            <button
              className={`tab ${activeTab === "invariants" ? "active" : ""}`}
              onClick={() => onTabChange("invariants")}
            >
              Rules
            </button>
          </div>

          <div className="sidebar-content">
            {activeTab === "entities" && (
              <div className="panel-list">
                {allEntities.map(({ systemName, entity }) => (
                  <div key={entity.id} className="panel-card">
                    <span className="panel-system-tag">{systemName}</span>
                    <h3>{entity.name}</h3>
                    <p className="panel-description">{entity.description}</p>
                    <ul className="field-list">
                      {entity.key_fields.map((field, i) => (
                        <li key={i}>{field}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "invariants" && (
              <div className="panel-list">
                {allInvariants.map(({ systemName, inv }) => (
                  <div key={inv.id} className="panel-card">
                    <span className="panel-system-tag">{systemName}</span>
                    <h3>{inv.name}</h3>
                    <p className="panel-description">{inv.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
