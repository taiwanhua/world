import type { WowgoGraphqlClass } from "@/frontend/graphql/WowgoGraphql";
import type {
  SystemUserByTokenQuery,
  SystemUserByTokenQueryVariables,
} from "./systemUserByToken.type";

export type SystemUserByTokenBind = () => Promise<SystemUserByTokenQuery>;

export const QUERY_USER_BY_TOKEN = /* GraphQL */ `
  query systemUserByToken {
    systemUserByToken {
      code
      message
      result {
        id
        email
        emailVerified
        password
        enable
        familyName
        givenName
        language
        locale
        picture
        provider
        providerId
        displayName
        createdUser
        createdDate
        updatedDate
        updatedUser
      }
    }
  }
`;

export async function systemUserByToken(
  this: WowgoGraphqlClass,
): Promise<SystemUserByTokenQuery> {
  const data = await this.request<
    SystemUserByTokenQuery,
    SystemUserByTokenQueryVariables
  >(QUERY_USER_BY_TOKEN);

  return data;
}
