import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import { systemRoleParser } from "@/backend/graphql/parsers/system/systemRoleParser";
import type { QuerySystemRolesByTokenResponse } from "@/backend/graphql/types";
import { userRoles } from "@/backend/prisma/service/system/systemRelevance/userRoles";

export const systemRolesByToken = graphqlResolverFactory<
  never,
  never,
  QuerySystemRolesByTokenResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.query.systemRolesByToken"],
})(async (source, args, context) => {
  const {
    res: { locals },
  } = context;

  const userId = locals.me?.id;

  if (!userId) {
    return responseConfig.unauthorized;
  }

  const { data: systemRoles } = await userRoles({
    locals,
    args: { isSkipDisable: true },
  });

  return {
    ...responseConfig.success,
    result: systemRoles.map(systemRoleParser),
  };
});
