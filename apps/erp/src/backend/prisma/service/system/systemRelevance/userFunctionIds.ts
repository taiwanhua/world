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

export async function userFunctionIds({
  locals,
  args: { isSkipDisable = false },
}: Params): Promise<Return> {
  const userId = locals.me?.id;
  const providerId = locals.me?.providerId;

  if (!providerId || !userId) {
    return { data: [], count: 0 };
  }

  if (isSuperAdmin(providerId)) {
    const allFunctions = await prisma.system_function.findMany({
      where: { enable: isSkipDisable ? true : undefined },
      select: { id: true },
    });

    return {
      data: allFunctions.map((systemFunction) => systemFunction.id),
      count: allFunctions.length,
    };
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

  const roleAndUserFunctionsIds = uniq(
    roleAndUserFunctions.map((authRelevance) => authRelevance.second_id),
  );

  if (!isSkipDisable) {
    return {
      data: roleAndUserFunctionsIds,
      count: roleAndUserFunctionsIds.length,
    };
  }

  if (roleAndUserFunctions.length === 0) {
    return { data: [], count: 0 };
  }

  const userFunctions = await prisma.system_function.findMany({
    where: {
      id: { in: roleAndUserFunctionsIds },
      enable: true,
    },
    select: {
      id: true,
    },
  });

  return {
    data: userFunctions.map(({ id }) => id),
    count: userFunctions.length,
  };
}
