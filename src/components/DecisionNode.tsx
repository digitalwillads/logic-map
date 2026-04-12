import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { Decision } from "../types/logic-map";

type DecisionNodeData = {
  decision: Decision;
};

export function DecisionNode({ data }: NodeProps) {
  const { decision } = data as unknown as DecisionNodeData;

  return (
    <div
      className={`logic-node decision-node ${decision.uncertain ? "uncertain" : ""}`}
    >
      <div className="node-header">
        <span className="node-name">{decision.name}</span>
      </div>
      <div className="node-description">{decision.description}</div>
      {decision.rationale && (
        <div className="node-rationale">
          <strong>Why:</strong> {decision.rationale}
        </div>
      )}
      {decision.source && (
        <div className="node-source">{decision.source}</div>
      )}
      {decision.uncertain && (
        <div className="uncertainty-badge" title={decision.uncertainty_note}>
          ?
        </div>
      )}
      <Handle type="target" position={Position.Top} />
    </div>
  );
}
