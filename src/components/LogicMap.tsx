import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import type {
  LogicMap as LogicMapType,
  ExpansionState,
} from "../types/logic-map";
import { transformToFlow } from "../utils/transform";
import { SystemNode } from "./SystemNode";
import { FunctionNodeComponent } from "./FunctionNode";
import { DecisionNode } from "./DecisionNode";
import { Sidebar } from "./Sidebar";
import "./nodes.css";

const nodeTypes = {
  systemNode: SystemNode,
  functionNode: FunctionNodeComponent,
  decisionNode: DecisionNode,
};

interface LogicMapProps {
  logicMap: LogicMapType;
}

export function LogicMap({ logicMap }: LogicMapProps) {
  const [expansion, setExpansion] = useState<ExpansionState>({
    expandedSystems: new Set(),
    expandedFunctions: new Set(),
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarTab, setSidebarTab] = useState<"entities" | "invariants">(
    "entities"
  );

  const toggleSystem = useCallback((systemId: string) => {
    setExpansion((prev) => {
      const next = {
        expandedSystems: new Set(prev.expandedSystems),
        expandedFunctions: new Set(prev.expandedFunctions),
      };
      if (next.expandedSystems.has(systemId)) {
        next.expandedSystems.delete(systemId);
        // Collapse all functions in this system
        for (const fnId of prev.expandedFunctions) {
          if (fnId.startsWith(systemId + ".")) {
            next.expandedFunctions.delete(fnId);
          }
        }
      } else {
        next.expandedSystems.add(systemId);
      }
      return next;
    });
  }, []);

  const toggleFunction = useCallback((fnId: string) => {
    setExpansion((prev) => {
      const next = {
        expandedSystems: new Set(prev.expandedSystems),
        expandedFunctions: new Set(prev.expandedFunctions),
      };
      if (next.expandedFunctions.has(fnId)) {
        next.expandedFunctions.delete(fnId);
      } else {
        next.expandedFunctions.add(fnId);
      }
      return next;
    });
  }, []);

  const { nodes: flowNodes, edges: flowEdges } = useMemo(() => {
    const result = transformToFlow(logicMap, expansion);
    // Inject toggle callbacks
    result.nodes = result.nodes.map((node) => {
      if (node.type === "systemNode") {
        return { ...node, data: { ...node.data, onToggle: toggleSystem } };
      }
      if (node.type === "functionNode") {
        return { ...node, data: { ...node.data, onToggle: toggleFunction } };
      }
      return node;
    });
    return result;
  }, [logicMap, expansion, toggleSystem, toggleFunction]);

  const [nodes, setNodes, onNodesChange] = useNodesState(flowNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(flowEdges);

  // Sync when expansion changes
  useEffect(() => {
    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [flowNodes, flowEdges, setNodes, setEdges]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#0b1120",
        display: "flex",
      }}
    >
      {/* Main graph area */}
      <div style={{ flex: 1, position: "relative" }}>
        {/* Project header overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 5,
            padding: "20px 28px",
            background:
              "linear-gradient(180deg, rgba(11,17,32,0.95) 0%, rgba(11,17,32,0.7) 70%, transparent 100%)",
            pointerEvents: "none",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              color: "#f1f5f9",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            {logicMap.project}
          </h1>
          <p
            style={{
              margin: "6px 0 0",
              fontSize: 13,
              color: "#94a3b8",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
              lineHeight: 1.5,
              maxWidth: 600,
            }}
          >
            {logicMap.intent}
          </p>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: 11,
              color: "#475569",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
            }}
          >
            Last updated: {logicMap.version}
          </p>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          minZoom={0.05}
          maxZoom={2}
          defaultEdgeOptions={{ type: "smoothstep" }}
          proOptions={{ hideAttribution: true }}
        >
          <Controls position="bottom-left" />
          <MiniMap
            nodeColor={(node) => {
              if (node.type === "systemNode") return "#334155";
              if (node.type === "functionNode") return "#94a3b8";
              return "#cbd5e1";
            }}
            style={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: 8,
            }}
            maskColor="rgba(15, 23, 42, 0.7)"
            position="bottom-left"
            pannable
            zoomable
          />
          <Background
            variant={BackgroundVariant.Dots}
            gap={24}
            size={1}
            color="#1a2438"
          />
        </ReactFlow>
      </div>

      {/* Sidebar */}
      <Sidebar
        logicMap={logicMap}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeTab={sidebarTab}
        onTabChange={setSidebarTab}
      />
    </div>
  );
}
