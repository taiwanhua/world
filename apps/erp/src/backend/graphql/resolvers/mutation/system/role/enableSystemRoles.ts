import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import type {
  MutationEnableSystemRolesArgs,
  EnableSystemRolesResponse,
} from "@/backend/graphql/types";
import { enableSystemRoles as enableSystemRolesService } from "@/backend/prisma/service/system/systemRole/enableSystemRoles";

export const enableSystemRoles = graphqlResolverFactory<
  never,
  MutationEnableSystemRolesArgs,
  EnableSystemRolesResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.mutation.enableSystemRoles"],
})(async (source, args, context) => {
  const { ids } = args.input;
  const {
    res: { locals },
  } = context;

  const result = await enableSystemRolesService({
    args: ids,
    locals,
  });

  return {
    ...responseConfig.success,
    result,
  };
});
