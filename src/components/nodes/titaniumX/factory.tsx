import { useEffect, useState } from "react";
import {
  Handle,
  Position,
  useHandleConnections,
  useReactFlow,
} from "@xyflow/react";
import { interval } from "rxjs";
import titaniumXlogo from "/titaniumX-stone.png";
import { cn } from "@/lib/utils";
import { useCurrentNodeSelected } from "@/store/current-node-selected";
import Timer from "@/components/timer";
import {
  TITANIUMX_GENERATION_THRESHOLD,
  TITANIUMX_INTERVAL_DURATION_MS,
} from "./constants";
import { ResourceInventoryService } from "@/domain/services/ResourceInventoryService";
import { resourceInventoryRepository } from "@/infrastructure/repository/resource-inventory.repository";
import { NodeMaterialsType } from "@/core/nodeMaterialsType";

export default function TitaniumXFactory({ id, data }: any) {
  const [count, setCount] = useState<number>(1);
  const { updateNodeData } = useReactFlow();
  const { id: currentNodeIdSelected } = useCurrentNodeSelected();

  const nodeSourceConnections = useHandleConnections({
    type: "source",
    id: "node-a",
  });
  useEffect(() => {
    const subscription = interval(TITANIUMX_INTERVAL_DURATION_MS).subscribe(
      () => {
        setCount((prev) => {
          if (prev === TITANIUMX_GENERATION_THRESHOLD) return 1;
          else return prev + 1;
        });
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function updateQuantity() {
      const currentInventory = await ResourceInventoryService.getCurrent();
      if (!currentInventory) {
        return;
      }
      if (count === TITANIUMX_GENERATION_THRESHOLD) {
        updateNodeData(id, { quantity: data.quantity + 1 });
        await resourceInventoryRepository.updateMaterialsQuantity({
          id: currentInventory.id as string,
          quantity:
            (currentInventory.resources[NodeMaterialsType.titaniumX] || 0) + 1,
          resourceType: NodeMaterialsType.titaniumX,
        });
      }
    }

    updateQuantity();
  }, [count, updateNodeData]);

  return (
    <div
      className={cn(
        "bg-titaniumx/10 border p-0 w-[240px] h-[100px] flex items-center justify-center rounded",
        {
          "border-titaniumx/40": id !== currentNodeIdSelected,
          "border-titaniumx": id === currentNodeIdSelected,
        }
      )}
    >
      <Handle
        className="bg-black border border-titaniumx w-2 h-2"
        type="source"
        id="node-a"
        isConnectable={nodeSourceConnections.length < 1}
        position={Position.Top}
      />
      <div className="flex space-x-2 items-center">
        <img width={16} height={16} src={titaniumXlogo} alt="" />

        <p className="text-white text-xs">titaniumX (+){count}</p>
      </div>
      <Timer
        fill="hsl(var(--titaniumX))"
        percentage={(count / TITANIUMX_GENERATION_THRESHOLD) * 100}
      />

      <div className="absolute top-0 left-0 bg-titaniumx text-black text-xs py-2 px-4 rounded">
        Factory
      </div>
    </div>
  );
}
