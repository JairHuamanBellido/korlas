import { factories } from "@/domain/factories/dictionary";
import { FactoryController } from "@/domain/FactoryController";
import { MaterialsInventoryService } from "@/domain/services/MaterialsInventoryService";
import { materialInventoryRepository } from "@/infrastructure/repository/materials-inventory.repository";
import { useCurrentDragNodeSelectedStore } from "@/store/current-drag-node-selected";
import { Node, useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

export const useOnDrop = ({
  setNodes,
}: {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}) => {
  const { screenToFlowPosition } = useReactFlow();
  const { current: nodeTypeSelected, setNodeTypeSelected } =
    useCurrentDragNodeSelectedStore();
  const onDrop = useCallback(
    async (event: any) => {
      event.preventDefault();

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      if (!nodeTypeSelected) return;

      const nodeData = FactoryController.createNode(nodeTypeSelected);

      if (!nodeData) {
        return;
      }

      const newNode: Node = {
        id: window.crypto.randomUUID(),
        type: nodeTypeSelected,
        position,
        data: nodeData,
      };

      const factoryTarget = factories.find(
        (factory) => factory.type === newNode.type
      )!;

      const currentInventory = await MaterialsInventoryService.getCurrent()!;

      for await (const requiredMaterial of factoryTarget.requiredMaterials) {
        if (currentInventory) {
          await materialInventoryRepository.updateMaterialsQuantity({
            id: currentInventory?.id as string,
            quantity:
              currentInventory.resources[requiredMaterial.name] -
              requiredMaterial.quantity,
            resourceType: requiredMaterial.name,
          });
        }
      }

      setNodes((nds) => nds.concat(newNode));

      setNodeTypeSelected(undefined);
    },
    [screenToFlowPosition, nodeTypeSelected]
  );

  return { onDrop };
};
