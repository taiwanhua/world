import { create } from "zustand";
import { generatePermissionPath } from "@/utils/generate/generatePermissionPath";
import { generateTree } from "@/utils/generate/generateTree";
import type { MenuTree } from "@/frontend/hooks/validate/useAccessMenuValidate";
import type { SystemMenu } from "@/backend/graphql/types";
import type { PermissionPath } from "@/backend/constant/permission/spec";

interface Store {
  /** there is null means user is not login yet*/
  menusByToken: SystemMenu[] | undefined;
  /** is skip disable menu */
  menusTreeByToken: MenuTree;
  /** is skip disable menu and functions */
  functionsByToken: PermissionPath[];
  setMenusByToken: (menusByToken: SystemMenu[]) => void;
  removeMenusByToken: () => void;
}

export const useMenusByTokenStore = create<Store>((set) => ({
  menusByToken: undefined,
  menusTreeByToken: [],
  functionsByToken: [],
  setMenusByToken: (menusByToken): void =>
    set(() => {
      const enableMenusByToken = menusByToken.reduce<SystemMenu[]>(
        (accumulate, column) => {
          if (column.enable) {
            const systemFunctions = column.systemFunctions.filter(
              ({ enable }) => enable,
            );

            accumulate.push({ ...column, systemFunctions });
          }

          return accumulate;
        },
        [],
      );

      const menusTreeByToken = generateTree(
        menusByToken.filter(({ enable }) => enable),
        {
          dataField: null,
        },
      ) as MenuTree;
      const functionsByToken = generatePermissionPath(enableMenusByToken);

      return { menusByToken, menusTreeByToken, functionsByToken };
    }),
  removeMenusByToken: (): void =>
    set({ menusByToken: undefined, menusTreeByToken: [] }),
}));
