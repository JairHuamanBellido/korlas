import { resourceInventoryRepository } from "@/infrastructure/repository/resource-inventory.repository";

export class ResourceInventoryService {
  static async getCurrent() {
    return await resourceInventoryRepository.getCurrent();
  }

  static async create() {
    const current = await this.getCurrent();

    if (!current) {
      return await resourceInventoryRepository.create();
    }
  }


}
