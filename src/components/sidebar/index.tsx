import { NodeFactoriesType } from "@/core/nodeFactoriesType";
import { factories } from "@/domain/factories/dictionary";
import { ResourceInventoryService } from "@/domain/services/ResourceInventoryService";
import { useCurrentDragNodeSelectedStore } from "@/store/current-drag-node-selected";
import { useLiveQuery } from "dexie-react-hooks";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

export default function Sidebar() {
  const { setNodeTypeSelected } = useCurrentDragNodeSelectedStore();
  const currentInventory = useLiveQuery(() =>
    ResourceInventoryService.getCurrent()
  );
  const onDragStart = (event: any, nodeType: NodeFactoriesType) => {
    setNodeTypeSelected(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  if (!!currentInventory) {
    return (
      <div className="w-[240px] h-screen bg-black p-6">
        <div className="space-y-4 flex flex-col">
          {factories.map((factory) => {
            const hasEnoughtMaterials = factory.requiredMaterials.every(
              (material) =>
                currentInventory.resources[material.name] >= material.quantity
            );

            return (
              <div
                key={`${factory.type}-item-sidebar`}
                className={cn(
                  "p-4 cursor-grab rounded w-full  border border-white/10 text-white flex flex-col justify-center items-center space-y-2 hover:bg-white/10 ",
                  {
                    "cursor-not-allowed": !hasEnoughtMaterials,
                  }
                )}
                onDragStart={(event) =>
                  hasEnoughtMaterials ? onDragStart(event, factory.type) : null
                }
                draggable={hasEnoughtMaterials}
              >
                <div className="w-full flex justify-end">
                  <HoverCard openDelay={200} closeDelay={0}>
                    <HoverCardTrigger>
                      <Info size={24} />
                    </HoverCardTrigger>
                    <HoverCardContent
                      className="bg-black/40 backdrop-blur-3xl border-white/5 w-[300px] space-y-4"
                      side="right"
                    >
                      <h2 className="text-lg font-semibold">{factory.name}</h2>
                      <div className="space-y-1">
                        <p className="text-white/80">Materials Required</p>
                        <div className="flex flex-col space-y-2">
                          {factory.requiredMaterials.map((materialRequired) => (
                            <div
                              key={`factory-${factory.name}-material-required-${materialRequired.name}`}
                              className="flex items-center space-x-2"
                            >
                              <img
                                width={16}
                                height={16}
                                src={`/${materialRequired.name}-stone.png`}
                                alt=""
                              />
                              <p>{materialRequired.name}</p>
                              <p>{materialRequired.quantity}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                <img
                  className={cn({
                    "opacity-50": !hasEnoughtMaterials,
                  })}
                  width={32}
                  height={32}
                  src={factory.imageSrc}
                  alt=""
                />
                <p
                  className={cn("text-sm", {
                    "opacity-50": !hasEnoughtMaterials,
                  })}
                >
                  {factory.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return <Skeleton className="w-[240px] h-screen" />;
}
