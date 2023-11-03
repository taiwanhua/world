import type { system_function as PrismaSystemFunction } from "@prisma/client";
import type { SystemFunction } from "@/backend/graphql/types";

export function systemFunctionParser(
  target: PrismaSystemFunction,
): SystemFunction {
  return {
    id: target.id,
    menuId: target.menu_id,
    name: target.name,
    showName: target.show_name,
    icon: target.icon,
    type: target.type,
    enable: target.enable,
    createdUser: target.created_user,
    createdDate: target.created_date,
    updatedUser: target.updated_user,
    updatedDate: target.updated_date,
  };
}
