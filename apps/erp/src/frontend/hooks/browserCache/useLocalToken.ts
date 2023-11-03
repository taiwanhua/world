"use client";

import { useCallback } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useMenusByTokenStore } from "@/frontend/hooks/zustand/useMenusByTokenStore";
import { useUserByTokenStore } from "@/frontend/hooks/zustand/useUserByTokenStore";
import { useLocalStorageState } from "./useLocalStorageState";

const defaultToken: string | null = null;

export interface Return {
  localToken: string | null;
  updateLocalToken: Dispatch<SetStateAction<string | null>>;
  /** prepare for logout */
  removeLocalToken: () => void;
}

/** @deprecated - Will later be migrated to next-auth session*/
export function useLocalToken(): Return {
  const [token, tokenMutate, removeToken] = useLocalStorageState(
    "token",
    defaultToken,
  );

  const { removeUserByToken } = useUserByTokenStore();
  const { removeMenusByToken } = useMenusByTokenStore();

  const removeLocalToken = useCallback(() => {
    removeToken();
    removeUserByToken();
    removeMenusByToken();
  }, [removeMenusByToken, removeToken, removeUserByToken]);

  return {
    localToken: token,
    updateLocalToken: tokenMutate,
    /** prepare for logout */
    removeLocalToken,
  };
}
