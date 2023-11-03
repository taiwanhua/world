import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import type {
  MutationDisableSystemUsersArgs,
  DisableSystemUsersResponse,
} from "@/backend/graphql/types";
import { disableSystemUsers as disableSystemUsersService } from "@/backend/prisma/service/system/systemUser/disableSystemUsers";

export const disableSystemUsers = graphqlResolverFactory<
  never,
  MutationDisableSystemUsersArgs,
  DisableSystemUsersResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.mutation.disableSystemUsers"],
})(async (source, args, context) => {
  const { ids } = args.input;
  const {
    res: { locals },
  } = context;

  const result = await disableSystemUsersService({
    args: ids,
    locals,
  });

  return {
    ...responseConfig.success,
    result,
  };
});
