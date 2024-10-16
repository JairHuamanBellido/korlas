import { NodeFactoriesType } from "@/core/nodeFactoriesType";
import { NodeMaterialsType } from "@/core/nodeMaterialsType";
import { IRequiredFactory } from "../interface/IBaseNodeFactory";

export interface RequiredMaterial {
  name: NodeMaterialsType;
  quantity: number;
}

interface Factory {
  name: string;
  type: NodeFactoriesType;
  imageSrc: string;
  requiredMaterials: RequiredMaterial[];
  requiredFactories?: IRequiredFactory[];
}


export const factories: Factory[] = [
  {
    name: "Solaris Factory",
    type: NodeFactoriesType.solarisFactory,
    imageSrc: "/solaris-stone.png",
    requiredMaterials: [
      { name: NodeMaterialsType.platanite, quantity: 5 },
      { name: NodeMaterialsType.cobrex, quantity: 3 },
    ],
  },
  {
    name: "Platanite Factory",
    type: NodeFactoriesType.plataniteFactory,
    imageSrc: "/platanite-stone.png",
    requiredMaterials: [
      { name: NodeMaterialsType.solaris, quantity: 7 },
      { name: NodeMaterialsType.cobrex, quantity: 2 },
    ],
  },
  {
    name: "Cobrex Factory",
    type: NodeFactoriesType.cobrexFactory,
    imageSrc: "/cobrex-stone.png",
    requiredMaterials: [
      { name: NodeMaterialsType.solaris, quantity: 10 },
      { name: NodeMaterialsType.platanite, quantity: 6 },
    ],
  },
  {
    name: "TitaniumX Factory",
    type: NodeFactoriesType.titaniumXFactory,
    imageSrc: "/titaniumX-stone.png",
    requiredMaterials: [
      { name: NodeMaterialsType.solaris, quantity: 25 },
      { name: NodeMaterialsType.platanite, quantity: 17 },
      { name: NodeMaterialsType.cobrex, quantity: 8 },
    ],
  },
  {
    name: "Crystallium Factory",
    type: NodeFactoriesType.crystalliumFactory,
    imageSrc: "/crystallium-stone.png",
    requiredMaterials: [
      {
        name: NodeMaterialsType.solaris,
        quantity: 30,
      },
      { name: NodeMaterialsType.platanite, quantity: 20 },
      { name: NodeMaterialsType.cobrex, quantity: 15 },
      { name: NodeMaterialsType.titaniumX, quantity: 10 },
    ],
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
  },
];
