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

export async function deleteSystemRoles({
  // locals,
  args: ids,
}: Params): Promise<Return> {
  const res = await prisma.$transaction(async (tx) => {
    await tx.system_relevance.deleteMany({
      where: {
        OR: [
          {
            second_id: { in: ids },
            type: { in: [SystemRelevanceTypeEnum.UserRole] },
          },
          {
            first_id: { in: ids },
            type: {
              in: [
                SystemRelevanceTypeEnum.RoleMenu,
                SystemRelevanceTypeEnum.RoleFunction,
              ],
            },
          },
        ],
      },
    });

    const deleteRoles = await tx.system_role.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return deleteRoles;
  });

  return res;
}
