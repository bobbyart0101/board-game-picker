import { create } from "zustand";

interface GamePick {
  primary: unknown;
  alternatives: unknown[];
}

interface GameStore extends GamePick {
  setPick: (primary: unknown, alternatives: unknown[]) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  primary: null,
  alternatives: [],
  setPick: (primary, alternatives) => set({ primary, alternatives }),
}));
