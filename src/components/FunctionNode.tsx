import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { FunctionNode as FnType } from "../types/logic-map";

type FunctionNodeData = {
  fn: FnType;
  isExpanded: boolean;
  onToggle?: (id: string) => void;
};

export function FunctionNodeComponent({ data }: NodeProps) {
  const { fn, isExpanded, onToggle } = data as unknown as FunctionNodeData;
  const hasDecisions = fn.decisions.length > 0;

  return (
    <div
      className={`logic-node function-node ${isExpanded ? "expanded" : ""} ${fn.uncertain ? "uncertain" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        if (hasDecisions) onToggle?.(fn.id);
      }}
      style={{ cursor: hasDecisions ? "pointer" : "default" }}
    >
      <div className="node-header">
        <span className="node-name">{fn.name}</span>
        {hasDecisions && (
          <span className="expand-indicator">
            {isExpanded ? "\u2212" : "+"}
          </span>
        )}
      </div>
      <div className="node-description">{fn.description}</div>
      {fn.source && <div className="node-source">{fn.source}</div>}
      {hasDecisions && !isExpanded && (
        <div className="node-meta">
          {fn.decisions.length} decision{fn.decisions.length > 1 ? "s" : ""}
        </div>
      )}
      {fn.uncertain && (
        <div className="uncertainty-badge" title={fn.uncertainty_note}>
          ?
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
      <Handle type="target" position={Position.Top} />
    </div>
  );
}
