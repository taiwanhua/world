// import { v4 as uuidv4 } from "uuid";
import type { Prisma, system_menu as SystemMenu } from "@prisma/client";
import type { Locals } from "@/backend/types/api/CustomResponse";
import { prisma } from "@/backend/prisma/prisma";

export interface Params {
  args: Prisma.system_menuUpdateArgs | Prisma.system_menuUpdateArgs[];
  locals: Locals;
}

export interface Return {
  data: SystemMenu[];
  count: number;
}

export async function updateSystemMenus({
  // locals,
  // args: { data, skipDuplicates },
  args,
}: Params): Promise<Return> {
  const res = await prisma.$transaction(async (tx) => {
    const argsList = Array.isArray(args) ? args : [args];

    const promises = argsList.map((arg) => tx.system_menu.update(arg));

    const updateMenus = await Promise.all(promises);
    return updateMenus;
  });

  return { data: res, count: res.length };
}
