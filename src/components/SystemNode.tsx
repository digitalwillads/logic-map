import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { System } from "../types/logic-map";

type SystemNodeData = {
  system: System;
  isExpanded: boolean;
  onToggle?: (id: string) => void;
};

export function SystemNode({ data }: NodeProps) {
  const { system, isExpanded, onToggle } = data as unknown as SystemNodeData;

  return (
    <div
      className={`logic-node system-node ${isExpanded ? "expanded" : ""} ${system.uncertain ? "uncertain" : ""}`}
      onClick={() => onToggle?.(system.id)}
    >
      <div className="node-header">
        <span className="node-name">{system.name}</span>
        <span className="expand-indicator">{isExpanded ? "\u2212" : "+"}</span>
      </div>
      <div className="node-intent">{system.intent}</div>
      {!isExpanded && (
        <div className="node-meta">
          {system.functions.length} functions
        </div>
      )}
      {system.uncertain && (
        <div className="uncertainty-badge" title={system.uncertainty_note}>
          ?
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
}
