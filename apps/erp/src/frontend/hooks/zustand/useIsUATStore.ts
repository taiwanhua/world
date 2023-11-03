import { create } from "zustand";

interface Store {
  isUAT: boolean | null;
  setIsUAT: (isUAT: boolean) => void;
}

export const useIsUATStore = create<Store>((set) => ({
  isUAT: null,
  setIsUAT: (isUAT): void =>
    set(() => {
      return { isUAT };
    }),
}));
