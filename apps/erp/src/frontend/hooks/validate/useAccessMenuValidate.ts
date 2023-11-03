"use client";

import { useMemo } from "react";
import type { SystemMenu } from "@/backend/graphql/types";
import { useMenusByTokenStore } from "@/frontend/hooks/zustand/useMenusByTokenStore";
import { useRouter } from "@/frontend/hooks/router/useRouter";

export interface MenuWithChildren extends SystemMenu {
  children: MenuWithChildren[];
}

export type MenuTree = MenuWithChildren[];

export interface InitialValidInfo {
  error: string | null;
  isValidated: boolean;
  currentMenus: MenuTree | undefined;
}

export type ValidatedInfo = Omit<InitialValidInfo, "currentMenus">;

export interface Return {
  menusByToken: SystemMenu[] | undefined;
  menusTreeByToken: MenuTree;
  validatedInfo: ValidatedInfo;
}

export function useAccessMenuValidate(): Return {
  const { pathname } = useRouter();

  const { menusByToken, menusTreeByToken } = useMenusByTokenStore();

  const validatedInfo = useMemo<ValidatedInfo>(() => {
    const initial: InitialValidInfo = {
      error: "Can not access Menu start from : ",
      isValidated: true,
      currentMenus: menusTreeByToken,
    };

    const { isValidated, error } = pathname
      .substring(1)
      .split("/")
      .reduce<InitialValidInfo>(
        ({ currentMenus, error: currentError }, currentValue, index, array) => {
          const isLastMenu = array.length === index + 1;

          const foundedMenu = (currentMenus ?? []).find(
            (menu) => menu.pathname === currentValue,
          );

          const isValidatedResult =
            Boolean(foundedMenu) ||
            (isLastMenu && foundedMenu?.isNeedLogin === false);

          return {
            error: `${currentError ?? "null"} > ${currentValue}`,
            isValidated: isValidatedResult,
            currentMenus: foundedMenu ? foundedMenu.children : undefined,
          };
        },
        initial,
      );

    return {
      isValidated,
      error: isValidated ? null : error,
    };
  }, [menusTreeByToken, pathname]);

  return {
    menusByToken,
    menusTreeByToken,
    validatedInfo,
  };
}
