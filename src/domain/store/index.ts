import { SoldiersType } from "@/core/soldiersType";
import { RequiredMaterial } from "../factories/dictionary";
import { NodeMaterialsType } from "@/core/nodeMaterialsType";

export interface IBaseSolider {
  type: SoldiersType;
  name: string;
  imageSrc: string;
  requiredMaterials: RequiredMaterial[];
}

export const storeData: IBaseSolider[] = [
  {
    name: "Soldier Class B",
    type: SoldiersType.classB,
    imageSrc: "/classB-soldier.png",
    requiredMaterials: [
      { name: NodeMaterialsType.solaris, quantity: 10 },
      {
        name: NodeMaterialsType.platanite,
        quantity: 5,
      },
      {
        name: NodeMaterialsType.cobrex,
        quantity: 2,
      },
    ],
  },
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
  },
];
