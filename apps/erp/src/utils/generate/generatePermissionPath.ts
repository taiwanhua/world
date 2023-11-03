import type { SystemMenu } from "@/backend/graphql/types";
import { generateTree, defaultConfig } from "./generateTree";

export type MenuTree = SystemMenu & {
  children: MenuTree[];
};

export function getFunctionsInMenu<T = string>(
  node: MenuTree | MenuTree[],
  parentPathname: string,
  functionsInMenu: T[],
): void {
  if (Array.isArray(node)) {
    node.forEach((menu) => {
      getFunctionsInMenu(menu, parentPathname, functionsInMenu);
    });
  } else {
    const { systemFunctions, children, pathname, parentId } = node;
    const currentPathname = parentId
      ? `${parentPathname}.${pathname}`
      : pathname;
    systemFunctions.forEach((systemFunction) => {
      functionsInMenu.push(`${currentPathname}.${systemFunction.name}` as T);
    });
    getFunctionsInMenu(children, currentPathname, functionsInMenu);
  }
}

export function generatePermissionPath<T = string>(
  systemMenus: SystemMenu[],
): T[] {
  const menuTrees = generateTree(systemMenus, {
    ...defaultConfig,
    dataField: null,
  }) as MenuTree[];
  const context: T[] = [];
  getFunctionsInMenu(menuTrees, "", context);

  return context;
}
