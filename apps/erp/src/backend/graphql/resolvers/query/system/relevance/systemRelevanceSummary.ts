import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import { systemRelevanceParser } from "@/backend/graphql/parsers/system/systemRelevanceParser";
import type {
  QuerySystemRelevanceSummaryArgs,
  QuerySystemRelevanceSummaryResponse,
} from "@/backend/graphql/types";
import { defaultPageLimit, defaultPageStart } from "@/backend/constant/value";
import { calculatePageAndPageCount } from "@/utils/calculate/calculatePageAndPageCount";
import { systemRelevanceSummary as systemRelevanceSummaryService } from "@/backend/prisma/service/system/systemRelevance/systemRelevanceSummary";

export const systemRelevanceSummary = graphqlResolverFactory<
  never,
  QuerySystemRelevanceSummaryArgs,
  QuerySystemRelevanceSummaryResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.query.systemRelevanceSummary"],
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

  const { data: systemRelevances, count } = await systemRelevanceSummaryService(
    {
      locals,
      args: input,
    },
  );

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
      data: systemRelevances.map(systemRelevanceParser),
    },
  };
});
