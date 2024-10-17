import { SoldiersType } from "@/core/soldiersType";

export interface ISoldierIndexDB {
  id?: string;
  type: SoldiersType;
  category: "soldiers";
  name: string;
  stats: {
    health: number;
    attack: number;
    defense: number;
  };
}
export interface IResourcesInventoryIndexDB {
  id?: string;
  resources: ISoldierIndexDB[];
}
