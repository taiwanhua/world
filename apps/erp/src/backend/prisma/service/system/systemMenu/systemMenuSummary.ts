// import { v4 as uuidv4 } from "uuid";
import type {
  Prisma,
  system_menu as SystemMenu,
  system_function as SystemFunction,
} from "@prisma/client";
import { isNil, uniq } from "lodash-es";
import type { Locals } from "@/backend/types/api/CustomResponse";
import { prisma } from "@/backend/prisma/prisma";
import { defaultPageLimit, defaultPageStart } from "@/backend/constant/value";
import type { QuerySystemMenuSummaryInput } from "@/backend/graphql/types";
import { SystemRelevanceTypeEnum } from "@/backend/constant/value";
import { isSuperAdmin } from "@/utils/api/isSuperAdmin";

export interface Params {
  args: QuerySystemMenuSummaryInput;
  locals: Locals;
}

export interface Return {
  data: UserSystemMenu[];
  count: number;
}

export type UserSystemMenu = SystemMenu & {
  systemFunctions: SystemFunction[];
};

export async function systemMenuSummary({
  locals,
  args,
}: Params): Promise<Return> {
  const userId = locals.me?.id;
  const providerId = locals.me?.providerId;

  if (!providerId || !userId) {
    // never in, no permission
    return { data: [], count: 0 };
  }

  const { isByToken, keyword, enable, limit, start } = args;

  let count = 0;
  let systemMenus: SystemMenu[] = [];
  let systemFunctions: SystemFunction[] = [];

  let countArgs: Prisma.system_menuCountArgs = {
    where: {
      name: { startsWith: keyword ?? undefined },
      enable: { equals: isNil(enable) ? undefined : enable },
    },
  };

  const findManyArgs: Prisma.system_menuFindManyArgs = {
    ...(countArgs as Prisma.system_menuFindManyArgs),
    take: limit === 0 ? undefined : limit ?? defaultPageLimit,
    skip: start ?? defaultPageStart,
    orderBy: { sort: "asc" },
  };

  if (isSuperAdmin(providerId) || !isByToken) {
    [systemMenus, count, systemFunctions] = await prisma.$transaction([
      prisma.system_menu.findMany(findManyArgs),
      prisma.system_menu.count(countArgs),
      prisma.system_function.findMany(),
    ]);
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

    const checkSkipUserRoles = await prisma.system_role.findMany({
      where: {
        id: { in: userRoleIds },
        enable: true,
      },
    });

    checkSkipUserRoleIds = checkSkipUserRoles.map(({ id }) => id);

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
      select: { second_id: true },
    });

    if (roleAndUserMenuRelevances.length === 0) {
      return { data: [], count: 0 }; // if have no Menu Relevances, not keep send query to DB
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

    countArgs = {
      where: {
        id: { in: roleAndUserMenuIds },
        name: { startsWith: keyword ?? undefined },
        enable: { equals: isNil(enable) ? undefined : enable },
      },
    };

    [systemMenus, count, systemFunctions] = await prisma.$transaction([
      prisma.system_menu.findMany(findManyArgs),
      prisma.system_menu.count(countArgs),
      prisma.system_function.findMany({
        where: {
          id: { in: roleAndUserFunctionIds },
          enable: { equals: isNil(enable) ? undefined : enable },
        },
      }),
    ]);
  }

  const userSystemMenus = systemMenus.map<UserSystemMenu>((systemMenu) => {
    const filterSystemFunctions = systemFunctions.filter(
      (systemFunction) => systemFunction.menu_id === systemMenu.id,
    );

    return {
      ...systemMenu,
      systemFunctions: filterSystemFunctions,
    };
  });

  return { data: userSystemMenus, count };
}
