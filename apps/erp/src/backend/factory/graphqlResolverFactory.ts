import type { GraphQLFieldResolver, GraphQLResolveInfo } from "graphql";
import type { GraphqlContext } from "@/backend/graphql/contexts/Context";
import { responseConfig } from "@/backend/constant/responseConfig";
import type { Params } from "@/utils/api/apiValidation";
import { apiValidation } from "@/utils/api/apiValidation";
import type { GraphqlFactoryResponse } from "@/backend/types/api/apiHandler";
import { fillResponseLocals } from "@/utils/api/fillResponseLocals";

export function graphqlResolverFactory<
  Source,
  Args,
  Response extends GraphqlFactoryResponse<unknown>,
>(
  apiValidationParams: Params = {},
): (
  handler: GraphQLFieldResolver<
    Source,
    GraphqlContext,
    Args,
    Promise<Response | GraphqlFactoryResponse>
  >,
) => GraphQLFieldResolver<
  Source,
  GraphqlContext,
  Args,
  Promise<Response | GraphqlFactoryResponse>
> {
  return (handler) =>
    async (
      source: Source,
      args: Args,
      context: GraphqlContext,
      info: GraphQLResolveInfo,
    ) => {
      const filledContext = await fillResponseLocals(context);
      const { req, res } = filledContext;

      const apiValidationResult = await apiValidation(
        req,
        res,
        apiValidationParams,
      );

      if (apiValidationResult.message.length > 0) {
        return {
          ...responseConfig.permissionDenied,
          message: [
            ...responseConfig.permissionDenied.message,
            ...apiValidationResult.message,
          ],
          result: null,
        };
      }

      const handlerResult = await handler(source, args, context, info);

      return handlerResult.result === undefined
        ? { ...handlerResult, result: null }
        : handlerResult;
    };
}
