import { NodeFactoriesType } from "@/core/nodeFactoriesType";
import { NodeMaterialsType } from "@/core/nodeMaterialsType";
import { IRequiredFactory } from "../interface/IBaseNodeFactory";
import { NodeRefineriesType } from "@/core/nodeRefineryType";
import { NodeToolsType } from "@/core/nodeToolsType";

export interface RequiredMaterial {
  name: NodeMaterialsType;
  quantity: number;
}

export interface Tools {
  name: string;
  type: NodeToolsType;
  imageSrc: string;
  requiredMaterials: RequiredMaterial[];
}
export interface Refinery {
  name: string;
  type: NodeRefineriesType;
  imageSrc: string;
  requiredMaterials: RequiredMaterial[];
  requiredFactories?: IRequiredFactory[];
}
export interface Factory {
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

export const refineries: Refinery[] = [
  {
    name: "Energel Refinement",
    type: NodeRefineriesType.energelRefinery,
    imageSrc: "/energel-factory.png",
    requiredMaterials: [
      {
        name: NodeMaterialsType.solaris,
        quantity: 2,
      },
    ],
  },
];

export const tools: Tools[] = [
  {
    name: "Accelerator %10",
    type: NodeToolsType.acceleratorX10,
    imageSrc: "/acceleratorx10-tool.png",
    requiredMaterials: [
      {
        name: NodeMaterialsType.solaris,
        quantity: 100,
      },
    ],
  },
  {
    name: "Accelerator %20",
    type: NodeToolsType.acceleratorX20,
    imageSrc: "/acceleratorx20-tool.png",
    requiredMaterials: [
      {
        name: NodeMaterialsType.solaris,
        quantity: 200,
      },
    ],
  },
  {
    name: "Accelerator %30",
    type: NodeToolsType.acceleratorX30,
    imageSrc: "/acceleratorx30-tool.png",
    requiredMaterials: [
      {
        name: NodeMaterialsType.solaris,
        quantity: 500,
      },
    ],
  },
];
