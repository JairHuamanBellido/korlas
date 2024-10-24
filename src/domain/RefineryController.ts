import { NodeRefineriesType } from "@/core/nodeRefineryType";

export class RefineryController {
  static createNodesAndEdges(refineryType: NodeRefineriesType) {
    switch (refineryType) {
      case NodeRefineriesType.energelRefinery:
        return {
          label: `${refineryType} node`,
        };
    }
  }
}
