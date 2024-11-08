import { cn } from "@/lib/utils";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import EnergelStone from "/energel-stone.png";
import { IBaseNodeFactory } from "@/domain/interface/IBaseNodeFactory";
export default function EnergelStorage({
  data,
}: NodeProps<Node<IBaseNodeFactory>>) {
  return (
    <div
      className={cn(
        "bg-energel/20 border px-16 py-4 flex items-center justify-center rounded border-energel"
      )}
    >
      <Handle
        id="node-energel-refinement-output"
        type="target"
        position={Position.Left}
        className="bg-black border border-energel w-2 h-2"
      />
      <div className="flex space-x-2 items-center">
        <img width={16} height={16} src={EnergelStone} />
        <p>Energel +({data.quantity})</p>
      </div>
    </div>
  );
}
