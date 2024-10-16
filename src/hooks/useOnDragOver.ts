import { useCallback } from "react";

export const useOnDragOver = () => {
  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return { onDragOver };
};
