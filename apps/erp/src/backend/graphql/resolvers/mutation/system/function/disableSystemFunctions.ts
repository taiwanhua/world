import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import type {
  MutationDisableSystemFunctionsArgs,
  DisableSystemFunctionsResponse,
} from "@/backend/graphql/types";
import { disableSystemFunctions as disableSystemFunctionsService } from "@/backend/prisma/service/system/systemFunction/disableSystemFunctions";

export const disableSystemFunctions = graphqlResolverFactory<
  never,
  MutationDisableSystemFunctionsArgs,
  DisableSystemFunctionsResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.mutation.disableSystemFunctions"],
})(async (source, args, context) => {
  const { ids } = args.input;
  const {
    res: { locals },
  } = context;

  const result = await disableSystemFunctionsService({
    args: ids,
    locals,
  });

  return {
    ...responseConfig.success,
    result,
  };
});
