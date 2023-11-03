import type { system_role as PrismaSystemRole } from "@prisma/client";
import type { SystemRole } from "@/backend/graphql/types";

export function systemRoleParser(target: PrismaSystemRole): SystemRole {
  return {
    id: target.id,
    code: target.code,
    name: target.name,
    enable: target.enable,
    createdUser: target.created_user,
    createdDate: target.created_date,
    updatedUser: target.updated_user,
    updatedDate: target.updated_date,
  };
}
