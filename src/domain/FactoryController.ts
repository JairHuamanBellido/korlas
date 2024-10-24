import { NodeFactoriesType } from "@/core/nodeFactoriesType";
import {
  IBaseNodeFactory,
  INodeFactoryGroup,
} from "./interface/IBaseNodeFactory";
import { NodeMaterialsType } from "@/core/nodeMaterialsType";

export class FactoryController {
  static createNode(
    nodeType: NodeFactoriesType
  ): IBaseNodeFactory | INodeFactoryGroup | null {
    switch (nodeType) {
      case NodeFactoriesType.solarisFactory:
        return {
          label: `${nodeType} node`,
          quantity: 0,
        };
      case NodeFactoriesType.plataniteFactory:
        return {
          label: `${nodeType} node`,
          quantity: 0,
        };
      case NodeFactoriesType.crystalliumFactory:
        return {
          label: `${nodeType} node`,
          quantity: 0,
          requiredFactories: [
            { name: NodeFactoriesType.plataniteFactory, connection: false },
            { name: NodeFactoriesType.solarisFactory, connection: false },
          ],
        };
      case NodeFactoriesType.cobrexFactory:
        return {
          label: `${nodeType} node`,
          quantity: 0,
        };
      case NodeFactoriesType.titaniumXFactory:
        return {
          label: `${nodeType} node`,
          quantity: 0,
        };
      case NodeFactoriesType.energelRefinement:
        return {
          label: `${nodeType} node`,
          quantity: 0,
        };
      case NodeFactoriesType.energelFactoryInput:
        return {
          label: `${nodeType} node`,
          quantity: 0,
          requiredFactories: [
            {
              name: NodeFactoriesType.solarisFactory,
              connection: false,
            },
            {
              name: NodeFactoriesType.plataniteFactory,
              connection: false,
            },
            {
              name: NodeFactoriesType.cobrexFactory,
              connection: false,
            },
          ],
          requiredMaterials: {
            [NodeMaterialsType.cobrex]: {
              requiredQuantity: 10,
              actualQuantity: 0,
            },
            [NodeMaterialsType.solaris]: {
              requiredQuantity: 20,
              actualQuantity: 0,
            },
            [NodeMaterialsType.platanite]: {
              requiredQuantity: 15,
              actualQuantity: 0,
            },
          },
        };
      default:
        return null;
    }
  }
}
