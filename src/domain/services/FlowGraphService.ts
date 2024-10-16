import { flowGraphRepository } from "@/infrastructure/repository/flow-graph.repository";

export class FlowGraphService {
  static async getCurrent() {
    return await flowGraphRepository.getCurrent();
  }

  static async create() {
    const current = await this.getCurrent();

    if (!current) {
      return await flowGraphRepository.create();
    }
  }
}
