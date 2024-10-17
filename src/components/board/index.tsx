import { useEffect, useMemo, useState } from "react";
import { Background, Controls, ReactFlow } from "@xyflow/react";
import { SolarisFactory } from "../nodes/solaris";
import { PlataniteFactory } from "../nodes/platanite";
import { CrystalliumFactory } from "../nodes/crystallium";
import { useOnNodesChange } from "@/hooks/useOnNodesChange";
import { useOnEdgesChange } from "@/hooks/useOnEdgesChange";
import { useOnConnect } from "@/hooks/useOnConnect";
import { useOnDrop } from "@/hooks/useOnDrop";
import { useOnDragOver } from "@/hooks/useOnDragOver";
import { IFlowGraphIndexDB } from "@/infrastructure/interface/IFlowGraph";
import { flowGraphRepository } from "@/infrastructure/repository/flow-graph.repository";
import { CobrexFactory } from "../nodes/cobrex";
import MaterialsDockBar from "../materials-dockbar";
import { TitaniumXFactory } from "../nodes/titaniumX";
import StoreModal from "../store/modal";

interface Props {
  flowGraph: IFlowGraphIndexDB;
}
export default function Board({ flowGraph }: Props) {
  const [nodes, setNodes] = useState(flowGraph.nodes);
  const [edges, setEdges] = useState(flowGraph.edges);
  const nodeTypes = useMemo(
    () => ({
      solarisFactory: SolarisFactory,
      plataniteFactory: PlataniteFactory,
      cobrexFactory: CobrexFactory,
      titaniumXFactory: TitaniumXFactory,
      crystalliumFactory: CrystalliumFactory,
    }),
    []
  );

  const { onNodesChange } = useOnNodesChange({ setNodes });
  const { onEdgesChange } = useOnEdgesChange({
    setEdges,
  });
  const { onConnect } = useOnConnect({
    nodes,
    setEdges,
  });
  const { onDrop } = useOnDrop({
    setNodes,
  });
  const { onDragOver } = useOnDragOver();

  useEffect(() => {
    async function updateNodesAndEdges() {
      await flowGraphRepository.applyNodeChanges({
        id: flowGraph.id as string,
        nodes,
      });

      await flowGraphRepository.applyEdgesChanges({
        id: flowGraph.id as string,
        edges,
      });
    }
    updateNodesAndEdges();
  }, [nodes, edges]);

  return (
    <div className="h-full w-[calc(100%_-_600px)] relative">
      <MaterialsDockBar />
      <StoreModal />
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        snapToGrid={true}
        onDrop={onDrop}
        onDragOver={onDragOver}
        colorMode="dark"
      >
        <Background bgColor="#101010" />
        <Controls />
      </ReactFlow>
    </div>
  );
}
