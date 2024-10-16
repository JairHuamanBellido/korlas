import { useEffect, useState } from "react";
import {
  Handle,
  Position,
  useHandleConnections,
  useReactFlow,
} from "@xyflow/react";
import { interval } from "rxjs";
import solarislogo from "/solaris-stone.png";
import { useCurrentNodeSelected } from "@/store/current-node-selected";
import { cn } from "@/lib/utils";
import Timer from "@/components/timer";
import {
  SOLARIS_GENERATION_THRESHOLD,
  SOLARIS_INTERVAL_DURATION_MS,
} from "./constants";
import { ResourceInventoryService } from "@/domain/services/ResourceInventoryService";
import { resourceInventoryRepository } from "@/infrastructure/repository/resource-inventory.repository";
import { NodeMaterialsType } from "@/core/nodeMaterialsType";
import { queue } from "@/domain/queue";
// import { queue } from "@/domain/queue";
export default function SolarisFactory({ id, data }: any) {
  const [count, setCount] = useState<number>(1);
  const { updateNodeData } = useReactFlow();
  const { id: currentNodeIdSelected } = useCurrentNodeSelected();

  const nodeSourceConnection = useHandleConnections({
    type: "source",
    id: "node-a",
  });
  useEffect(() => {
    const subscription = interval(SOLARIS_INTERVAL_DURATION_MS).subscribe(
      () => {
        setCount((prev) => {
          if (prev === SOLARIS_GENERATION_THRESHOLD) return 1;
          else return prev + 1;
        });
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function updateQuantiy() {
      const currentInventory = await ResourceInventoryService.getCurrent();
      if (!currentInventory) {
        return;
      }
      updateNodeData(id, { quantity: data.quantity + 1 });
      await resourceInventoryRepository.updateMaterialsQuantity({
        id: currentInventory.id as string,
        quantity: currentInventory.resources[NodeMaterialsType.solaris] + 1,
        resourceType: NodeMaterialsType.solaris,
      });
    }
    if (count === SOLARIS_GENERATION_THRESHOLD) {
      queue.push(async () => await updateQuantiy());
    }
  }, [count, updateNodeData]);

  return (
    <div
      className={cn(
        "bg-solaris/10 border p-0 w-[240px] h-[100px] flex items-center justify-center rounded",
        {
          "border-solaris/40": id !== currentNodeIdSelected,
          "border-solaris": id === currentNodeIdSelected,
        }
      )}
    >
      <Handle
        className="bg-black border border-solaris w-2 h-2"
        type="source"
        id="node-a"
        isConnectable={nodeSourceConnection.length < 1}
        position={Position.Top}
      />
      <div className="flex space-x-2 items-center">
        <img width={16} height={16} src={solarislogo} alt="" />

        <p className="text-white text-xs">Solaris (+10) {count}</p>
      </div>
      <Timer
        fill="hsl(var(--solaris))"
        percentage={(count / SOLARIS_GENERATION_THRESHOLD) * 100}
      />

      <div className="absolute top-0 left-0 bg-solaris text-black text-xs py-2 px-4 rounded">
        Factory
      </div>
    </div>
  );
}
