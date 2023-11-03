import { httpCodeConfig } from "@wowgo/core/dist/constant/httpCode";
import { AppSecret, GraphqlContext } from "@/graphql/resolverFactory";
import { GraphQLResolveInfo } from "graphql";

export const checkAppSecretMiddleware = async <
  TSource,
  TArgs = Record<string, never>,
  TReturn = unknown,
>(
  source: TSource,
  args: TArgs,
  context: GraphqlContext,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  info: GraphQLResolveInfo,
): Promise<[false, TReturn] | [true, null]> => {
  const secret = context.req.headers["secret"] ?? "";
  const checkAppSecret: AppSecret[] = context.checkAppSecret
    ? context.checkAppSecret
    : [];
  const isAppSecretValid = checkAppSecret.includes(secret as AppSecret);

  if (!isAppSecretValid) {
    return [false, httpCodeConfig[401].appSecretNotAllow as unknown as TReturn];
  }

  return [true, null];
};
