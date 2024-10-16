import {
  Handle,
  Node,
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useCurrentNodeSelected } from "@/store/current-node-selected";
import CrystalliumLogo from "/crystallium-stone.png";
export default function CrystalliumFactory({ id, data }: any) {
  const nodeA = useHandleConnections({
    type: "target",
    id: "node-a",
  });

  const nodeB = useHandleConnections({
    type: "target",
    id: "node-b",
  });
  const { updateNodeData } = useReactFlow();

  const { id: currentNodeIdSelected } = useCurrentNodeSelected();

  const [nodeASource, nodeBSource] = useNodesData<Node<{ quantity: number }>>([
    nodeA[0]?.source,
    nodeB[0]?.source,
  ]);

  useEffect(() => {
    const bothNodesAvailable =
      nodeASource &&
      nodeBSource &&
      nodeASource.data.quantity >= 1 &&
      nodeBSource.data.quantity >= 1;
    if (bothNodesAvailable) {
      updateNodeData(id, { quantity: data.quantity + 1 });

      updateNodeData(nodeASource.id, {
        quantity: nodeASource.data.quantity - 1,
      });
      updateNodeData(nodeBSource.id, {
        quantity: nodeBSource.data.quantity - 1,
      });
    }
  }, [nodeASource, nodeBSource, updateNodeData]);

  return (
    <div
      className={cn(
        "w-[240px] h-[100px]  border  bg-crystallium/10 flex items-center justify-center rounded",
        {
          "border-crystallium/40 ": id !== currentNodeIdSelected,
          "border-crystallium": id === currentNodeIdSelected,
        }
      )}
    >
      <Handle
        type="target"
        isConnectable={nodeA.length < 1}
        className="left-3/4"
        position={Position.Bottom}
        id={"node-a"}
      />
      <Handle
        type="target"
        className="left-1/4 "
        position={Position.Bottom}
        isConnectable={nodeB.length < 1}
        id={"node-b"}
      />
      <div className="absolute top-0 left-0 bg-crystallium text-black text-xs py-2 px-4 rounded">
        Factory
      </div>
      <div className="flex space-x-2 items-center">
        <img width={16} height={16} src={CrystalliumLogo} alt="" />

        <p className="text-white text-xs">Crystallium</p>
      </div>
    </div>
  );
}
