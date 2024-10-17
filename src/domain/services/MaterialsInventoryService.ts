import { materialInventoryRepository } from "@/infrastructure/repository/materials-inventory.repository";

export class MaterialsInventoryService {
  static async getCurrent() {
    return await materialInventoryRepository.getCurrent();
  }

  static async create() {
    const current = await this.getCurrent();

    if (!current) {
      return await materialInventoryRepository.create();
    }
  }


}
