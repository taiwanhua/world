import type { WowgoGraphqlClass } from "@/frontend/graphql/WowgoGraphql";
import type {
  SystemRolesByTokenQuery,
  SystemRolesByTokenQueryVariables,
} from "./systemRolesByToken.type";

export type SystemRolesByTokenBind = () => Promise<SystemRolesByTokenQuery>;

export const QUERY_SYSTEM_ROLES_BY_TOKEN = /* GraphQL */ `
  query systemRolesByToken {
    systemRolesByToken {
      code
      message
      result {
        id
        code
        name
        enable
        createdUser
        createdDate
        updatedDate
        updatedUser
      }
    }
  }
`;

export async function systemRolesByToken(
  this: WowgoGraphqlClass,
): Promise<SystemRolesByTokenQuery> {
  const data = await this.request<
    SystemRolesByTokenQuery,
    SystemRolesByTokenQueryVariables
  >(QUERY_SYSTEM_ROLES_BY_TOKEN);

  return data;
}
