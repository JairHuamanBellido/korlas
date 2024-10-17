import { SoldiersType } from "@/core/soldiersType";
import { RequiredMaterial } from "../factories/dictionary";
import { NodeMaterialsType } from "@/core/nodeMaterialsType";
import { ISoldierIndexDB } from "@/infrastructure/interface/IResourcesInventory";

export interface IBaseSoldier {
  type: SoldiersType;
  name: string;
  imageSrc: string;
  requiredMaterials: RequiredMaterial[];
  stats: ISoldierIndexDB["stats"];
}

export const storeData: IBaseSoldier[] = [
  {
    name: "Soldier Class A",
    type: SoldiersType.classA,
    imageSrc: "/classA-soldier.png",
    requiredMaterials: [
      {
        name: NodeMaterialsType.solaris,
        quantity: 15,
      },
      {
        name: NodeMaterialsType.platanite,
        quantity: 10,
      },
      {
        name: NodeMaterialsType.cobrex,
        quantity: 5,
      },
      {
        name: NodeMaterialsType.titaniumX,
        quantity: 1,
      },
    ],
    stats: {
      attack: 15,
      defense: 10,
      health: 50,
    },
  },
  {
    name: "Soldier Class B",
    type: SoldiersType.classB,
    imageSrc: "/classB-soldier.png",
    requiredMaterials: [
      {
        name: NodeMaterialsType.solaris,
        quantity: 10,
      },
      {
        name: NodeMaterialsType.platanite,
        quantity: 5,
      },
      {
        name: NodeMaterialsType.cobrex,
        quantity: 2,
      },
    ],
    stats: {
      attack: 12,
      defense: 8,
      health: 40,
    },
  },
];
