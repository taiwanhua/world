import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import { systemMenuParser } from "@/backend/graphql/parsers/system/systemMenuParser";
import { systemFunctionParser } from "@/backend/graphql/parsers/system/systemFunctionParser";
import type {
  QuerySystemMenuSummaryArgs,
  QuerySystemMenuSummaryResponse,
} from "@/backend/graphql/types";
import { defaultPageLimit, defaultPageStart } from "@/backend/constant/value";
import { systemMenuSummary as systemMenuSummaryService } from "@/backend/prisma/service/system/systemMenu/systemMenuSummary";
import { calculatePageAndPageCount } from "@/utils/calculate/calculatePageAndPageCount";

export const systemMenuSummary = graphqlResolverFactory<
  never,
  QuerySystemMenuSummaryArgs,
  QuerySystemMenuSummaryResponse
>({ requirePermissionPaths: ["wowgo.api.graphql.query.systemMenuSummary"] })(
  async (source, args, context) => {
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

    const { data: systemMenus, count } = await systemMenuSummaryService({
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
        data: systemMenus.map((systemMenu) => {
          return {
            ...systemMenuParser(systemMenu),
            systemFunctions:
              systemMenu.systemFunctions.map(systemFunctionParser),
          };
        }),
      },
    };
  },
);
