import { useCallback, useMemo } from "react";
import { generateTree } from "@/utils/generate/generateTree";
import { useRouter } from "@/frontend/hooks/router/useRouter";
import type {
  MenuTree,
  MenuWithChildren,
} from "@/frontend/hooks/graphql/system/check/useSystemMenusByToken";
import type { SystemMenusByTokenQuery } from "@/frontend/graphql/query/system/check/systemMenusByToken.type";
import { useMenusByTokenStore } from "../zustand/useMenusByTokenStore";

export interface Option {
  value: string;
  label: string;
}

export interface ServiceKeyConfig {
  serviceKeys: string[];
  serviceKeyOptions: Option[];
  serviceKeyMenus: NonNullable<
    SystemMenusByTokenQuery["systemMenusByToken"]["result"]
  >;
}

const findFirstIsNotWebPage = (
  menuTree: MenuTree,
): MenuWithChildren | undefined => {
  return menuTree.find((menu) => !menu.isWebPage);
};

export interface Return extends ServiceKeyConfig {
  serviceKey: string;
  serviceKeyMenu: MenuWithChildren | undefined;
  mutateServiceKey: (serviceKey: string) => void;
  pathnameForUpdate: string;
  getPathnameForUpdate: (serviceKey: string) => string;
}

export function useServiceKey(): Return {
  const { menusByToken, menusTreeByToken } = useMenusByTokenStore();

  const getPathnameForUpdate = useCallback(
    (serviceKey: string) => {
      if (!menusByToken || menusByToken.length === 0) {
        return "";
      }

      const showInMenus = menusByToken.filter((menu) => menu.showInMenu);

      const menuTree = generateTree(showInMenus, {
        dataField: null,
      }) as MenuTree;

      let currentMenuInWhile = findFirstIsNotWebPage(
        menuTree.find((menu) => menu.pathname === serviceKey)?.children ?? [],
      );
      let brotherMenuTree = menuTree;
      let pathnameForUpdate = `/${serviceKey}`;

      while (currentMenuInWhile && !currentMenuInWhile.isWebPage) {
        pathnameForUpdate = `${pathnameForUpdate}/${currentMenuInWhile.pathname}`;
        brotherMenuTree = currentMenuInWhile.children;
        currentMenuInWhile = findFirstIsNotWebPage(currentMenuInWhile.children);
      }

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (brotherMenuTree) {
        const webPagePathname = brotherMenuTree.find((menu) => menu.isWebPage)
          ?.pathname;
        pathnameForUpdate = webPagePathname
          ? `${pathnameForUpdate}/${webPagePathname}`
          : pathnameForUpdate;
      }

      return pathnameForUpdate;
    },
    [menusByToken],
  );

  const { serviceKeyMenus, serviceKeyOptions, serviceKeys } =
    useMemo<ServiceKeyConfig>(() => {
      const initialServiceKeyConfig = {
        serviceKeys: [],
        serviceKeyOptions: [],
        serviceKeyMenus: [],
      };

      if (!menusByToken) {
        return initialServiceKeyConfig;
      }
      const serviceKeyConfig = menusByToken.reduce<ServiceKeyConfig>(
        (accumulator, { parentId, pathname, name, showInMenu, isWebPage }) => {
          // showInMenu and isWebPage check is ServiceKey
          if (parentId === null && showInMenu && !isWebPage) {
            accumulator.serviceKeys.push(pathname);
            accumulator.serviceKeyMenus.push();
            accumulator.serviceKeyOptions.push({
              value: pathname,
              label: name,
            });
          }
          return accumulator;
        },
        initialServiceKeyConfig,
      );

      return serviceKeyConfig;
    }, [menusByToken]);

  const { pathname, asPath, mutate } = useRouter();

  const inUseServiceKey = useMemo(() => {
    let splittedPathname = pathname.split("/");

    if (splittedPathname[1] === "404") {
      splittedPathname = asPath.split("/");
    }
    const checkPathname = splittedPathname[1] ?? "";

    return serviceKeys.includes(checkPathname)
      ? checkPathname
      : serviceKeys[0] ?? "";
  }, [asPath, pathname, serviceKeys]);

  const serviceKeyMenu = useMemo(() => {
    return menusTreeByToken.find((menu) => menu.pathname === inUseServiceKey);
  }, [inUseServiceKey, menusTreeByToken]);

  const mutateServiceKey = useCallback(
    (serviceKey: string) => {
      mutate({
        mode: "push",
        pathnameForUpdate: getPathnameForUpdate(serviceKey),
      });
    },
    [getPathnameForUpdate, mutate],
  );

  const pathnameForUpdate = useMemo<string>(
    () => getPathnameForUpdate(inUseServiceKey),
    [getPathnameForUpdate, inUseServiceKey],
  );

  return {
    serviceKeyMenus,
    serviceKeyOptions,
    serviceKeys,
    serviceKey: inUseServiceKey,
    serviceKeyMenu,
    mutateServiceKey,
    pathnameForUpdate,
    getPathnameForUpdate,
  };
}
