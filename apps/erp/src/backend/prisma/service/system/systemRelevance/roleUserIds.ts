import { uniq } from "lodash-es";
import type { Locals } from "@/backend/types/api/CustomResponse";
import { prisma } from "@/backend/prisma/prisma";
import { SystemRelevanceTypeEnum } from "@/backend/constant/value";
import { isSuperAdmin } from "@/utils/api/isSuperAdmin";

interface Args {
  roleIds: string[];
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

export async function roleUserIds({
  locals,
  args: { isSkipDisable = false, roleIds },
}: Params): Promise<Return> {
  const userId = locals.me?.id;
  const providerId = locals.me?.providerId;

  if (!providerId || !userId) {
    return { data: [], count: 0 };
  }

  if (isSuperAdmin(providerId) && roleIds.length === 0) {
    const allUsers = await prisma.system_user.findMany({
      where: { enable: isSkipDisable ? true : undefined },
      select: {
        id: true,
      },
    });

    return { data: allUsers.map((user) => user.id), count: allUsers.length };
  }

  const roleUserFirstIds = await prisma.system_relevance.findMany({
    where: {
      type: SystemRelevanceTypeEnum.UserRole,
      second_id: { in: roleIds },
    },
    select: {
      first_id: true,
    },
  });

  const roleUsersIds = uniq(
    roleUserFirstIds.map((relevance) => relevance.first_id),
  );

  if (!isSkipDisable) {
    return { data: roleUsersIds, count: roleUsersIds.length };
  }

  if (roleUserFirstIds.length === 0) {
    return { data: [], count: 0 };
  }

  const roleUsers = await prisma.system_user.findMany({
    where: {
      id: { in: roleUsersIds },
      enable: true,
    },
    select: {
      id: true,
    },
  });

  return { data: roleUsers.map(({ id }) => id), count: roleUsers.length };
}
