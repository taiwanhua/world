import type { Locals } from "@/backend/types/api/CustomResponse";
import { prisma } from "@/backend/prisma/prisma";

export interface Params {
  /** ids */
  args: string[];
  locals: Locals;
}

export interface Return {
  count: number;
}

export async function disableSystemFunctions({
  locals,
  args: ids,
}: Params): Promise<Return> {
  const updatedUser = locals.updatedUser;

  const { count } = await prisma.system_function.updateMany({
    where: {
      id: { in: ids },
    },
    data: {
      enable: false,
      updated_user: updatedUser,
    },
  });

  return { count };
}
