import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import type {
  MutationDeleteSystemRolesArgs,
  DeleteSystemRolesResponse,
} from "@/backend/graphql/types";
import { deleteSystemRoles as deleteSystemRolesService } from "@/backend/prisma/service/system/systemRole/deleteSystemRoles";

export const deleteSystemRoles = graphqlResolverFactory<
  never,
  MutationDeleteSystemRolesArgs,
  DeleteSystemRolesResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.mutation.deleteSystemRoles"],
})(async (source, args, context) => {
  const { ids } = args.input;
  const {
    res: { locals },
  } = context;

  const result = await deleteSystemRolesService({
    args: ids,
    locals,
  });

  return {
    ...responseConfig.success,
    result,
  };
});
