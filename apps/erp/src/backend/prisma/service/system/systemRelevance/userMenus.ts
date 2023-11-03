import { uniq } from "lodash-es";
import type {
  system_menu as SystemMenu,
  system_function as SystemFunction,
} from "@prisma/client";
import type { Locals } from "@/backend/types/api/CustomResponse";
import { prisma } from "@/backend/prisma/prisma";
import { SystemRelevanceTypeEnum } from "@/backend/constant/value";
import { isSuperAdmin } from "@/utils/api/isSuperAdmin";

interface Args {
  isSkipDisable?: boolean;
}

export interface Params {
  args: Args;
  locals: Locals;
}

export type UserSystemMenu = SystemMenu & {
  systemFunctions: SystemFunction[];
};

export interface Return {
  data: UserSystemMenu[];
  count: number;
}

export async function userMenus({
  locals,
  args: { isSkipDisable = false },
}: Params): Promise<Return> {
  const userId = locals.me?.id;
  const providerId = locals.me?.providerId;

  if (!providerId || !userId) {
    const unLoginSystemMenus = await prisma.system_menu.findMany({
      where: { enable: isSkipDisable ? true : undefined, is_need_login: false },
      orderBy: { sort: "asc" },
    });

    return {
      data: unLoginSystemMenus.map<UserSystemMenu>((menu) => {
        return { ...menu, systemFunctions: [] };
      }),
      count: 0,
    };
  }

  let systemMenus: SystemMenu[] = [];
  let systemFunctions: SystemFunction[] = [];

  if (isSuperAdmin(providerId)) {
    systemMenus = await prisma.system_menu.findMany({
      where: { enable: isSkipDisable ? true : undefined },
      orderBy: { sort: "asc" },
    });

    systemFunctions = await prisma.system_function.findMany({
      where: { enable: isSkipDisable ? true : undefined },
    });
  } else {
    const userRoles = await prisma.system_relevance.findMany({
      where: {
        type: SystemRelevanceTypeEnum.UserRole,
        first_id: userId,
      },
      select: { second_id: true },
    });

    const userRoleIds = userRoles.map((userRole) => userRole.second_id);

    let checkSkipUserRoleIds: string[] = userRoleIds;

    if (isSkipDisable) {
      const checkSkipUserRoles = await prisma.system_role.findMany({
        where: {
          id: { in: userRoleIds },
          enable: true,
        },
      });

      checkSkipUserRoleIds = checkSkipUserRoles.map(({ id }) => id);
    }

    const roleAndUserMenuRelevances = await prisma.system_relevance.findMany({
      where: {
        OR: [
          {
            type: SystemRelevanceTypeEnum.RoleMenu,
            first_id: { in: checkSkipUserRoleIds },
          },
          { type: SystemRelevanceTypeEnum.UserMenu, first_id: userId },
        ],
      },
      select: {
        second_id: true,
      },
    });

    if (roleAndUserMenuRelevances.length === 0) {
      return { data: [], count: 0 };
    }

    const roleAndUserMenuIds = uniq(
      roleAndUserMenuRelevances.map(
        (systemRelevance) => systemRelevance.second_id,
      ),
    );

    const roleAndUserFunctionRelevances =
      await prisma.system_relevance.findMany({
        where: {
          OR: [
            {
              type: SystemRelevanceTypeEnum.RoleFunction,
              first_id: { in: checkSkipUserRoleIds },
            },
            {
              type: SystemRelevanceTypeEnum.UserFunction,
              first_id: userId,
            },
          ],
        },
        select: { second_id: true },
      });

    const roleAndUserFunctionIds = uniq(
      roleAndUserFunctionRelevances.map(
        (roleAndUserFunctionRelevance) =>
          roleAndUserFunctionRelevance.second_id,
      ),
    );

    systemMenus = await prisma.system_menu.findMany({
      where: {
        id: { in: roleAndUserMenuIds },
        enable: isSkipDisable ? true : undefined,
      },
      orderBy: {
        sort: "asc",
      },
    });

    systemFunctions = await prisma.system_function.findMany({
      where: {
        id: { in: roleAndUserFunctionIds },
        enable: isSkipDisable ? true : undefined,
      },
    });
  }

  const userSystemMenus = systemMenus.map<UserSystemMenu>((menu) => {
    const matchSystemFunctions = systemFunctions.filter(
      (functionItem) => functionItem.menu_id === menu.id,
    );

    return {
      ...menu,
      systemFunctions: matchSystemFunctions,
    };
  });

  return { data: userSystemMenus, count: userSystemMenus.length };
}
