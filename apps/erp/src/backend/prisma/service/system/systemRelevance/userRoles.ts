import type { system_role as SystemRole } from "@prisma/client";
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
  data: SystemRole[];
  count: number;
}

export async function userRoles({
  locals,
  args: { isSkipDisable = false },
}: Params): Promise<Return> {
  const userId = locals.me?.id;
  const providerId = locals.me?.providerId;

  if (!providerId || !userId) {
    return { data: [], count: 0 };
  }

  if (isSuperAdmin(providerId)) {
    const systemRoles = await prisma.system_role.findMany({
      where: { enable: isSkipDisable ? true : undefined },
    });

    return { data: systemRoles, count: systemRoles.length };
  }

  const userRoleRelevances = await prisma.system_relevance.findMany({
    where: {
      type: SystemRelevanceTypeEnum.UserRole,
      first_id: userId,
    },
    select: {
      second_id: true,
    },
  });

  if (userRoleRelevances.length === 0) {
    return { data: [], count: 0 };
  }

  const userRoleIds = userRoleRelevances.map(
    (userRoleRelevance) => userRoleRelevance.second_id,
  );

  const systemUserRoles = await prisma.system_role.findMany({
    where: {
      id: { in: userRoleIds },
      enable: isSkipDisable ? true : undefined,
    },
  });

  return { data: systemUserRoles, count: systemUserRoles.length };
}
