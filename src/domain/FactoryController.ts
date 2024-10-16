import { NodeFactoriesType } from "@/core/nodeFactoriesType";
import {
  IBaseNodeFactory,
  INodeFactoryGroup,
} from "./interface/IBaseNodeFactory";

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
      default:
        return null;
    }
  }
}
