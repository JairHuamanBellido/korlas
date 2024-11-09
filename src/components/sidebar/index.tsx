import { NodeFactoriesType } from "@/core/nodeFactoriesType";
import { MaterialsInventoryService } from "@/domain/services/MaterialsInventoryService";
import { useCurrentDragNodeSelectedStore } from "@/store/current-drag-node-selected";
import { useLiveQuery } from "dexie-react-hooks";
import { Skeleton } from "../ui/skeleton";
import FactoriesSection from "./factories-section";
import RefineriesSection from "./refineries-section";
import { NodeToolsType } from "@/core/nodeToolsType";
import { NodeRefineriesType } from "@/core/nodeRefineryType";
import ToolsSection from "./tools-section";

export default function Sidebar() {
  const { setNodeTypeSelected } = useCurrentDragNodeSelectedStore();

  const currentInventory = useLiveQuery(() =>
    MaterialsInventoryService.getCurrent()
  );
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: NodeFactoriesType | NodeToolsType | NodeRefineriesType
  ) => {
    setNodeTypeSelected(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  if (currentInventory) {
    return (
      <div className="w-[240px] h-screen overflow-auto bg-black p-6 relative">
        <div className="space-y-4 flex flex-col">
          <FactoriesSection
            currentMaterialInventory={currentInventory}
            onDragStart={onDragStart}
          />
          <RefineriesSection
            currentMaterialInventory={currentInventory}
            onDragStart={onDragStart}
          />
          <ToolsSection
            currentMaterialInventory={currentInventory}
            onDragStart={onDragStart}
          />
        </div>
      </div>
    );
  }

  return <Skeleton className="w-[240px] h-screen" />;
}
