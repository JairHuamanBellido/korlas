import { Edge, Node } from "@xyflow/react";

export interface IFlowGraphIndexDB {
  id?: string;
  nodes: Node[];
  edges: Edge[];
}
