import { useState } from "react";
import {
  BaseEdge,
  getSmoothStepPath,
  type EdgeProps,
} from "@xyflow/react";

export function RelationshipEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style,
}: EdgeProps) {
  const [hovered, setHovered] = useState(false);
  const description = (data as { description?: string })?.description || "";

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      {/* Invisible wider path for easier hover targeting */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ cursor: "pointer" }}
      />
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          ...style,
          strokeWidth: hovered ? 2.5 : 1.5,
          stroke: hovered ? "#60a5fa" : "#3b82f6",
          filter: hovered ? "drop-shadow(0 0 4px rgba(59,130,246,0.5))" : "none",
        }}
      />
      {hovered && description && (
        <foreignObject
          x={labelX - 160}
          y={labelY - 20}
          width={320}
          height={80}
          style={{ pointerEvents: "none", overflow: "visible" }}
        >
          <div
            style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: 11,
              color: "#e2e8f0",
              lineHeight: 1.5,
              fontFamily:
                "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
              boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
              textAlign: "center",
              whiteSpace: "normal",
            }}
          >
            {description}
          </div>
        </foreignObject>
      )}
    </>
  );
}
