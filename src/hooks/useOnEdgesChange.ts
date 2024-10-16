import { applyEdgeChanges, Edge, EdgeChange } from "@xyflow/react";
import { useCallback } from "react";

export const useOnEdgesChange = ({
  setEdges,
}: {
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}) => {
  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  return { onEdgesChange };
};
