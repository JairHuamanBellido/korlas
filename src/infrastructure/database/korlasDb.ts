import Dexie, { Table } from "dexie";
import { IFlowGraphIndexDB } from "../interface/IFlowGraph";
import { IMaterialsInventoryIndexDB } from "../interface/IMaterialsInventory";
import { IResourcesInventoryIndexDB } from "../interface/IResourcesInventory";

export class KorlasDatabase extends Dexie {
  korlasMaterialsInventoryDatabase!: Table<IMaterialsInventoryIndexDB, string>;
  korlasFlowGraphDatabase!: Table<IFlowGraphIndexDB>;
  korlasResourcesInventoryDatabase!: Table<IResourcesInventoryIndexDB>;
  constructor() {
    super("korlas");

    this.version(1).stores({
      korlasMaterialsInventoryDatabase: "id",
      korlasFlowGraphDatabase: "id",
      korlasResourcesInventoryDatabase: "id",
    });
  }
}
