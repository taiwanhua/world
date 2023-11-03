import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import { systemFunctionParser } from "@/backend/graphql/parsers/system/systemFunctionParser";
import { systemMenuParser } from "@/backend/graphql/parsers/system/systemMenuParser";
import type {
  QuerySystemMenusByTokenArgs,
  QuerySystemMenusByTokenResponse,
} from "@/backend/graphql/types";
import { userMenus } from "@/backend/prisma/service/system/systemRelevance/userMenus";

export const systemMenusByToken = graphqlResolverFactory<
  never,
  QuerySystemMenusByTokenArgs,
  QuerySystemMenusByTokenResponse
>({ requirePermissionPaths: [] })(async (source, args, context) => {
  const {
    res: { locals },
  } = context;

  const {
    input: { isSkipDisable },
  } = args;

  // not check login
  // const userId = locals.me?.id;

  // if (!userId) {
  //   return responseConfig.unauthorized;
  // }

  const { data: systemMenus } = await userMenus({
    locals,
    args: { isSkipDisable: isSkipDisable ?? true },
  });

  return {
    ...responseConfig.success,
    result: systemMenus.map((systemMenu) => {
      return {
        ...systemMenuParser(systemMenu),
        systemFunctions: systemMenu.systemFunctions.map(systemFunctionParser),
      };
    }),
  };
});
