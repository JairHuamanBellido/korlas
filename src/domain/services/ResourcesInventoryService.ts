import { resourceInventoryRepository } from "@/infrastructure/repository/resources-inventory.repository";
import { IBaseSoldier } from "../store";
import { ISoldierIndexDB } from "@/infrastructure/interface/IResourcesInventory";
import { RequiredMaterial } from "../factories/dictionary";
import { materialInventoryRepository } from "@/infrastructure/repository/materials-inventory.repository";

export class ResourcesInventoryService {
  static async getCurrent() {
    return await resourceInventoryRepository.getCurrent();
  }

  static async create() {
    const current = await this.getCurrent();

    if (!current) {
      return await resourceInventoryRepository.create();
    }
  }

  static async hasEnoughMaterials({
    requiredMaterials,
    quantity,
  }: {
    quantity: number;
    requiredMaterials: RequiredMaterial[];
  }): Promise<boolean> {
    const resourcesInventory = await materialInventoryRepository.getCurrent();

    if (!resourcesInventory) {
      return false;
    }

    const hasEnoughMaterials = requiredMaterials.every(
      (material) =>
        resourcesInventory.resources[material.name] >=
        material.quantity * quantity
    );

    return hasEnoughMaterials;
  }
  static async addResource(
    resource: Pick<IBaseSoldier, "name" | "stats" | "type">
  ) {
    const newSoldier: ISoldierIndexDB = {
      id: window.crypto.randomUUID(),
      category: "soldiers",
      name: resource.name,
      stats: resource.stats,
      type: resource.type,
    };

    return await resourceInventoryRepository.addResource({
      newResource: newSoldier,
    });
  }

  static async addResources(resources: IBaseSoldier[]) {
    for await (const resource of resources) {
      await this.addResource(resource);
    }
  }
}
