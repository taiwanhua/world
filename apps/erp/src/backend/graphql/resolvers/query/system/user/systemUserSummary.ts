import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import { systemUserParser } from "@/backend/graphql/parsers/system/systemUserParser";
import type {
  QuerySystemUserSummaryArgs,
  QuerySystemUserSummaryResponse,
} from "@/backend/graphql/types";
import { defaultPageLimit, defaultPageStart } from "@/backend/constant/value";
import { calculatePageAndPageCount } from "@/utils/calculate/calculatePageAndPageCount";
import { systemUserSummary as systemUserSummaryService } from "@/backend/prisma/service/system/systemUser/systemUserSummary";

export const systemUserSummary = graphqlResolverFactory<
  never,
  QuerySystemUserSummaryArgs,
  QuerySystemUserSummaryResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.query.systemUserSummary"],
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

  const { data: systemUsers, count } = await systemUserSummaryService({
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
      data: systemUsers.map(systemUserParser),
    },
  };
});
