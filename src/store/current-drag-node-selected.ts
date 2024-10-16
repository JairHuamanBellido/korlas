import { NodeFactoriesType } from "@/core/nodeFactoriesType";
import { create } from "zustand";

type State = {
  current: NodeFactoriesType | undefined;
};

type Action = {
  setNodeTypeSelected: (node: State["current"]) => void;
};

export const useCurrentDragNodeSelectedStore = create<State & Action>((set) => ({
  current: undefined,
  setNodeTypeSelected: (node) => set(() => ({ current: node })),
}));
