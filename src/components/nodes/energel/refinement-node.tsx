import Countdown from "@/components/countdown";
import { NodeMaterialsType } from "@/core/nodeMaterialsType";

import { INodeFactoryGroup } from "@/domain/interface/IBaseNodeFactory";
import { cn } from "@/lib/utils";
import {
  Handle,
  Node,
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import { Loader2 } from "lucide-react";
import { memo, useEffect, useState } from "react";

export function EnergelRefinementNode() {
  const handleTargetInput = useHandleConnections({
    type: "target",
    id: "node-energel-refinement-input",
  });

  const handleSourceOutput = useHandleConnections({
    type: "source",
    id: "node-energel-refinement-output",
  });

  const nodeInput = useNodesData<Node<INodeFactoryGroup>>(
    handleTargetInput[0]?.source
  );

  const { updateNodeData } = useReactFlow();

  const nodeSource = useNodesData(handleSourceOutput[0]?.target);

  const [status, setStatus] = useState<"PENDING" | "PROCESSING" | "SUCCESS">(
    "PENDING"
  );

  useEffect(() => {
    if (nodeInput) {
      const isAllConnected = nodeInput.data.requiredFactories.every(
        (factory) => factory.connection
      );
      if (nodeInput.data.requiredMaterials === undefined) {
        return;
      }

      const isAllQuantityCompleted = Object.keys(
        nodeInput.data.requiredMaterials
      ).every(
        (material) =>
          !!nodeInput.data.requiredMaterials &&
          nodeInput.data.requiredMaterials[material].actualQuantity ===
            nodeInput.data.requiredMaterials[material].requiredQuantity
      );
      if (isAllConnected && isAllQuantityCompleted) {
        setStatus("PROCESSING");
      } else {
        setStatus("PENDING");
      }
    } else {
      setStatus("PENDING");
    }
  }, [nodeInput]);

  return (
    <div
      className={cn(
        "flex flex-col p-2 min-w-[180px]   border rounded border-white/10 items-center"
      )}
    >
      <div className=" absolute -top-6 left-0 space-x-2 text-sm">
        <p>Refinement</p>
      </div>
      <div className=" absolute -bottom-4 right-0 text-xs text-muted-foreground">
        <Countdown
          onFinish={() => {
            setStatus("SUCCESS")
            if (nodeSource && nodeInput && nodeInput.data.requiredMaterials) {
              updateNodeData(nodeSource.id, {
                quantity: nodeSource.data.quantity + 1,
              });

              updateNodeData(nodeInput.id, {
                requiredMaterials: {
                  [NodeMaterialsType.cobrex]: {
                    ...nodeInput.data.requiredMaterials[
                      NodeMaterialsType.cobrex
                    ],
                    actualQuantity: 0,
                  },
                  [NodeMaterialsType.solaris]: {
                    ...nodeInput.data.requiredMaterials[
                      NodeMaterialsType.solaris
                    ],
                    actualQuantity: 0,
                  },
                  [NodeMaterialsType.platanite]: {
                    ...nodeInput.data.requiredMaterials[
                      NodeMaterialsType.platanite
                    ],
                    actualQuantity: 0,
                  },
                },
              });
            }
          }}
          durationInSeconds={3}
          isStopped={status === "PENDING"}
        />
      </div>
      <div
        className={cn(
          "text-xs py-1 text-center w-full px-8 rounded flex items-center justify-center space-x-4",
          {
            "text-white bg-muted-foreground/20": status === "PENDING",
            "text-yellow-300 bg-yellow-300/20 ": status === "PROCESSING",
            "text-green-500 bg-green-500/20": status === "SUCCESS",
          }
        )}
      >
        {status === "PROCESSING" ? (
          <div className="flex items-center space-x-2">
            <Loader2 size={12} className="animate-spin" />
            <p>{status}</p>
          </div>
        ) : (
          <>{status}</>
        )}
        {/* {status} */}
      </div>
      <Handle
        id="node-energel-refinement-input"
        type="target"
        position={Position.Left}
      />
      <Handle
        id="node-energel-refinement-output"
        type="source"
        position={Position.Right}
      />
    </div>
  );
}

export default memo(EnergelRefinementNode);
