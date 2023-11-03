import type {
  system_menu as PrismaSystemMenu,
  system_function as PrismaSystemFunction,
} from "@prisma/client";
import type { SystemMenu } from "@/backend/graphql/types";
import { systemFunctionParser } from "./systemFunctionParser";

export type PrismaSystemMenuRelation = PrismaSystemMenu & {
  systemFunctions?: PrismaSystemFunction[];
};

export function systemMenuParser(target: PrismaSystemMenuRelation): SystemMenu {
  const result: SystemMenu = {
    id: target.id,
    cascadeId: target.cascade_id,
    name: target.name,
    pathname: target.pathname,
    icon: target.icon,
    showInMenu: target.show_in_menu,
    isWebPage: target.is_web_page,
    isNeedLogin: target.is_need_login,
    parentId: target.parent_id,
    tableMemo: target.table_memo,
    sort: target.sort,
    enable: target.enable,
    createdUser: target.created_user,
    createdDate: target.created_date,
    updatedUser: target.updated_user,
    updatedDate: target.updated_date,
    systemFunctions: (target.systemFunctions ?? []).map(systemFunctionParser),
  };

  return result;
}
