import { v4 as uuidv4 } from "uuid";
import type { Prisma } from "@prisma/client";
import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import { systemFunctionParser } from "@/backend/graphql/parsers/system/systemFunctionParser";
import type {
  MutationCreateSystemFunctionsArgs,
  CreateSystemFunctionsResponse,
} from "@/backend/graphql/types";
import { createSystemFunctions as createSystemFunctionsService } from "@/backend/prisma/service/system/systemFunction/createSystemFunctions";

export const createSystemFunctions = graphqlResolverFactory<
  never,
  MutationCreateSystemFunctionsArgs,
  CreateSystemFunctionsResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.mutation.createSystemFunctions"],
})(async (source, args, context) => {
  const { dataList } = args.input;
  const {
    res: {
      locals,
      locals: { updatedUser },
    },
  } = context;

  const now = new Date();

  const { data: systemFunctions } = await createSystemFunctionsService({
    locals,
    args: dataList.map<Prisma.system_functionCreateArgs>((data) => {
      const { enable, icon, name, showName, type, menuId } = data;
      return {
        data: {
          id: uuidv4(),
          enable,
          icon: icon ?? null,
          name,
          menu_id: menuId,
          show_name: showName,
          type,
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
    result: systemFunctions.map(systemFunctionParser),
  };
});
