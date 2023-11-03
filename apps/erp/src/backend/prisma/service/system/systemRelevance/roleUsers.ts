import { uniq } from "lodash-es";
import type { system_user as SystemUser } from "@prisma/client";
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
  data: SystemUser[];
  count: number;
}

export async function roleUsers({
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
    });

    return { data: allUsers, count: allUsers.length };
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

  if (roleUserFirstIds.length === 0) {
    return { data: [], count: 0 };
  }

  const systemRoleUsers = await prisma.system_user.findMany({
    where: {
      id: { in: roleUsersIds },
      enable: isSkipDisable ? true : undefined,
    },
  });

  return { data: systemRoleUsers, count: systemRoleUsers.length };
}
