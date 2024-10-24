import {
  Handle,
  Node,
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useCurrentNodeSelected } from "@/store/current-node-selected";
import CrystalliumLogo from "/crystallium-stone.png";
import { MaterialsInventoryService } from "@/domain/services/MaterialsInventoryService";
import { materialInventoryRepository } from "@/infrastructure/repository/materials-inventory.repository";
import { NodeMaterialsType } from "@/core/nodeMaterialsType";
import { queue } from "@/domain/queue";
import { interval } from "rxjs";
import {
  CRYSTALLIUM_GENERATION_THRESHOLD,
  CRYSTALLIUM_INTERVAL_DURATION_MS,
} from "./constants";
import Timer from "@/components/timer";
import {
  MultiLevelHeaderNodeContainer,
  MultilevelNodeContainer,
  SectionContentMultiLevelNode,
  SectionHeaderMultiLevelNode,
} from "@/components/multilevel-node";
export default function CrystalliumFactory({ id, data }: any) {
  const [count, setCount] = useState<number>(1);

  const nodeA = useHandleConnections({
    type: "target",
    id: "node-solaris",
  });

  const nodeB = useHandleConnections({
    type: "target",
    id: "node-platanite",
  });
  const { updateNodeData } = useReactFlow();

  const { id: currentNodeIdSelected } = useCurrentNodeSelected();

  const [nodeASource, nodeBSource] = useNodesData<Node<{ quantity: number }>>([
    nodeA[0]?.source,
    nodeB[0]?.source,
  ]);

  useEffect(() => {
    const subscription = interval(CRYSTALLIUM_INTERVAL_DURATION_MS).subscribe(
      () => {
        setCount((prev) => {
          if (prev === CRYSTALLIUM_GENERATION_THRESHOLD) return 1;
          else return prev + 1;
        });
      }
    );

    const bothNodesAvailable = nodeASource && nodeBSource;

    if (!bothNodesAvailable) {
      subscription.unsubscribe();
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [nodeASource, nodeBSource, updateNodeData]);

  useEffect(() => {
    async function updateQuantity() {
      const currentInventory = await MaterialsInventoryService.getCurrent();

      if (!currentInventory) {
        return;
      }

      await materialInventoryRepository.updateMaterialsQuantity({
        id: currentInventory.id as string,
        quantity:
          (currentInventory.resources[NodeMaterialsType.crystallium] || 0) + 1,
        resourceType: NodeMaterialsType.crystallium,
      });
      updateNodeData(id, { quantity: data.quantity + 1 });
    }

    if (count === CRYSTALLIUM_GENERATION_THRESHOLD) {
      queue.push(async () => await updateQuantity());
    }
  }, [count, updateNodeData]);

  return (
    <MultilevelNodeContainer
      className={cn("bg-crystallium/10 border-crystallium",{
        "border-crystallium/40 ": id !== currentNodeIdSelected,
        "border-crystallium": id === currentNodeIdSelected,
      })}
    >
      <MultiLevelHeaderNodeContainer >
        <img width={16} height={16} src={CrystalliumLogo} alt="" />
        <p className="text-white font-semibold text-lg ">
          Crystallium{" "}
          <span className="text-xs font-normal text-muted-foreground">
            {" "}
            +{data.quantity}{" "}
          </span>
        </p>
        <Timer
          fill="hsl(var(--crystallium))"
          percentage={(count / CRYSTALLIUM_GENERATION_THRESHOLD) * 100}
        />
      </MultiLevelHeaderNodeContainer>
      <SectionHeaderMultiLevelNode  material={NodeMaterialsType.crystallium}>
        <p className="text-xs text-muted-foreground px-2 py-1">
          Required Factories
        </p>
      </SectionHeaderMultiLevelNode>
      <SectionContentMultiLevelNode>
        <p className="text-base">Solaris Factory</p>
        <Handle
          type="target"
          isConnectable={nodeA.length < 1}
          className=" bg-black border border-crystallium  w-1 h-1"
          position={Position.Left}
          style={{
            background:
              nodeA.length < 1
                ? "color-mix(in srgb, black, hsl(var(--crystallium)) 10%"
                : "hsl(var(--crystallium))",
          }}
          id={"node-solaris"}
        />
      </SectionContentMultiLevelNode>
      <SectionContentMultiLevelNode>
        <p className="text-base">Platanite Factory</p>
        <Handle
          type="target"
          isConnectable={nodeB.length < 1}
          className=" bg-black border border-crystallium  w-1 h-1"
          position={Position.Left}
          style={{
            background:
              nodeB.length < 1
                ? "color-mix(in srgb, black, hsl(var(--crystallium)) 10%"
                : "hsl(var(--crystallium))",
          }}
          id={"node-platanite"}
        />
      </SectionContentMultiLevelNode>
    </MultilevelNodeContainer>
  );
}
