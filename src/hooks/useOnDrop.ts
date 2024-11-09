import { NodeFactoriesType } from "@/core/nodeFactoriesType";
import { NodeRefineriesType } from "@/core/nodeRefineryType";
import { NodeToolsType } from "@/core/nodeToolsType";
import { factories, tools } from "@/domain/factories/dictionary";
import { FactoryController } from "@/domain/FactoryController";
import { RefineryController } from "@/domain/RefineryController";
import { MaterialsInventoryService } from "@/domain/services/MaterialsInventoryService";
import { ToolController } from "@/domain/ToolsController";
import { materialInventoryRepository } from "@/infrastructure/repository/materials-inventory.repository";
import { useCurrentDragNodeSelectedStore } from "@/store/current-drag-node-selected";
import { Edge, Node, useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

function isFactoryType(
  type: NodeFactoriesType | NodeRefineriesType | NodeToolsType
): type is NodeFactoriesType {
  return Object.values(NodeFactoriesType).includes(type as NodeFactoriesType);
}

function isRefineryType(
  type: NodeFactoriesType | NodeRefineriesType | NodeToolsType
): type is NodeRefineriesType {
  return Object.values(NodeRefineriesType).includes(type as NodeRefineriesType);
}

function isToolType(
  type: NodeFactoriesType | NodeRefineriesType | NodeToolsType
): type is NodeToolsType {
  return Object.values(NodeToolsType).includes(type as NodeToolsType);
}
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
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      if (!nodeTypeSelected) return;
      const currentInventory = await MaterialsInventoryService.getCurrent()!;
      switch (true) {
        case isFactoryType(nodeTypeSelected):
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

          break;
        case isRefineryType(nodeTypeSelected):
          const nodesAndEdges = RefineryController.createNodesAndEdges(
            NodeRefineriesType.energelRefinery,
            position
          );
          if (!nodesAndEdges) return;

          const { edges, nodes } = nodesAndEdges;
          setNodes((prev) => [...prev, ...nodes]);
          setEdges((prev) => [...prev, ...edges]);
          break;
        case isToolType(nodeTypeSelected):
          const nodeToolData = ToolController.createNode(nodeTypeSelected);
          if (!nodeToolData) return;

          const newToolNode: Node = {
            id: window.crypto.randomUUID(),
            type: nodeTypeSelected,
            position,
            data: nodeToolData,
          };

          const toolTarget = tools.find(
            (tool) => tool.type === newToolNode.type
          )!;

          for await (const requiredMaterial of toolTarget?.requiredMaterials) {
            if (currentInventory) {
              await materialInventoryRepository.updateMaterialsQuantity({
                id: currentInventory.id!,
                resourceType: requiredMaterial.name,
                quantity:
                  currentInventory.resources[requiredMaterial.name] -
                  requiredMaterial.quantity,
              });
            }
          }

          setNodes((nds) => nds.concat(newToolNode));

          break;
        default:
          break;
      }

      setNodeTypeSelected(undefined);
    },
    [
      screenToFlowPosition,
      nodeTypeSelected,
      setEdges,
      setNodeTypeSelected,
      setNodes,
    ]
  );

  return { onDrop };
};
