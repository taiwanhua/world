import { uniq } from "lodash-es";
import type { system_function as SystemFunction } from "@prisma/client";
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
  data: SystemFunction[];
  count: number;
}

export async function userFunctions({
  locals,
  args: { isSkipDisable = false },
}: Params): Promise<Return> {
  const userId = locals.me?.id;
  const providerId = locals.me?.providerId;

  if (!providerId || !userId) {
    return { data: [], count: 0 };
  }

  if (isSuperAdmin(providerId)) {
    const allUsers = await prisma.system_function.findMany({
      where: { enable: isSkipDisable ? true : undefined },
    });

    return { data: allUsers, count: allUsers.length };
  }

  const userRoles = await prisma.system_relevance.findMany({
    where: { type: SystemRelevanceTypeEnum.UserRole, first_id: userId },
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

  const roleAndUserFunctions = await prisma.system_relevance.findMany({
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
    select: {
      second_id: true,
    },
  });

  if (roleAndUserFunctions.length === 0) {
    return { data: [], count: 0 };
  }

  const userFunctionsIds = uniq(
    roleAndUserFunctions.map((roleFunction) => roleFunction.second_id),
  );

  const systemUserFunctions = await prisma.system_function.findMany({
    where: {
      id: { in: userFunctionsIds },
      enable: isSkipDisable ? true : undefined,
    },
  });

  return { data: systemUserFunctions, count: systemUserFunctions.length };
}
