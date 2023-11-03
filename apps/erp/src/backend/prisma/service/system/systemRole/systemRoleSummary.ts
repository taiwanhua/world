// import { v4 as uuidv4 } from "uuid";
import type { Prisma, system_role as SystemRole } from "@prisma/client";
import { isNil } from "lodash-es";
import type { Locals } from "@/backend/types/api/CustomResponse";
import { prisma } from "@/backend/prisma/prisma";
import {
  defaultPageLimit,
  defaultPageStart,
  SystemRelevanceTypeEnum,
} from "@/backend/constant/value";
import type { QuerySystemRoleSummaryInput } from "@/backend/graphql/types";
import { isSuperAdmin } from "@/utils/api/isSuperAdmin";

export interface Params {
  args: QuerySystemRoleSummaryInput;
  locals: Locals;
}

export interface Return {
  data: SystemRole[];
  count: number;
}

export async function systemRoleSummary({
  locals,
  args,
}: Params): Promise<Return> {
  const userId = locals.me?.id;
  const providerId = locals.me?.providerId;

  if (!providerId || !userId) {
    // never in, no permission
    return { data: [], count: 0 };
  }

  const { isByToken, userIds, keyword, enable, limit, start } = args;

  let rolesByUserIds: string[] = [];

  if (userIds || !isSuperAdmin(providerId)) {
    const rolesByUser = await prisma.system_relevance.findMany({
      where: {
        type: SystemRelevanceTypeEnum.UserRole,
        first_id: userIds ? { in: userIds } : userId, //have userIds means must be the role binding user for roleByUser needs
      },
      select: {
        second_id: true,
      },
    });

    if (rolesByUser.length === 0 && !isSuperAdmin(providerId)) {
      return { data: [], count: 0 };
    }

    rolesByUserIds = rolesByUser.map(({ second_id: secondId }) => secondId);
  }

  let countArgs: Prisma.system_roleCountArgs = {
    where: {
      id: { in: userIds ? rolesByUserIds : undefined },
      name: { startsWith: keyword ?? undefined },
      enable: { equals: isNil(enable) ? undefined : enable },
    },
  };

  const findManyArgs: Prisma.system_roleFindManyArgs = {
    ...(countArgs as Prisma.system_roleFindManyArgs),
    take: limit === 0 ? undefined : limit ?? defaultPageLimit,
    skip: start ?? defaultPageStart,
  };

  if (isSuperAdmin(providerId) || !isByToken) {
    const [systemRoles, count] = await prisma.$transaction([
      prisma.system_role.findMany(findManyArgs),
      prisma.system_role.count(countArgs),
    ]);

    return { data: systemRoles, count };
  }

  countArgs = {
    where: {
      id: { in: rolesByUserIds },
      name: { startsWith: keyword ?? undefined },
      enable: { equals: isNil(enable) ? undefined : enable },
    },
  };

  const [systemRoles, count] = await prisma.$transaction([
    prisma.system_role.findMany(findManyArgs),
    prisma.system_role.count(countArgs),
  ]);

  return { data: systemRoles, count };
}
