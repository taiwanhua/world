import { v4 as uuidv4 } from "uuid";
import type { Prisma } from "@prisma/client";
import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import { systemMenuParser } from "@/backend/graphql/parsers/system/systemMenuParser";
import type {
  MutationCreateSystemMenusArgs,
  CreateSystemMenusResponse,
} from "@/backend/graphql/types";
import { createSystemMenus as createSystemMenusService } from "@/backend/prisma/service/system/systemMenu/createSystemMenus";

export const createSystemMenus = graphqlResolverFactory<
  never,
  MutationCreateSystemMenusArgs,
  CreateSystemMenusResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.mutation.createSystemMenus"],
})(async (source, args, context) => {
  const { dataList } = args.input;
  const {
    res: {
      locals,
      locals: { updatedUser },
    },
  } = context;

  const now = new Date();

  const { data: systemMenus } = await createSystemMenusService({
    locals,
    args: dataList.map<Prisma.system_menuCreateArgs>((data) => {
      return {
        data: {
          id: uuidv4(),
          cascade_id: data.cascadeId ?? "",
          name: data.name,
          pathname: data.pathname,
          icon: data.icon ?? "",
          show_in_menu: data.showInMenu,
          is_web_page: data.isWebPage,
          is_need_login: data.isNeedLogin,
          parent_id: data.parentId ?? undefined,
          table_memo: data.tableMemo ?? "",
          sort: data.sort,
          enable: data.enable,
          created_user: updatedUser,
          created_date: now,
          updated_user: updatedUser,
          updated_date: now,
        },
      };
    }),
  });

  return {
    ...responseConfig.success,
    result: systemMenus.map(systemMenuParser),
  };
});
