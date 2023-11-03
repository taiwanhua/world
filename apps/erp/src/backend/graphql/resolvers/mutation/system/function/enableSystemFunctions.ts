import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import type {
  MutationDisableSystemFunctionsArgs,
  DisableSystemFunctionsResponse,
} from "@/backend/graphql/types";
import { enableSystemFunctions as enableSystemFunctionsService } from "@/backend/prisma/service/system/systemFunction/enableSystemFunctions";

export const enableSystemFunctions = graphqlResolverFactory<
  never,
  MutationDisableSystemFunctionsArgs,
  DisableSystemFunctionsResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.mutation.enableSystemFunctions"],
})(async (source, args, context) => {
  const { ids } = args.input;
  const {
    res: { locals },
  } = context;

  const result = await enableSystemFunctionsService({
    args: ids,
    locals,
  });

  return {
    ...responseConfig.success,
    result,
  };
});
