import { useCurrentNodeSelected } from "@/store/current-node-selected";
import {
  applyNodeChanges,
  Node,
  NodeChange,
  NodeSelectionChange,
} from "@xyflow/react";
import { useCallback } from "react";

export const useOnNodesChange = ({
  setNodes,
}: {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}) => {
  const { setNodeId } = useCurrentNodeSelected();

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) => {
      const nodeSelected = changes.find(
        (change) => change.type === "select" && change.selected === true
      ) as NodeSelectionChange | undefined;
      if (nodeSelected) {
        setNodeId(nodeSelected.id);
      }

      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  return { onNodesChange };
};
