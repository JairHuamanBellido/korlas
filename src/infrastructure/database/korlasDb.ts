import Dexie, { Table } from "dexie";
import { IFlowGraphIndexDB } from "../interface/IFlowGraph";
import { IMaterialsInventoryIndexDB } from "../interface/IMaterialsInventory";

export class KorlasDatabase extends Dexie {
  korlasMaterialsInventoryDatabase!: Table<IMaterialsInventoryIndexDB, string>;
  korlasFlowGraphDatabase!: Table<IFlowGraphIndexDB>;
  constructor() {
    super("korlas");

    this.version(1).stores({
      korlasMaterialsInventoryDatabase: "id",
      korlasFlowGraphDatabase: "id",
    });
  }
}
