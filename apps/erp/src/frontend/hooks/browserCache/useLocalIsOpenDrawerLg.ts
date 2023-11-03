"use client";

import type { Dispatch, SetStateAction } from "react";
import { useLocalStorageState } from "./useLocalStorageState";

const defaultIsOpenDrawerLg = true;

export interface Return {
  localIsOpenDrawerLg: boolean;
  updateLocalIsOpenDrawerLg: Dispatch<SetStateAction<boolean>>;
  /** prepare for logout */
  removeLocalIsOpenDrawerLg: () => void;
}

export function useLocalIsOpenDrawerLg(): Return {
  const [isOpenDrawerLg, isOpenDrawerLgMutate, removeIsOpenDrawerLg] =
    useLocalStorageState("isOpenDrawerLg", defaultIsOpenDrawerLg);

  return {
    localIsOpenDrawerLg: isOpenDrawerLg,
    updateLocalIsOpenDrawerLg: isOpenDrawerLgMutate,
    removeLocalIsOpenDrawerLg: removeIsOpenDrawerLg,
  };
}
