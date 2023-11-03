import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import { systemRoleParser } from "@/backend/graphql/parsers/system/systemRoleParser";
import type {
  QuerySystemRoleSummaryArgs,
  QuerySystemRoleSummaryResponse,
} from "@/backend/graphql/types";
import { defaultPageLimit, defaultPageStart } from "@/backend/constant/value";
import { calculatePageAndPageCount } from "@/utils/calculate/calculatePageAndPageCount";
import { systemRoleSummary as systemRoleSummaryService } from "@/backend/prisma/service/system/systemRole/systemRoleSummary";

export const systemRoleSummary = graphqlResolverFactory<
  never,
  QuerySystemRoleSummaryArgs,
  QuerySystemRoleSummaryResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.query.systemRoleSummary"],
})(async (source, args, context) => {
  const { input } = args;
  const [limit, start] = [
    input.limit ?? defaultPageLimit,
    input.start ?? defaultPageStart,
  ];

  const {
    res: { locals },
  } = context;

  const userId = locals.me?.id;

  if (!userId) {
    return responseConfig.unauthorized;
  }

  const { data: systemRoles, count } = await systemRoleSummaryService({
    locals,
    args: input,
  });

  const { page, pageCount } = calculatePageAndPageCount({
    count,
    limit,
    start,
  });

  return {
    ...responseConfig.success,
    result: {
      count,
      pageCount,
      page,
      limit,
      start,
      data: systemRoles.map(systemRoleParser),
    },
  };
});
