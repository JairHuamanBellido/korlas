import { Factory, Refinery, Tools } from "@/domain/factories/dictionary";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Info } from "lucide-react";
import React from "react";
import { NodeFactoriesType } from "@/core/nodeFactoriesType";
import { NodeToolsType } from "@/core/nodeToolsType";
import { NodeRefineriesType } from "@/core/nodeRefineryType";

interface Props {
  hasEnoughMaterials: boolean;
  factory: Factory | Tools | Refinery;
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: NodeFactoriesType | NodeToolsType | NodeRefineriesType
  ) => void;
}
export default function SidebarCard({
  hasEnoughMaterials,
  factory,
  onDragStart,
}: Props) {
  return (
    <div
      key={`${factory.type}-item-sidebar`}
      className={cn(
        "p-4 cursor-grab rounded w-full  border border-white/10 text-white flex flex-col justify-center items-center space-y-2 hover:bg-white/10 ",
        {
          "cursor-not-allowed": !hasEnoughMaterials,
        }
      )}
      onDragStart={(event) =>
        hasEnoughMaterials ? onDragStart(event, factory.type) : null
      }
      draggable={hasEnoughMaterials}
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
          "opacity-50": !hasEnoughMaterials,
        })}
        width={32}
        height={32}
        src={factory.imageSrc}
        alt=""
      />
      <p
        className={cn("text-sm", {
          "opacity-50": !hasEnoughMaterials,
        })}
      >
        {factory.name}
      </p>
    </div>
  );
}
