import { NodeFactoriesType } from "@/core/nodeFactoriesType";
import { factories } from "@/domain/factories/dictionary";
import { FactoryController } from "@/domain/FactoryController";
import { MaterialsInventoryService } from "@/domain/services/MaterialsInventoryService";
import { materialInventoryRepository } from "@/infrastructure/repository/materials-inventory.repository";
import { useCurrentDragNodeSelectedStore } from "@/store/current-drag-node-selected";
import { Edge, Node, useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

export const useOnDrop = ({
  setNodes,
  setEdges,
}: {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
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

      if (nodeTypeSelected === NodeFactoriesType.energelRefinement) {
        const energelRefinement: Node = {
          id: window.crypto.randomUUID(),
          type: nodeTypeSelected,
          position,
          data: nodeData,
        };

        const energelFactoryInput: Node = {
          id: window.crypto.randomUUID(),
          type: NodeFactoriesType.energelFactoryInput,
          position: { x: 40, y: 80 },
          parentId: energelRefinement.id,
          extent: "parent",
          data:
            FactoryController.createNode(
              NodeFactoriesType.energelFactoryInput
            ) || {},
        };

        const energelRefinementNode: Node = {
          id: window.crypto.randomUUID(),
          type: NodeFactoriesType.energelRefinementNode,
          position: {
            x: 440,
            y: 200,
          },
          parentId: energelRefinement.id,
          extent: "parent",
          data: {},
        };

        const energelStorage: Node = {
          id: window.crypto.randomUUID(),
          type: NodeFactoriesType.energelStorage,
          position: {
            x: 700,
            y: 150,
          },
          parentId: energelRefinement.id,
          extent: "parent",
          data: {
            quantity: 0,
          },
        };

        setNodes((prev) => [
          ...prev,
          energelRefinement,
          energelFactoryInput,
          energelRefinementNode,
          energelStorage,
        ]);

        setEdges((prev) => [
          ...prev,
          {
            id: window.crypto.randomUUID(),
            source: energelFactoryInput.id,
            sourceHandle: "node-energel-refinement-input",
            target: energelRefinementNode.id,
            targetHandle: "node-energel-refinement-input",
            animated: true,
          },
          {
            id: window.crypto.randomUUID(),
            source: energelRefinementNode.id,
            sourceHandle: "node-energel-refinement-output",
            target: energelStorage.id,
            targetHandle: "node-energel-refinement-output",
            animated: true,
          },
        ]);
      } else {
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
      }

      setNodeTypeSelected(undefined);
    },
    [screenToFlowPosition, nodeTypeSelected]
  );

  return { onDrop };
};
