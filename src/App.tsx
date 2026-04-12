import { useEffect, useState } from "react";
import { LogicMap } from "./components/LogicMap";
import type { LogicMap as LogicMapType } from "./types/logic-map";

function App() {
  const [logicMap, setLogicMap] = useState<LogicMapType | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  return <LogicMap logicMap={logicMap} />;
}

export default App;
