import { useEffect, useState } from "react";
import { LogicMap } from "./components/LogicMap";
import { DocumentView } from "./components/DocumentView";
import type { LogicMap as LogicMapType } from "./types/logic-map";

type ViewMode = "graph" | "document";

function App() {
  const [logicMap, setLogicMap] = useState<LogicMapType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>("document");

  useEffect(() => {
    fetch("/data/comm-chat.json")
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load logic map: ${res.status}`);
        return res.json();
      })
      .then(setLogicMap)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div
        style={{
          padding: 40,
          color: "#ef4444",
          fontFamily: "system-ui",
          background: "#0b1120",
          height: "100vh",
        }}
      >
        <h1>Failed to load logic map</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!logicMap) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "#0b1120",
          color: "#94a3b8",
          fontFamily: "system-ui",
          fontSize: 14,
        }}
      >
        Loading logic map...
      </div>
    );
  }

  return (
    <>
      {/* View toggle */}
      <div
        style={{
          position: "fixed",
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          display: "flex",
          background: "#1e293b",
          border: "1px solid #334155",
          borderRadius: 8,
          padding: 3,
          gap: 2,
        }}
      >
        <button
          onClick={() => setView("document")}
          style={{
            background: view === "document" ? "#334155" : "transparent",
            border: "none",
            color: view === "document" ? "#f1f5f9" : "#64748b",
            padding: "6px 16px",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
            transition: "all 0.15s",
          }}
        >
          Document
        </button>
        <button
          onClick={() => setView("graph")}
          style={{
            background: view === "graph" ? "#334155" : "transparent",
            border: "none",
            color: view === "graph" ? "#f1f5f9" : "#64748b",
            padding: "6px 16px",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
            transition: "all 0.15s",
          }}
        >
          Graph
        </button>
      </div>

      {view === "graph" ? (
        <LogicMap logicMap={logicMap} />
      ) : (
        <DocumentView logicMap={logicMap} />
      )}
    </>
  );
}

export default App;
