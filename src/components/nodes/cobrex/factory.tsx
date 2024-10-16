import { useEffect, useState } from "react";
import {
  Handle,
  Position,
  useHandleConnections,
  useReactFlow,
} from "@xyflow/react";
import { interval } from "rxjs";
import cobrexlogo from "/cobrex-stone.png";
import { cn } from "@/lib/utils";
import { useCurrentNodeSelected } from "@/store/current-node-selected";
import Timer from "@/components/timer";
import {
  COBREX_GENERATION_THRESHOLD,
  COBREX_INTERVAL_DURATION_MS,
} from "./constants";
import { ResourceInventoryService } from "@/domain/services/ResourceInventoryService";
import { resourceInventoryRepository } from "@/infrastructure/repository/resource-inventory.repository";
import { NodeMaterialsType } from "@/core/nodeMaterialsType";

export default function CobrexFactory({ id, data }: any) {
  const [count, setCount] = useState<number>(1);
  const { updateNodeData } = useReactFlow();
  const { id: currentNodeIdSelected } = useCurrentNodeSelected();

  const nodeSourceConnections = useHandleConnections({
    type: "source",
    id: "node-a",
  });
  useEffect(() => {
    const subscription = interval(COBREX_INTERVAL_DURATION_MS).subscribe(() => {
      setCount((prev) => {
        if (prev === COBREX_GENERATION_THRESHOLD) return 1;
        else return prev + 1;
      });
    });

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

      if (count === COBREX_GENERATION_THRESHOLD) {
        updateNodeData(id, { quantity: data.quantity + 1 });
        await resourceInventoryRepository.updateMaterialsQuantity({
          id: currentInventory.id as string,
          quantity: currentInventory.resources[NodeMaterialsType.cobrex] + 1,
          resourceType: NodeMaterialsType.cobrex,
        });
      }
    }
    updateQuantity();
  }, [count, updateNodeData]);

  return (
    <div
      className={cn(
        "bg-cobrex/10 border p-0 w-[240px] h-[100px] flex items-center justify-center rounded",
        {
          "border-cobrex/40": id !== currentNodeIdSelected,
          "border-cobrex": id === currentNodeIdSelected,
        }
      )}
    >
      <Handle
        className="bg-black border border-cobrex w-2 h-2"
        type="source"
        id="node-a"
        isConnectable={nodeSourceConnections.length < 1}
        position={Position.Top}
      />
      <div className="flex space-x-2 items-center">
        <img width={16} height={16} src={cobrexlogo} alt="" />

        <p className="text-white text-xs">cobrex (+){count}</p>
      </div>
      <Timer
        fill="hsl(var(--cobrex))"
        percentage={(count / COBREX_GENERATION_THRESHOLD) * 100}
      />

      <div className="absolute top-0 left-0 bg-cobrex text-black text-xs py-2 px-4 rounded">
        Factory
      </div>
    </div>
  );
}
