import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import type {
  MutationReassignSystemRelevancesArgs,
  ReassignSystemRelevancesResponse,
} from "@/backend/graphql/types";
import { reassign } from "@/backend/prisma/service/system/systemRelevance/reassign";
import type { SystemRelevanceTypeEnum } from "@/backend/constant/value";

export const reassignSystemRelevances = graphqlResolverFactory<
  never,
  MutationReassignSystemRelevancesArgs,
  ReassignSystemRelevancesResponse
>({
  requirePermissionPaths: [
    "wowgo.api.graphql.mutation.reassignSystemRelevances",
  ],
})(async (source, args, context) => {
  const { type, fixed, firstIds, secondIds, thirdIds } = args.input;
  const {
    res: { locals },
  } = context;

  const { count } = await reassign({
    locals,
    args: {
      type: type as SystemRelevanceTypeEnum,
      fixed,
      firstIds,
      secondIds,
      thirdIds,
    },
  });

  return {
    ...responseConfig.success,
    result: { count },
  };
});
