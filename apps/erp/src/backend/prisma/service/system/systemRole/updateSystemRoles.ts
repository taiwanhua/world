// import { v4 as uuidv4 } from "uuid";
import type { Prisma, system_role as SystemRole } from "@prisma/client";
import type { Locals } from "@/backend/types/api/CustomResponse";
import { prisma } from "@/backend/prisma/prisma";

export interface Params {
  args: Prisma.system_roleUpdateArgs | Prisma.system_roleUpdateArgs[];
  locals: Locals;
}

export interface Return {
  data: SystemRole[];
  count: number;
}

export async function updateSystemRoles({
  // locals,
  // args: { data, skipDuplicates },
  args,
}: Params): Promise<Return> {
  const res = await prisma.$transaction(async (tx) => {
    const argsList = Array.isArray(args) ? args : [args];

    const promises = argsList.map((arg) => tx.system_role.update(arg));

    const updateRoles = await Promise.all(promises);
    return updateRoles;
  });

  return { data: res, count: res.length };
}
