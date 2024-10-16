import { Edge, Node } from "@xyflow/react";
import { KorlasDatabase } from "../database/korlasDb";

class FlowGraphRepository extends KorlasDatabase {
  constructor() {
    super();
  }

  public async create() {
    return await this.korlasFlowGraphDatabase.add({
      id: window.crypto.randomUUID(),
      edges: [],
      nodes: [],
    });
  }

  public async getCurrent() {
    const currentRecord = await this.korlasFlowGraphDatabase.toArray();
    if (!currentRecord.length) {
      return null;
    }

    return currentRecord[0];
  }

  public async getById(id: string) {
    return await this.korlasFlowGraphDatabase.get(id);
  }

  public async applyNodeChanges({ id, nodes }: { id: string; nodes: Node[] }) {
    const flowGraphRecord = await this.getById(id);

    if (!flowGraphRecord) {
      throw new Error("Not found");
    }

    return await this.korlasFlowGraphDatabase.update(id, {
      ...flowGraphRecord,
      nodes,
    });
  }

  public async applyEdgesChanges({ id, edges }: { id: string; edges: Edge[] }) {
    const flowGraphRecord = await this.getById(id);

    if (!flowGraphRecord) {
      throw new Error("Not found");
    }

    return await this.korlasFlowGraphDatabase.update(id, {
      ...flowGraphRecord,
      edges,
    });
  }
}

export const flowGraphRepository = new FlowGraphRepository();
