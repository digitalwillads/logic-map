import { useEffect, useState } from "react";
import { DocumentView } from "./components/DocumentView";
import type { LogicMap as LogicMapType } from "./types/logic-map";

function App() {
  const [logicMap, setLogicMap] = useState<LogicMapType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const project = params.get("project") || "comm-chat";
    fetch(`${import.meta.env.BASE_URL}data/${project}.json`)
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
          color: "#9ca3af",
          fontFamily: "system-ui",
          fontSize: 14,
        }}
      >
        Loading...
      </div>
    );
  }

  return <DocumentView logicMap={logicMap} />;
}

export default App;
