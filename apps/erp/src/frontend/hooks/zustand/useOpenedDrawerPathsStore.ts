import { produce } from "immer";
import { create } from "zustand";
import { isServer } from "@/utils/is/isServer";

interface Store {
  openedDrawerPaths: string[];
  addOrRemoveOpenedDrawerPaths: (menuPath: string) => void;
  initializeOpenedDrawerPaths: (pathname: string) => void;
}
export const useOpenedDrawerPathsStore = create<Store>((set, get) => ({
  openedDrawerPaths: [],
  addOrRemoveOpenedDrawerPaths: (menuPath: string): void => {
    if (isServer) {
      return;
    }

    const openedDrawerPaths = get().openedDrawerPaths;

    const nextOpenedDrawerPaths = produce(openedDrawerPaths, (draft) => {
      const index = draft.indexOf(menuPath);
      if (index > -1) {
        draft.splice(index, 1);
      } else {
        draft.push(menuPath); // reference is not change
      }
    });

    set(() => ({ openedDrawerPaths: nextOpenedDrawerPaths }));
  },
  initializeOpenedDrawerPaths: (pathnameString: string): void => {
    if (isServer) {
      return;
    }

    const pathnameSplit = pathnameString.split("/");

    const menuPaths = pathnameSplit.reduce<string[]>(
      (accumulator, pathname) => {
        if (pathname) {
          const lastPathname = accumulator[accumulator.length - 1] ?? "";
          accumulator.push(`${lastPathname}/${pathname}`);
        }

        return accumulator;
      },
      [],
    );

    const openedDrawerPaths = get().openedDrawerPaths;

    const nextOpenedDrawerPaths = produce(openedDrawerPaths, (draft) => {
      const nextDraft = Array.from(new Set([...draft, ...menuPaths]));
      return nextDraft;
    });

    set(() => ({ openedDrawerPaths: nextOpenedDrawerPaths }));
  },
}));
