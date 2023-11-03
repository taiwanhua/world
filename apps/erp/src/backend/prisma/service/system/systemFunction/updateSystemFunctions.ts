// import { v4 as uuidv4 } from "uuid";
import type { Prisma, system_function as SystemFunction } from "@prisma/client";
import type { Locals } from "@/backend/types/api/CustomResponse";
import { prisma } from "@/backend/prisma/prisma";

export interface Params {
  args: Prisma.system_functionUpdateArgs | Prisma.system_functionUpdateArgs[];
  locals: Locals;
}

export interface Return {
  data: SystemFunction[];
  count: number;
}

export async function updateSystemFunctions({
  // locals,
  // args: { data, skipDuplicates },
  args,
}: Params): Promise<Return> {
  const res = await prisma.$transaction(async (tx) => {
    const argsList = Array.isArray(args) ? args : [args];

    const promises = argsList.map((arg) => tx.system_function.update(arg));

    const updateFunctions = await Promise.all(promises);
    return updateFunctions;
  });

  return { data: res, count: res.length };
}
