import { KorlasDatabase } from "../database/korlasDb";

class ResourceInventoryRepository extends KorlasDatabase {
  constructor() {
    super();
  }

  public async create() {
    return await this.korlasResourceInventoryDatabase.add({
      id: window.crypto.randomUUID(),
      resources: {
        solaris: 20,
        platanite: 20,
        cobrex: 20,
      },
    });
  }

  public async getCurrent() {
    const currentRecord = await this.korlasResourceInventoryDatabase.toArray();

    if (!currentRecord.length) {
      return null;
    }

    return currentRecord[0];
  }

  public async getById(id: string) {
    return await this.korlasResourceInventoryDatabase.get(id);
  }

  public async updateMaterialsQuantity({
    id,
    quantity,
    resourceType,
  }: {
    id: string;
    resourceType: string;
    quantity: number;
  }) {
    const resourceRecord = await this.getById(id);

    if (!resourceRecord) {
      throw new Error("Not exist");
    }

    const db = await this.korlasResourceInventoryDatabase.db;

    await db.transaction(
      "rw",
      this.korlasResourceInventoryDatabase,
      async () => {}
    );
    return await this.korlasResourceInventoryDatabase.update(id, {
      ...resourceRecord,
      resources: { ...resourceRecord.resources, [resourceType]: quantity },
    });
  }
}

export const resourceInventoryRepository = new ResourceInventoryRepository();
