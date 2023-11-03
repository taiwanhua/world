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

export async function userRoleIds({
  locals,
  args: { isSkipDisable = false },
}: Params): Promise<Return> {
  const userId = locals.me?.id;
  const providerId = locals.me?.providerId;

  if (!providerId || !userId) {
    return { data: [], count: 0 };
  }

  if (isSuperAdmin(providerId)) {
    const allRoles = await prisma.system_role.findMany({
      where: { enable: isSkipDisable ? true : undefined },
      select: { id: true },
    });
    return { data: allRoles.map((role) => role.id), count: allRoles.length };
  }

  const userRoleRelevances = await prisma.system_relevance.findMany({
    where: {
      type: SystemRelevanceTypeEnum.UserRole,
      first_id: userId,
    },
    select: { second_id: true },
  });

  const systemUserRoleIds = userRoleRelevances.map(
    (authRelevance) => authRelevance.second_id,
  );

  if (!isSkipDisable) {
    return { data: systemUserRoleIds, count: systemUserRoleIds.length };
  }

  if (userRoleRelevances.length === 0) {
    return { data: [], count: 0 };
  }

  const systemUserRoles = await prisma.system_role.findMany({
    where: {
      id: { in: systemUserRoleIds },
      enable: true,
    },
    select: { id: true },
  });

  return {
    data: systemUserRoles.map(({ id }) => id),
    count: systemUserRoles.length,
  };
}
