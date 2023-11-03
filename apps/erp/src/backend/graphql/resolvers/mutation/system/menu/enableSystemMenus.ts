import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import type {
  MutationEnableSystemMenusArgs,
  EnableSystemMenusResponse,
} from "@/backend/graphql/types";
import { enableSystemMenus as enableSystemMenusService } from "@/backend/prisma/service/system/systemMenu/enableSystemMenus";

export const enableSystemMenus = graphqlResolverFactory<
  never,
  MutationEnableSystemMenusArgs,
  EnableSystemMenusResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.mutation.enableSystemMenus"],
})(async (source, args, context) => {
  const { ids } = args.input;
  const {
    res: { locals },
  } = context;

  const result = await enableSystemMenusService({
    args: ids,
    locals,
  });

  return {
    ...responseConfig.success,
    result,
  };
});
