import { useEffect, useMemo, useState } from "react";
import { Controls, ReactFlow } from "@xyflow/react";
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
import BottomBar from "../bottom-bar";
import EnergelRefinement from "../nodes/energel/refinery";
import EnergelFactoryInput from "../nodes/energel/factory-input";
import EnergelRefinementNode from "../nodes/energel/refinement-node";
import EnergelStorage from "../nodes/energel/storage";

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
      energelRefinement: EnergelRefinement,
      energelFactoryInput: EnergelFactoryInput,
      energelRefinementNode: EnergelRefinementNode,
      energelStorage: EnergelStorage,
    }),
    []
  );

  const { onNodesChange } = useOnNodesChange({ setNodes });
  const { onEdgesChange } = useOnEdgesChange({
    edges,
    setEdges,
    nodes,
  });
  const { onConnect } = useOnConnect({
    nodes,
    setEdges,
  });
  const { onDrop } = useOnDrop({
    setNodes,
    setEdges,
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
      <BottomBar />
      <ReactFlow
        className="bg-[#06070c]"
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        isValidConnection={(e) => {
          return e.sourceHandle === e.targetHandle;
        }}
        fitView
        snapToGrid={true}
        onDrop={onDrop}
        onDragOver={onDragOver}
        colorMode="dark"
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}
