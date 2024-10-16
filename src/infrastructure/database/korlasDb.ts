import Dexie, { Table } from "dexie";
import { IResourceInventoryIndexDB } from "../interface/IResourceInvestory";
import { IFlowGraphIndexDB } from "../interface/IFlowGraph";

export class KorlasDatabase extends Dexie {
  korlasResourceInventoryDatabase!: Table<IResourceInventoryIndexDB, string>;
  korlasFlowGraphDatabase!: Table<IFlowGraphIndexDB>;
  constructor() {
    super("korlas");

    this.version(1).stores({
      korlasResourceInventoryDatabase: "id",
      korlasFlowGraphDatabase: "id",
    });
  }
}
