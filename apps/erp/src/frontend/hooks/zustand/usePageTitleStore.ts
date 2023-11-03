import { create } from "zustand";

interface Store {
  pageTitle: string;
  setPageTitle: (pageTitle: string) => void;
}

export const usePageTitleStore = create<Store>((set) => ({
  pageTitle: "",
  setPageTitle: (pageTitle): void => set(() => ({ pageTitle })),
}));
