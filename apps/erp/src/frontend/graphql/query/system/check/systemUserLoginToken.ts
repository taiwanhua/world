import type { WowgoGraphqlClass } from "@/frontend/graphql/WowgoGraphql";
import type {
  SystemUserLoginTokenQuery,
  SystemUserLoginTokenQueryVariables,
} from "./systemUserLoginToken.type";

export type SystemUserLoginByTokenBind = (
  input: QuerySystemUserLoginTokenInput,
) => Promise<SystemUserLoginTokenQuery>;

export type QuerySystemUserLoginTokenInput =
  SystemUserLoginTokenQueryVariables["input"];

export const QUERY_USER_LOGIN_TOKEN = /* GraphQL */ `
  query systemUserLoginToken($input: QuerySystemUserLoginTokenInput!) {
    systemUserLoginToken(input: $input) {
      code
      message
      result
    }
  }
`;

export async function systemUserLoginToken(
  this: WowgoGraphqlClass,
  input: QuerySystemUserLoginTokenInput,
): Promise<SystemUserLoginTokenQuery> {
  const data = await this.request<
    SystemUserLoginTokenQuery,
    SystemUserLoginTokenQueryVariables
  >(QUERY_USER_LOGIN_TOKEN, { input });

  return data;
}
