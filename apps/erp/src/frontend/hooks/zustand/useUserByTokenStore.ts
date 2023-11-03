import { create } from "zustand";
import type { SystemUser } from "@/backend/graphql/types";

interface Store {
  userByToken: SystemUser | null;
  isTokenValid: boolean;
  setUserByToken: (userByToken: SystemUser | null) => void;
  removeUserByToken: () => void;
}

export const useUserByTokenStore = create<Store>((set) => ({
  userByToken: null,
  isTokenValid: false,
  setUserByToken: (userByToken): void =>
    set(() => {
      return { userByToken, isTokenValid: Boolean(userByToken) };
    }),
  removeUserByToken: (): void =>
    set({ userByToken: null, isTokenValid: false }),
}));
