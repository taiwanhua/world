import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import type {
  MutationDeleteSystemUsersArgs,
  DeleteSystemUsersResponse,
} from "@/backend/graphql/types";
import { deleteSystemUsers as deleteSystemUsersService } from "@/backend/prisma/service/system/systemUser/deleteSystemUsers";

export const deleteSystemUsers = graphqlResolverFactory<
  never,
  MutationDeleteSystemUsersArgs,
  DeleteSystemUsersResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.mutation.deleteSystemUsers"],
})(async (source, args, context) => {
  const { ids } = args.input;
  const {
    res: { locals },
  } = context;

  const result = await deleteSystemUsersService({
    args: ids,
    locals,
  });

  return {
    ...responseConfig.success,
    result,
  };
});
