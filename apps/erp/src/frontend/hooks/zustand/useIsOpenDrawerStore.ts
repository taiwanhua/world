import { create } from "zustand";
import { isServer } from "@/utils/is/isServer";

interface Store {
  isOpenDrawer: boolean;
  setIsOpenDrawer: (isOpenDrawer: boolean) => void;
}

export const useIsOpenDrawerStore = create<Store>((set) => ({
  isOpenDrawer: false,
  setIsOpenDrawer: (isOpenDrawer): void => {
    if (isServer) {
      return;
    }
    set(() => ({ isOpenDrawer }));
  },
}));
