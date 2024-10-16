import { NodeFactoriesType } from "@/core/nodeFactoriesType";
import { Node } from "@xyflow/react";
import { INodeFactoryGroup } from "./interface/IBaseNodeFactory";

export class BoardContoller {
  static isConnectionBetweensFactoriesValid({
    nodeSource,
    nodeTarget,
  }: {
    nodeSource: Node;
    nodeTarget: Node;
  }) {
    if (nodeTarget.type === NodeFactoriesType.crystalliumFactory) {
      const requiredFactories = (nodeTarget as Node<INodeFactoryGroup>).data
        .requiredFactories;

      return requiredFactories.some((node) => node.name === nodeSource.type);
    }
  }

  static isConnectionBetweenFactoriesAlreadyExists({
    nodeSource,
    nodeTarget,
  }: {
    nodeSource: Node;
    nodeTarget: Node;
  }) {
    if (nodeTarget.type === NodeFactoriesType.crystalliumFactory) {
      return (nodeTarget as Node<INodeFactoryGroup>).data.requiredFactories.some(
        (node) => node.name === nodeSource.type && node.connection
      );
    }

    return false;
  }
}
