import { INodeFactoryGroup } from "@/domain/interface/IBaseNodeFactory";
import {
  applyEdgeChanges,
  Edge,
  EdgeChange,
  Node,
  useReactFlow,
} from "@xyflow/react";
import { useCallback } from "react";

export const useOnEdgesChange = ({
  setEdges,
  edges,
  nodes,
}: {
  edges: Edge[];
  nodes: Node[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}) => {
  const { updateNodeData } = useReactFlow();

  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) => {
      const removedEdges = changes.filter((change) => change.type === "remove");

      removedEdges.forEach((element) => {
        const edgeTarget = edges.find((e) => e.id === element.id)!;
        const nodeTarget = nodes.find((node) => node.id === edgeTarget.target)!;
        const nodeSource = nodes.find((node) => node.id === edgeTarget.source)!;

        const requiredFactories = (nodeTarget.data as INodeFactoryGroup)
          .requiredFactories;

        if (requiredFactories) {
          updateNodeData(nodeTarget.id, {
            requiredFactories: requiredFactories.map((node) => {
              if (node.name === nodeSource.type) {
                return { ...node, connection: false };
              }
              return node;
            }),
          });
        }
      });

      setEdges((eds) => applyEdgeChanges(changes, eds));
    },
    [setEdges, edges, nodes]
  );

  return { onEdgesChange };
};
