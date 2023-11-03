import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import type {
  MutationDisableSystemMenusArgs,
  DisableSystemMenusResponse,
} from "@/backend/graphql/types";
import { disableSystemMenus as disableSystemMenusService } from "@/backend/prisma/service/system/systemMenu/disableSystemMenus";

export const disableSystemMenus = graphqlResolverFactory<
  never,
  MutationDisableSystemMenusArgs,
  DisableSystemMenusResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.mutation.disableSystemMenus"],
})(async (source, args, context) => {
  const { ids } = args.input;
  const {
    res: { locals },
  } = context;

  const result = await disableSystemMenusService({
    args: ids,
    locals,
  });

  return {
    ...responseConfig.success,
    result,
  };
});
