import type { WowgoGraphqlClass } from "@/frontend/graphql/WowgoGraphql";
import type {
  SystemFunctionsByTokenQuery,
  SystemFunctionsByTokenQueryVariables,
} from "./systemFunctionsByToken.type";

export type SystemFunctionsByTokenBind =
  () => Promise<SystemFunctionsByTokenQuery>;

export const QUERY_SYSTEM_FUNCTIONS_BY_TOKEN = /* GraphQL */ `
  query systemFunctionsByToken {
    systemFunctionsByToken {
      code
      message
      result {
        id
        menuId
        name
        showName
        type
        icon
        enable
        createdUser
        createdDate
        updatedDate
        updatedUser
      }
    }
  }
`;

export async function systemFunctionsByToken(
  this: WowgoGraphqlClass,
): Promise<SystemFunctionsByTokenQuery> {
  const data = await this.request<
    SystemFunctionsByTokenQuery,
    SystemFunctionsByTokenQueryVariables
  >(QUERY_SYSTEM_FUNCTIONS_BY_TOKEN);

  return data;
}
