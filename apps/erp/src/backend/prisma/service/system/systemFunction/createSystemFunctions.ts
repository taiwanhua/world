// import { v4 as uuidv4 } from "uuid";
import type { Prisma, system_function as SystemFunction } from "@prisma/client";
import type { Locals } from "@/backend/types/api/CustomResponse";
import { prisma } from "@/backend/prisma/prisma";
import { isSuperAdmin } from "@/utils/api/isSuperAdmin";
import { assign } from "@/backend/prisma/service/system/systemRelevance/assign";
import { SystemRelevanceTypeEnum } from "@/backend/constant/value";

export interface Params {
  args: Prisma.system_functionCreateArgs | Prisma.system_functionCreateArgs[];
  locals: Locals;
}

export interface Return {
  data: SystemFunction[];
  count: number;
}

export async function createSystemFunctions({
  args,
  locals,
}: Params): Promise<Return> {
  const userId = locals.me?.id;
  const providerId = locals.me?.providerId;

  if (!providerId || !userId) {
    return { data: [], count: 0 };
  }

  const res = await prisma.$transaction(async (tx) => {
    const argsList = Array.isArray(args) ? args : [args];

    const promises = argsList.map((arg) => tx.system_function.create(arg));

    const createFunctions = await Promise.all(promises);

    if (isSuperAdmin(providerId)) {
      return createFunctions;
    }

    await assign({
      locals,
      args: {
        type: SystemRelevanceTypeEnum.UserFunction,
        firstIds: [userId],
        secondIds: createFunctions.map((systemFunction) => systemFunction.id),
        thirdIds: [],
      },
    });

    return createFunctions;
  });

  return { data: res, count: res.length };
}
