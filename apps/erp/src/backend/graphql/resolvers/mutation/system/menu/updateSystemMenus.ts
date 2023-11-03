import type { Prisma } from "@prisma/client";
import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import { systemMenuParser } from "@/backend/graphql/parsers/system/systemMenuParser";
import type {
  MutationUpdateSystemMenusArgs,
  UpdateSystemMenusResponse,
} from "@/backend/graphql/types";
import { updateSystemMenus as updateSystemMenusService } from "@/backend/prisma/service/system/systemMenu/updateSystemMenus";

export const updateSystemMenus = graphqlResolverFactory<
  never,
  MutationUpdateSystemMenusArgs,
  UpdateSystemMenusResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.mutation.updateSystemMenus"],
})(async (source, args, context) => {
  const { dataList } = args.input;
  const {
    res: {
      locals,
      locals: { updatedUser },
    },
  } = context;

  const now = new Date();

  const { data: systemMenus } = await updateSystemMenusService({
    locals,
    args: dataList.map<Prisma.system_menuUpdateArgs>((data) => {
      return {
        where: { id: data.id },
        data: {
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
          // created_user: updatedUser,
          // created_date: now,
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
