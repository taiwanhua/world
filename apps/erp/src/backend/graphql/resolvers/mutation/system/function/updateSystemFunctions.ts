import type { Prisma } from "@prisma/client";
import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import { systemFunctionParser } from "@/backend/graphql/parsers/system/systemFunctionParser";
import type {
  MutationUpdateSystemFunctionsArgs,
  UpdateSystemFunctionsResponse,
} from "@/backend/graphql/types";
import { updateSystemFunctions as updateSystemFunctionsService } from "@/backend/prisma/service/system/systemFunction/updateSystemFunctions";

export const updateSystemFunctions = graphqlResolverFactory<
  never,
  MutationUpdateSystemFunctionsArgs,
  UpdateSystemFunctionsResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.mutation.updateSystemFunctions"],
})(async (source, args, context) => {
  const { dataList } = args.input;
  const {
    res: {
      locals,
      locals: { updatedUser },
    },
  } = context;

  const now = new Date();

  const { data: systemFunctions } = await updateSystemFunctionsService({
    locals,
    args: dataList.map<Prisma.system_functionUpdateArgs>((data) => {
      const { id, enable, icon, name, showName, type, menuId } = data;
      return {
        where: { id },
        data: {
          enable,
          icon: icon ?? null,
          name,
          menu_id: menuId,
          show_name: showName,
          type,
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
    result: systemFunctions.map(systemFunctionParser),
  };
});
