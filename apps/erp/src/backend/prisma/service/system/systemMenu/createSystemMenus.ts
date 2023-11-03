// import { v4 as uuidv4 } from "uuid";
import type { Prisma, system_menu as SystemMenu } from "@prisma/client";
import type { Locals } from "@/backend/types/api/CustomResponse";
import { prisma } from "@/backend/prisma/prisma";
import { isSuperAdmin } from "@/utils/api/isSuperAdmin";
import { SystemRelevanceTypeEnum } from "@/backend/constant/value";
import { assign } from "../systemRelevance/assign";

export interface Params {
  args: Prisma.system_menuCreateArgs | Prisma.system_menuCreateArgs[];
  locals: Locals;
}

export interface Return {
  data: SystemMenu[];
  count: number;
}

export async function createSystemMenus({
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

    const promises = argsList.map((arg) => tx.system_menu.create(arg));

    const createMenus = await Promise.all(promises);

    if (isSuperAdmin(providerId)) {
      return createMenus;
    }

    await assign({
      locals,
      args: {
        type: SystemRelevanceTypeEnum.UserMenu,
        firstIds: [userId],
        secondIds: createMenus.map((createMenu) => createMenu.id),
        thirdIds: [],
      },
    });

    return createMenus;
  });

  return { data: res, count: res.length };
}
