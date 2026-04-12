import { type Node, type Edge } from "@xyflow/react";
import type {
  LogicMap,
  ExpansionState,
} from "../types/logic-map";

const SYSTEM_WIDTH = 320;
const SYSTEM_HEIGHT = 160;
const FUNCTION_HEIGHT = 120;
const DECISION_HEIGHT = 100;
const SYSTEM_GAP_X = 420;
const SYSTEM_GAP_Y = 260;
const FUNCTION_GAP_Y = 160;
const DECISION_GAP_Y = 140;
const COLUMNS = 3;

export function transformToFlow(
  logicMap: LogicMap,
  expansion: ExpansionState
): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Track actual Y positions for systems that expand (pushing others down)
  const systemPositions: Map<string, { x: number; y: number }> = new Map();

  // First pass: calculate positions accounting for expanded systems
  let currentY = 0;
  const rowHeights: number[] = [];
  const systemsByRow: string[][] = [];

  logicMap.systems.forEach((system, i) => {
    const row = Math.floor(i / COLUMNS);
    if (!systemsByRow[row]) {
      systemsByRow[row] = [];
      rowHeights[row] = SYSTEM_HEIGHT;
    }
    systemsByRow[row].push(system.id);

    // Calculate height of this system including expanded children
    if (expansion.expandedSystems.has(system.id)) {
      let expandedHeight = SYSTEM_HEIGHT + 40;
      system.functions.forEach((fn) => {
        expandedHeight += FUNCTION_HEIGHT + 20;
        if (expansion.expandedFunctions.has(fn.id)) {
          expandedHeight += fn.decisions.length * DECISION_GAP_Y + 20;
        }
      });
      rowHeights[row] = Math.max(rowHeights[row], expandedHeight);
    }
  });

  // Second pass: place nodes
  logicMap.systems.forEach((system, i) => {
    const col = i % COLUMNS;
    const row = Math.floor(i / COLUMNS);

    const x = col * SYSTEM_GAP_X;
    let y = 0;
    for (let r = 0; r < row; r++) {
      y += rowHeights[r] + 80;
    }

    systemPositions.set(system.id, { x, y });

    nodes.push({
      id: system.id,
      type: "systemNode",
      position: { x, y },
      data: {
        system,
        isExpanded: expansion.expandedSystems.has(system.id),
      },
    });

    // If expanded, show functions
    if (expansion.expandedSystems.has(system.id)) {
      let fnY = y + SYSTEM_HEIGHT + 30;

      system.functions.forEach((fn) => {
        const fnX = x + 20;

        nodes.push({
          id: fn.id,
          type: "functionNode",
          position: { x: fnX, y: fnY },
          data: {
            fn,
            isExpanded: expansion.expandedFunctions.has(fn.id),
          },
        });

        edges.push({
          id: `e-${system.id}-${fn.id}`,
          source: system.id,
          target: fn.id,
          type: "smoothstep",
          style: { stroke: "#475569", strokeWidth: 1.5 },
        });

        fnY += FUNCTION_HEIGHT + 20;

        // If function expanded, show decisions
        if (expansion.expandedFunctions.has(fn.id)) {
          fn.decisions.forEach((dec) => {
            const decX = fnX + 20;

            nodes.push({
              id: dec.id,
              type: "decisionNode",
              position: { x: decX, y: fnY },
              data: { decision: dec },
            });

            edges.push({
              id: `e-${fn.id}-${dec.id}`,
              source: fn.id,
              target: dec.id,
              type: "smoothstep",
              style: { stroke: "#64748b", strokeWidth: 1 },
            });

            fnY += DECISION_GAP_Y;
          });
        }
      });
    }
  });

  // Add relationship edges - anchor to visible nodes or their parent systems
  logicMap.relationships.forEach((rel, i) => {
    const fromVisible = nodes.some((n) => n.id === rel.from);
    const toVisible = nodes.some((n) => n.id === rel.to);
    const fromSystem = rel.from.split(".")[0];
    const toSystem = rel.to.split(".")[0];
    const fromAnchor = fromVisible ? rel.from : fromSystem;
    const toAnchor = toVisible ? rel.to : toSystem;

    // Only show if both anchors exist
    const fromExists = nodes.some((n) => n.id === fromAnchor);
    const toExists = nodes.some((n) => n.id === toAnchor);

    if (fromExists && toExists && fromAnchor !== toAnchor) {
      edges.push({
        id: `rel-${i}`,
        source: fromAnchor,
        target: toAnchor,
        type: "smoothstep",
        animated: true,
        label: rel.description,
        labelStyle: {
          fontSize: 10,
          fontWeight: 500,
          fill: "#94a3b8",
        },
        labelBgStyle: {
          fill: "#0f172a",
          fillOpacity: 0.95,
        },
        labelBgPadding: [8, 4] as [number, number],
        style: {
          stroke: "#3b82f6",
          strokeWidth: 1.5,
          strokeDasharray: "6 3",
        },
      });
    }
  });

  return { nodes, edges };
}
