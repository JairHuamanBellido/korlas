import { NodeFactoriesType } from "@/core/nodeFactoriesType";
import { IMaterialsInventoryIndexDB } from "@/infrastructure/interface/IMaterialsInventory";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { refineries } from "@/domain/factories/dictionary";
import SidebarCard from "./card";
import { NodeToolsType } from "@/core/nodeToolsType";
import { NodeRefineriesType } from "@/core/nodeRefineryType";

interface Props {
  currentMaterialInventory: IMaterialsInventoryIndexDB;
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: NodeFactoriesType | NodeToolsType | NodeRefineriesType
  ) => void;
}
export default function RefineriesSection({
  currentMaterialInventory,
  onDragStart,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger className="w-full flex items-center justify-between hover:bg-white/5">
        <h2 className="text-xl">Refineries</h2>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </CollapsibleTrigger>
      <CollapsibleContent className="py-4 space-y-4">
        {refineries.map((refinery) => {
          const hasEnoughtMaterials = refinery.requiredMaterials.every(
            (material) =>
              currentMaterialInventory.resources[material.name] >=
              material.quantity
          );

          return (
            <SidebarCard
              key={`${refinery.type}-item-sidebar`}
              factory={refinery}
              hasEnoughMaterials={hasEnoughtMaterials}
              onDragStart={onDragStart}
            />
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}
