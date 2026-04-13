export interface LogicMap {
  project: string;
  version: string;
  intent: string;
  invariants: Invariant[];
  entities: Entity[];
  systems: System[];
  relationships: Relationship[];
}

export interface Invariant {
  id: string;
  name: string;
  description: string;
}

export interface Entity {
  id: string;
  name: string;
  description: string;
  key_fields: string[];
}

export interface System {
  id: string;
  name: string;
  intent: string;
  description: string;
  why?: string;
  who?: string;
  limitations?: string[];
  history?: string[];
  config?: { name: string; description: string }[];
  dependencies?: string[];
  failure_modes?: string[];
  validation?: string[];
  screenshot?: string;
  uncertain?: boolean;
  uncertainty_note?: string;
  invariants?: Invariant[];
  entities?: Entity[];
  functions: FunctionNode[];
  children?: System[];
}

export interface FunctionNode {
  id: string;
  name: string;
  description: string;
  source?: string;
  screenshot?: string;
  uncertain?: boolean;
  uncertainty_note?: string;
  decisions: Decision[];
}

export interface Decision {
  id: string;
  name: string;
  description: string;
  rationale?: string;
  source?: string;
  uncertain?: boolean;
  uncertainty_note?: string;
}

export interface Relationship {
  from: string;
  to: string;
  description: string;
}

export type NodeLevel = "system" | "function" | "decision";

export interface ExpansionState {
  expandedSystems: Set<string>;
  expandedFunctions: Set<string>;
}
