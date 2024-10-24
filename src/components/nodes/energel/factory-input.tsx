import EnergelFactory from "/energel-factory.png";
import {
  Handle,
  Node,
  Position,
  useHandleConnections,
  useNodesData,
  useReactFlow,
} from "@xyflow/react";
import {
  MultiLevelHeaderNodeContainer,
  MultilevelNodeContainer,
  SectionContentMultiLevelNode,
  SectionHeaderMultiLevelNode,
} from "@/components/multilevel-node";
import { NodeMaterialsType } from "@/core/nodeMaterialsType";
import { useEffect } from "react";
import { IBaseNodeFactory } from "@/domain/interface/IBaseNodeFactory";

export default function EnergelFactoryInput({ data, id }: any) {
  const nodeSolaris = useHandleConnections({
    type: "target",
    id: "node-solaris",
  });

  const nodePlatanite = useHandleConnections({
    type: "target",
    id: "node-platanite",
  });

  const nodeCobrex = useHandleConnections({
    type: "target",
    id: "node-cobrex",
  });

  const nodeCobrexFactory = useNodesData<Node<IBaseNodeFactory>>(
    nodeCobrex[0]?.source
  );
  const nodeSolarisFactory = useNodesData<Node<IBaseNodeFactory>>(
    nodeSolaris[0]?.source
  );
  const nodePlataniteFactory = useNodesData<Node<IBaseNodeFactory>>(
    nodePlatanite[0]?.source
  );

  const { updateNodeData } = useReactFlow();

  useEffect(() => {
    if (!data.requiredMaterials) {
      return;
    }
    const materialRequired = data.requiredMaterials[NodeMaterialsType.cobrex];
    if (
      nodeCobrex[0] &&
      nodeCobrexFactory &&
      nodeCobrexFactory.data.quantity > 0 &&
      materialRequired.actualQuantity < materialRequired.requiredQuantity
    ) {
      updateNodeData(nodeCobrex[0].source, {
        quantity: nodeCobrexFactory?.data.quantity - 1,
      });
      updateNodeData(id, {
        requiredMaterials: {
          ...data.requiredMaterials,
          [NodeMaterialsType.cobrex]: {
            ...materialRequired,
            actualQuantity: materialRequired.actualQuantity + 1,
          },
        },
      });
    }
  }, [nodeCobrex, nodeCobrexFactory]);
  useEffect(() => {
    if (!data.requiredMaterials) {
      return;
    }
    const materialRequired = data.requiredMaterials[NodeMaterialsType.solaris];

    if (
      nodeSolaris[0] &&
      nodeSolarisFactory &&
      nodeSolarisFactory.data.quantity > 0 &&
      materialRequired.actualQuantity < materialRequired.requiredQuantity
    ) {
      updateNodeData(nodeSolaris[0].source, {
        quantity: nodeSolarisFactory?.data.quantity - 1,
      });
      updateNodeData(id, {
        requiredMaterials: {
          ...data.requiredMaterials,
          [NodeMaterialsType.solaris]: {
            ...materialRequired,
            actualQuantity: materialRequired.actualQuantity + 1,
          },
        },
      });
    }
  }, [nodeSolaris, nodeSolarisFactory]);

  useEffect(() => {
    if (!data.requiredMaterials) {
      return;
    }
    const materialRequired =
      data.requiredMaterials[NodeMaterialsType.platanite];

    if (
      nodePlatanite[0] &&
      nodePlataniteFactory &&
      nodePlataniteFactory.data.quantity > 0 &&
      materialRequired.actualQuantity < materialRequired.requiredQuantity
    ) {
      console.log(nodePlatanite[0].source, nodePlataniteFactory);

      updateNodeData(nodePlatanite[0].source, {
        quantity: nodePlataniteFactory?.data.quantity - 1,
      });
      updateNodeData(id, {
        requiredMaterials: {
          ...data.requiredMaterials,
          [NodeMaterialsType.platanite]: {
            ...materialRequired,
            actualQuantity: materialRequired.actualQuantity + 1,
          },
        },
      });
    }
  }, [nodePlatanite, nodePlataniteFactory]);

  if (!data.requiredMaterials) {
    return <></>;
  }
  return (
    <MultilevelNodeContainer style={{background: `color-mix(in srgb, black 70%, hsl(var(--energel)) )`}} className=" border-energel/20">
      <MultiLevelHeaderNodeContainer>
        <img width={16} height={16} src={EnergelFactory} alt="" />
        <p className="text-white font-semibold text-lg">Energel Refinery</p>
      </MultiLevelHeaderNodeContainer>

      <SectionHeaderMultiLevelNode material={NodeMaterialsType.energel}>
        <p className="text-xs text-muted-foreground px-2 py-1">
          Required Factories
        </p>
      </SectionHeaderMultiLevelNode>
      <SectionContentMultiLevelNode>
        <p className="text-base">
          Solaris Factory ({" "}
          {data.requiredMaterials[NodeMaterialsType.solaris].actualQuantity} /{" "}
          {data.requiredMaterials[NodeMaterialsType.solaris].requiredQuantity} )
        </p>
        <Handle
          id="node-solaris"
          type="target"
          isConnectable={nodeSolaris.length < 1}
          className="bg-black border border-solaris w-1 h-1"
          position={Position.Left}
          style={{
            background:
              nodeSolaris.length < 1
                ? "color-mix(in srgb, black, hsl(var(--solaris)) 10%"
                : "hsl(var(--solaris))",
          }}
        />
      </SectionContentMultiLevelNode>
      <SectionContentMultiLevelNode>
        <p className="text-base">
          Platanite Factory ({" "}
          {data.requiredMaterials[NodeMaterialsType.platanite].actualQuantity} /{" "}
          {data.requiredMaterials[NodeMaterialsType.platanite].requiredQuantity}{" "}
          ){" "}
        </p>
        <Handle
          id="node-platanite"
          type="target"
          isConnectable={nodePlatanite.length < 1}
          className="bg-black border border-platanite w-1 h-1"
          position={Position.Left}
          style={{
            background:
              nodePlatanite.length < 1
                ? "color-mix(in srgb, black, hsl(var(--platanite)) 10%"
                : "hsl(var(--platanite))",
          }}
        />
      </SectionContentMultiLevelNode>
      <SectionContentMultiLevelNode>
        <p className="text-base">
          Cobrex Factory ({" "}
          {data.requiredMaterials[NodeMaterialsType.cobrex].actualQuantity} /{" "}
          {data.requiredMaterials[NodeMaterialsType.cobrex].requiredQuantity} )
        </p>
        <Handle
          id="node-cobrex"
          type="target"
          isConnectable={nodeCobrex.length < 1}
          className="bg-black border border-cobrex w-1 h-1"
          position={Position.Left}
          style={{
            background:
              nodeCobrex.length < 1
                ? "color-mix(in srgb, black, hsl(var(--cobrex)) 10%"
                : "hsl(var(--cobrex))",
          }}
        />
      </SectionContentMultiLevelNode>
      <SectionHeaderMultiLevelNode material={NodeMaterialsType.energel}>
        <p className="text-xs text-muted-foreground px-2 py-1">Refinement</p>
      </SectionHeaderMultiLevelNode>
      <SectionContentMultiLevelNode>
        <p className="text-base text-right">Refinement</p>
        <Handle
          id="node-energel-refinement-input"
          type="source"
          position={Position.Right}
        />
      </SectionContentMultiLevelNode>
    </MultilevelNodeContainer>
  );
}
