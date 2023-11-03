import { uniq } from "lodash-es";
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

export interface Return {
  data: string[];
  count: number;
}

export async function userMenuIds({
  locals,
  args: { isSkipDisable = false },
}: Params): Promise<Return> {
  const userId = locals.me?.id;
  const providerId = locals.me?.providerId;

  if (!providerId || !userId) {
    return { data: [], count: 0 };
  }

  if (isSuperAdmin(providerId)) {
    const allMenus = await prisma.system_menu.findMany({
      where: { enable: isSkipDisable ? true : undefined },
      select: { id: true },
    });

    return { data: allMenus.map((menu) => menu.id), count: allMenus.length };
  }

  const userRoles = await prisma.system_relevance.findMany({
    where: {
      type: SystemRelevanceTypeEnum.UserRole,
      first_id: userId,
    },
    select: { second_id: true },
  });

  if (userRoles.length === 0) {
    return { data: [], count: 0 };
  }

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

  const roleAndUserMenus = await prisma.system_relevance.findMany({
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

  const roleAndUserMenusIds = uniq(
    roleAndUserMenus.map((authRelevance) => authRelevance.second_id),
  );

  if (!isSkipDisable) {
    return { data: roleAndUserMenusIds, count: roleAndUserMenusIds.length };
  }

  if (roleAndUserMenus.length === 0) {
    return { data: [], count: 0 };
  }

  const userMenus = await prisma.system_menu.findMany({
    where: {
      id: { in: roleAndUserMenusIds },
      enable: true,
    },
    select: { id: true },
  });

  return {
    data: userMenus.map((authMenu) => authMenu.id),
    count: userMenus.length,
  };
}
