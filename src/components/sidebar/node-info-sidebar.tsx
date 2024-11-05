import { Node, useNodesData } from "@xyflow/react";
import { useCurrentNodeSelected } from "../../store/current-node-selected";
import { cn } from "@/lib/utils";
import { IBaseNodeFactory, INodeFactoryGroup } from "@/domain/interface/IBaseNodeFactory";

export default function NodeInfoSidebar() {
  const { id } = useCurrentNodeSelected();

  const nodeData = useNodesData<Node<IBaseNodeFactory | INodeFactoryGroup>>(id ?? "");

  return (
    <div className="w-[360px] h-full relative p-6">
      {!nodeData ? (
        <div className="h-full w-full flex items-center justify-center flex-col">
          <p className="w-1/2 text-center text-muted-foreground">
            {" "}
            Please select any node to see detail information.
          </p>
        </div>
      ) : (
        <div>
          <div>{nodeData.id}</div>
          <div className="flex flex-col space-y-4 mt-4">
            <div className="flex flex-col space-y-1">
              <p className="text-muted-foreground">Type</p>
              <p>{nodeData.type}</p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="text-muted-foreground">Quantity</p>
              <p>{nodeData.data.quantity}</p>
            </div>

            {'requiredFactories' in nodeData.data && nodeData.data.requiredFactories && (
              <div className="space-y-1">
                <p className="text-muted-foreground">Connections</p>
                <div className="space-y-2">

                
                {nodeData.data.requiredFactories.map((node, i) => (
                  <div
                    data-state={node.connection ? "on" : "off"}
                    key={`${node.name}-${i}-sidebar`}
                    className={cn("flex items-center space-x-2")}
                  >
                    <p
                      className={cn("py-1 px-2 rounded text-sm", {
                        "bg-muted text-muted-foreground": !node.connection,
                        "text-green-500 bg-green-500/20": node.connection,
                      })}
                    >
                      {node.connection ? "Connected" : "Disconnected"}
                    </p>
                    <p>{node.name}</p>
                  </div>
                ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
