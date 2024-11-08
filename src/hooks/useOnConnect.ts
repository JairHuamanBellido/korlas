import { INodeFactoryGroup } from "@/domain/interface/IBaseNodeFactory";
import { addEdge, Connection, Edge, Node, useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

export const useOnConnect = ({
  nodes,
  setEdges,
}: {
  nodes: Node[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}) => {
  const { updateNodeData } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => {
      const { source, target } = params;

      const nodeSource = nodes.find((node) => node.id === source)!;
      const nodeTarget = nodes.find((node) => node.id === target)!;

      updateNodeData(nodeTarget.id, {
        requiredFactories: (
          nodeTarget.data as INodeFactoryGroup
        ).requiredFactories.map((node) => {
          if (node.name === nodeSource.type) {
            return { ...node, connection: true };
          }
          return node;
        }),
      });

      setEdges((eds) => addEdge({ ...params }, eds));
    },
    [nodes, setEdges, updateNodeData]
  );

  return { onConnect };
};
