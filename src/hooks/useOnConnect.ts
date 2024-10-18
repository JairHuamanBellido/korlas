import { BoardContoller } from "@/domain/BoardController";
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

  const getNodeType = useCallback(
    (nodeId: string) => {
      const node = nodes.find((n) => n.id === nodeId);
      return node ? node.type : null;
    },
    [nodes]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      const { source, target } = params;
      const sourceType = getNodeType(source);
      const targetType = getNodeType(target);

      const nodeSource = nodes.find((node) => node.id === source)!;
      const nodeTarget = nodes.find((node) => node.id === target)!;

      if (
        BoardContoller.isConnectionBetweensFactoriesValid({
          nodeSource,
          nodeTarget,
        })
      ) {
        if (
          !BoardContoller.isConnectionBetweenFactoriesAlreadyExists({
            nodeSource,
            nodeTarget,
          })
        ) {
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

          setEdges((eds) => addEdge({ ...params, type: "step" }, eds));
        } else {
          alert(
            "Node type already connected, try with other one, review the node detail"
          );
        }
      } else {
        alert(
          `Los nodos de tipo ${sourceType} no pueden conectarse con nodos de tipo ${targetType}`
        );
      }
    },
    [nodes]
  );

  return { onConnect };
};
