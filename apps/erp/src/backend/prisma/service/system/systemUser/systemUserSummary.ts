// import { v4 as uuidv4 } from "uuid";
import type { Prisma, system_user as SystemUser } from "@prisma/client";
import { isNil } from "lodash-es";
import type { Locals } from "@/backend/types/api/CustomResponse";
import { prisma } from "@/backend/prisma/prisma";
import {
  defaultPageLimit,
  defaultPageStart,
  SystemRelevanceTypeEnum,
} from "@/backend/constant/value";
import type { QuerySystemUserSummaryInput } from "@/backend/graphql/types";

export interface Params {
  args: QuerySystemUserSummaryInput;
  locals: Locals;
}

export interface Return {
  data: SystemUser[];
  count: number;
}

export async function systemUserSummary({
  locals,
  args,
}: Params): Promise<Return> {
  const userId = locals.me?.id;
  const providerId = locals.me?.providerId;

  if (!providerId || !userId) {
    // never in, no permission
    return { data: [], count: 0 };
  }

  const { keyword, roleIds: argsRoleIds, enable, limit, start } = args;

  const roleIds =
    isNil(argsRoleIds) || argsRoleIds.length === 0 ? undefined : argsRoleIds;

  let usersByRoleIds: string[] = [];

  if (roleIds) {
    const usersByRole = await prisma.system_relevance.findMany({
      select: {
        first_id: true,
      },
      where: {
        type: SystemRelevanceTypeEnum.UserRole,
        second_id: { in: roleIds },
      },
    });

    if (usersByRole.length === 0) {
      return { data: [], count: 0 };
    }

    usersByRoleIds = usersByRole.map(({ first_id: firstId }) => firstId);
  }

  const countArgs: Prisma.system_userCountArgs = {
    where: {
      id: { in: roleIds ? usersByRoleIds : undefined },
      email: { startsWith: keyword ?? undefined },
      enable: { equals: isNil(enable) ? undefined : enable },
    },
  };

  const findManyArgs: Prisma.system_userFindManyArgs = {
    ...(countArgs as Prisma.system_userFindManyArgs),
    take: limit === 0 ? undefined : limit ?? defaultPageLimit,
    skip: start ?? defaultPageStart,
  };

  const [systemUsers, count] = await prisma.$transaction([
    prisma.system_user.findMany(findManyArgs),
    prisma.system_user.count(countArgs),
  ]);

  return { data: systemUsers, count };
}
