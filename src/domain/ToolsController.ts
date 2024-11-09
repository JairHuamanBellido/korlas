import { NodeToolsType } from "@/core/nodeToolsType";

export class ToolController {
  static createNode(toolType: NodeToolsType) {
    switch (toolType) {
      case NodeToolsType.acceleratorX10:
        return {
          label: `${toolType} tool`,
          cycles: 40,
          performance: 0.1,
        };
      case NodeToolsType.acceleratorX20:
        return {
          label: `${toolType} tool`,
          cycles: 20,
          performance: 0.2,
        };

      case NodeToolsType.acceleratorX30:
        return {
          label: `${toolType} tool`,
          cycles: 10,
          performance: 0.3,
        };
      default:
        break;
    }
  }
}
