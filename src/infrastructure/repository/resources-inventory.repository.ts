import { KorlasDatabase } from "../database/korlasDb";
import { ISoldierIndexDB } from "../interface/IResourcesInventory";

class ResourcesInventoryRepository extends KorlasDatabase {
  constructor() {
    super();
  }

  public async create() {
    return await this.korlasResourcesInventoryDatabase.add({
      id: window.crypto.randomUUID(),
      resources: [],
    });
  }

  public async getCurrent() {
    const currentRecord = await this.korlasResourcesInventoryDatabase.toArray();

    if (!currentRecord.length) {
      return null;
    }

    return currentRecord[0];
  }

  public async getById(id: string) {
    return await this.korlasResourcesInventoryDatabase.get(id);
  }

  public async addResource({ newResource }: { newResource: ISoldierIndexDB }) {
    const inventory = await this.getCurrent();

    if (!inventory) {
      throw new Error("Not exist");
    }

    return await this.korlasResourcesInventoryDatabase.update(inventory.id, {
      ...inventory,
      resources: [...inventory.resources, newResource],
    });
  }
}

export const resourceInventoryRepository = new ResourcesInventoryRepository();
