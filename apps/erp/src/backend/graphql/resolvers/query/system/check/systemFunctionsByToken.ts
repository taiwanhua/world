import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import { systemFunctionParser } from "@/backend/graphql/parsers/system/systemFunctionParser";
import type { QuerySystemFunctionsByTokenResponse } from "@/backend/graphql/types";
import { userFunctions } from "@/backend/prisma/service/system/systemRelevance/userFunctions";

export const systemFunctionsByToken = graphqlResolverFactory<
  never,
  never,
  QuerySystemFunctionsByTokenResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.query.systemFunctionsByToken"],
})(async (source, args, context) => {
  const {
    res: { locals },
  } = context;

  const userId = locals.me?.id;

  if (!userId) {
    return responseConfig.unauthorized;
  }

  const { data: systemFunctions } = await userFunctions({
    locals,
    args: { isSkipDisable: true },
  });

  return {
    ...responseConfig.success,
    result: systemFunctions.map(systemFunctionParser),
  };
});
