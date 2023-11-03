import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import type {
  MutationEnableSystemUsersArgs,
  EnableSystemUsersResponse,
} from "@/backend/graphql/types";
import { enableSystemUsers as enableSystemUsersService } from "@/backend/prisma/service/system/systemUser/enableSystemUsers";

export const enableSystemUsers = graphqlResolverFactory<
  never,
  MutationEnableSystemUsersArgs,
  EnableSystemUsersResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.mutation.enableSystemUsers"],
})(async (source, args, context) => {
  const { ids } = args.input;
  const {
    res: { locals },
  } = context;

  const result = await enableSystemUsersService({
    args: ids,
    locals,
  });

  return {
    ...responseConfig.success,
    result,
  };
});
