import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import type {
  MutationDisableSystemRolesArgs,
  DisableSystemRolesResponse,
} from "@/backend/graphql/types";
import { disableSystemRoles as disableSystemRolesService } from "@/backend/prisma/service/system/systemRole/disableSystemRoles";

export const disableSystemRoles = graphqlResolverFactory<
  never,
  MutationDisableSystemRolesArgs,
  DisableSystemRolesResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.mutation.disableSystemRoles"],
})(async (source, args, context) => {
  const { ids } = args.input;
  const {
    res: { locals },
  } = context;

  const result = await disableSystemRolesService({
    args: ids,
    locals,
  });

  return {
    ...responseConfig.success,
    result,
  };
});
