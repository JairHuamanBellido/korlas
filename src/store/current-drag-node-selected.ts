import { NodeFactoriesType } from "@/core/nodeFactoriesType";
import { NodeRefineriesType } from "@/core/nodeRefineryType";
import { NodeToolsType } from "@/core/nodeToolsType";
import { create } from "zustand";

type State = {
  current: NodeFactoriesType | NodeRefineriesType | NodeToolsType | undefined;
};

type Action = {
  setNodeTypeSelected: (node: State["current"]) => void;
};

export const useCurrentDragNodeSelectedStore = create<State & Action>(
  (set) => ({
    current: undefined,
    setNodeTypeSelected: (node) => set(() => ({ current: node })),
  })
);
