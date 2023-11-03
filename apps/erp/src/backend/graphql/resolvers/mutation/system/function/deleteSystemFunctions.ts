import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import type {
  MutationDeleteSystemFunctionsArgs,
  DeleteSystemFunctionsResponse,
} from "@/backend/graphql/types";
import { deleteSystemFunctions as deleteSystemFunctionsService } from "@/backend/prisma/service/system/systemFunction/deleteSystemFunctions";

export const deleteSystemFunctions = graphqlResolverFactory<
  never,
  MutationDeleteSystemFunctionsArgs,
  DeleteSystemFunctionsResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.mutation.deleteSystemFunctions"],
})(async (source, args, context) => {
  const { ids } = args.input;
  const {
    res: { locals },
  } = context;

  const result = await deleteSystemFunctionsService({
    args: ids,
    locals,
  });

  return {
    ...responseConfig.success,
    result,
  };
});
