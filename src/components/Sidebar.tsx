import type { LogicMap } from "../types/logic-map";
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
              Invariants
            </button>
          </div>

          <div className="sidebar-content">
            {activeTab === "entities" && (
              <div className="panel-list">
                {logicMap.entities.map((entity) => (
                  <div key={entity.id} className="panel-card">
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
                {logicMap.invariants.map((inv) => (
                  <div key={inv.id} className="panel-card">
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
