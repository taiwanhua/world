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

export async function deleteSystemMenus({
  // locals,
  args: ids,
}: Params): Promise<Return> {
  const res = await prisma.$transaction(async (tx) => {
    const authFunctions = await tx.system_function.findMany({
      where: {
        menu_id: { in: ids },
      },
      select: { id: true },
    });

    const authFunctionIds = authFunctions.map(
      (authFunction) => authFunction.id,
    );

    await tx.system_relevance.deleteMany({
      where: {
        OR: [
          {
            second_id: {
              in: authFunctionIds,
            },
            type: {
              in: [
                SystemRelevanceTypeEnum.RoleFunction,
                SystemRelevanceTypeEnum.UserFunction,
              ],
            },
          },
          {
            second_id: { in: ids },
            type: {
              in: [
                SystemRelevanceTypeEnum.UserMenu,
                SystemRelevanceTypeEnum.UserFunction,
              ],
            },
          },
        ],
      },
    });

    const deleteMenus = await tx.system_menu.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return deleteMenus;
  });

  return res;
}
