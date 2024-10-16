import { create } from "zustand";
type State = {
  id: string | undefined;
};

type Action = {
  setNodeId: (id: State["id"]) => void;
};

export const useCurrentNodeSelected = create<State & Action>((set) => ({
  id: undefined,
  setNodeId: (newId) => set(() => ({ id: newId })),
}));
