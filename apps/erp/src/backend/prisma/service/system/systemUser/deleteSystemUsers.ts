import type { Locals } from "@/backend/types/api/CustomResponse";
import { prisma } from "@/backend/prisma/prisma";
import { SystemRelevanceTypeEnum } from "@/backend/constant/value";

export interface Params {
  /** ids */
  args: string[];
  locals: Locals;
}

export interface Return {
  count: number;
}

export async function deleteSystemUsers({
  // locals,
  args: ids,
}: Params): Promise<Return> {
  const res = await prisma.$transaction(async (tx) => {
    await tx.system_relevance.deleteMany({
      where: {
        first_id: { in: ids },
        type: { in: [SystemRelevanceTypeEnum.UserRole] },
      },
    });

    const deleteUsers = await tx.system_user.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return deleteUsers;
  });

  return res;
}
