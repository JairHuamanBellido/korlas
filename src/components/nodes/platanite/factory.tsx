import { useEffect, useState } from "react";
import {
  Handle,
  Node,
  NodeProps,
  Position,
  useHandleConnections,
  useReactFlow,
} from "@xyflow/react";
import { interval } from "rxjs";
import platanitelogo from "/platanite-stone.png";
import { cn } from "@/lib/utils";
import { useCurrentNodeSelected } from "@/store/current-node-selected";
import Timer from "@/components/timer";
import {
  PLATANITE_GENERATION_THRESHOLD,
  PLATANITE_INTERVAL_DURATION_MS,
} from "./constants";
import { MaterialsInventoryService } from "@/domain/services/MaterialsInventoryService";
import { materialInventoryRepository } from "@/infrastructure/repository/materials-inventory.repository";
import { NodeMaterialsType } from "@/core/nodeMaterialsType";
import { queue } from "@/domain/queue";
import { IBaseNodeFactory } from "@/domain/interface/IBaseNodeFactory";

export default function PlataniteFactory({
  id,
  data,
}: NodeProps<Node<IBaseNodeFactory>>) {
  const [count, setCount] = useState<number>(1);
  const { updateNodeData } = useReactFlow();
  const { id: currentNodeIdSelected } = useCurrentNodeSelected();

  const nodeSourceConnections = useHandleConnections({
    type: "source",
    id: "node-platanite",
  });

  useEffect(() => {
    const subscription = interval(PLATANITE_INTERVAL_DURATION_MS).subscribe(
      () => {
        setCount((prev) => {
          if (prev === PLATANITE_GENERATION_THRESHOLD) return 1;
          else return prev + 1;
        });
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function updateQuantityTask() {
      const currentInventory = await MaterialsInventoryService.getCurrent();
      if (!currentInventory) {
        return;
      }

      await materialInventoryRepository.updateMaterialsQuantity({
        id: currentInventory.id as string,
        quantity: currentInventory.resources[NodeMaterialsType.platanite] + 1,
        resourceType: NodeMaterialsType.platanite,
      });
      updateNodeData(id, { quantity: data.quantity + 1 });
    }

    if (count === PLATANITE_GENERATION_THRESHOLD) {
      queue.push(async () => await updateQuantityTask());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, updateNodeData]);
  return (
    <div
      className={cn(
        "bg-platanite/10 border p-0 w-[240px] h-[100px] flex items-center justify-center rounded",
        {
          "border-platanite/40": id !== currentNodeIdSelected,
          "border-platanite": id === currentNodeIdSelected,
        }
      )}
    >
      <Handle
        className="bg-black border border-platanite w-2 h-2"
        type="source"
        id="node-platanite"
        isConnectable={nodeSourceConnections.length < 1}
        position={Position.Right}
      />
      <div className="flex space-x-2 items-center">
        <img width={16} height={16} src={platanitelogo} alt="" />

        <p className="text-white text-xs">Platanite (+){count}</p>
      </div>
      <Timer
        fill="hsl(var(--platanite))"
        percentage={(count / PLATANITE_GENERATION_THRESHOLD) * 100}
      />

      <div className="absolute top-0 left-0 bg-platanite text-black text-xs py-2 px-4 rounded">
        Factory
      </div>
    </div>
  );
}
