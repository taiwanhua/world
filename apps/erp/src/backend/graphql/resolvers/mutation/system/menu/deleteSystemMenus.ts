import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import type {
  MutationDeleteSystemMenusArgs,
  DeleteSystemMenusResponse,
} from "@/backend/graphql/types";
import { deleteSystemMenus as deleteSystemMenusService } from "@/backend/prisma/service/system/systemMenu/deleteSystemMenus";

export const deleteSystemMenus = graphqlResolverFactory<
  never,
  MutationDeleteSystemMenusArgs,
  DeleteSystemMenusResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.mutation.deleteSystemMenus"],
})(async (source, args, context) => {
  const { ids } = args.input;
  const {
    res: { locals },
  } = context;

  const result = await deleteSystemMenusService({
    args: ids,
    locals,
  });

  return {
    ...responseConfig.success,
    result,
  };
});
