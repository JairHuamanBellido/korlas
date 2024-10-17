import { KorlasDatabase } from "../database/korlasDb";

class MaterialInventoryRepository extends KorlasDatabase {
  constructor() {
    super();
  }

  public async create() {
    return await this.korlasMaterialsInventoryDatabase.add({
      id: window.crypto.randomUUID(),
      resources: {
        solaris: 20,
        platanite: 20,
        cobrex: 20,
      },
    });
  }

  public async getCurrent() {
    const currentRecord = await this.korlasMaterialsInventoryDatabase.toArray();

    if (!currentRecord.length) {
      return null;
    }

    return currentRecord[0];
  }

  public async getById(id: string) {
    return await this.korlasMaterialsInventoryDatabase.get(id);
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

    const db = await this.korlasMaterialsInventoryDatabase.db;

    await db.transaction(
      "rw",
      this.korlasMaterialsInventoryDatabase,
      async () => {}
    );
    return await this.korlasMaterialsInventoryDatabase.update(id, {
      ...resourceRecord,
      resources: { ...resourceRecord.resources, [resourceType]: quantity },
    });
  }
}

export const materialInventoryRepository = new MaterialInventoryRepository();
