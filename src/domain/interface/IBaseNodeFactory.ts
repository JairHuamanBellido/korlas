import { NodeFactoriesType } from "@/core/nodeFactoriesType";


export type IBaseNodeFactory = {
  label: string;
  quantity: number;
};

export type IRequiredFactory = {
  name: NodeFactoriesType;
  connection: boolean;
};
export type INodeFactoryGroup = {
  requiredFactories: IRequiredFactory[];
  requiredMaterials?: { [material: string]: {
    requiredQuantity: number;
    actualQuantity: number
  } };
} & IBaseNodeFactory;
