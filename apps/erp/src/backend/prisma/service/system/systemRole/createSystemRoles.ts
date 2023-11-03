// import { v4 as uuidv4 } from "uuid";
import type { Prisma, system_role as SystemRole } from "@prisma/client";
import type { Locals } from "@/backend/types/api/CustomResponse";
import { prisma } from "@/backend/prisma/prisma";
import { isSuperAdmin } from "@/utils/api/isSuperAdmin";
import { SystemRelevanceTypeEnum } from "@/backend/constant/value";
import { assign } from "../systemRelevance/assign";

export interface Params {
  args: Prisma.system_roleCreateArgs | Prisma.system_roleCreateArgs[];
  locals: Locals;
}

export interface Return {
  data: SystemRole[];
  count: number;
}

export async function createSystemRoles({
  locals,
  args,
}: Params): Promise<Return> {
  const userId = locals.me?.id;
  const providerId = locals.me?.providerId;
  // const updatedUser = locals.updatedUser;

  if (!providerId || !userId) {
    // never in, no permission
    return { data: [], count: 0 };
  }

  const res = await prisma.$transaction(async (tx) => {
    const argsList = Array.isArray(args) ? args : [args];

    const promises = argsList.map((arg) => tx.system_role.create(arg));

    const createRoles = await Promise.all(promises);

    if (isSuperAdmin(providerId)) {
      return createRoles;
    }

    await assign({
      locals,
      args: {
        type: SystemRelevanceTypeEnum.UserRole,
        firstIds: [userId],
        secondIds: createRoles.map((createRole) => createRole.id),
        thirdIds: [],
      },
    });

    return createRoles;
  });

  return { data: res, count: res.length };
}
