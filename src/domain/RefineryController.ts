import { NodeRefineriesType } from "@/core/nodeRefineryType";
import { Edge, Node, XYPosition } from "@xyflow/react";
import { FactoryController } from "./FactoryController";
import { NodeFactoriesType } from "@/core/nodeFactoriesType";

export class RefineryController {
  static createNodesAndEdges(
    refineryType: NodeRefineriesType,
    position: XYPosition
  ) {
    switch (refineryType) {
      case NodeRefineriesType.energelRefinery: {
        const refineryNodeData = FactoryController.createNode(
          NodeFactoriesType.energelRefinement
        );
        if (!refineryNodeData) return;
        const energelRefineryNodeGroup: Node = {
          id: window.crypto.randomUUID(),
          type: NodeFactoriesType.energelRefinement,
          position,
          data: refineryNodeData,
        };

        const energelFactoryInput: Node = {
          id: window.crypto.randomUUID(),
          type: NodeFactoriesType.energelFactoryInput,
          position: { x: 40, y: 80 },
          parentId: energelRefineryNodeGroup.id,
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
          parentId: energelRefineryNodeGroup.id,
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
          parentId: energelRefineryNodeGroup.id,
          extent: "parent",
          data: {
            quantity: 0,
          },
        };

        const edgeFactoryInputToRefinementNode: Edge = {
          id: window.crypto.randomUUID(),
          source: energelFactoryInput.id,
          sourceHandle: "node-energel-refinement-input",
          target: energelRefinementNode.id,
          targetHandle: "node-energel-refinement-input",
          animated: true,
        };

        const edgeRefinementNodeToStorageNode: Edge = {
          id: window.crypto.randomUUID(),
          source: energelRefinementNode.id,
          sourceHandle: "node-energel-refinement-output",
          target: energelStorage.id,
          targetHandle: "node-energel-refinement-output",
          animated: true,
        };

        return {
          nodes: [
            energelRefineryNodeGroup,
            energelFactoryInput,
            energelRefinementNode,
            energelStorage,
          ],
          edges: [
            edgeFactoryInputToRefinementNode,
            edgeRefinementNodeToStorageNode,
          ],
        };
      }
      default: {
        break;
      }
    }
  }
}
