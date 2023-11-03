import type { WowgoGraphqlClass } from "@/frontend/graphql/WowgoGraphql";
import type {
  SystemMenusByTokenQuery,
  SystemMenusByTokenQueryVariables,
} from "./systemMenusByToken.type";

export type SystemMenusByTokenBind = (
  input: QuerySystemMenusByTokenInput,
) => Promise<SystemMenusByTokenQuery>;

export type QuerySystemMenusByTokenInput =
  SystemMenusByTokenQueryVariables["input"];

export const QUERY_SYSTEM_MENUS_BY_TOKEN = /* GraphQL */ `
  query systemMenusByToken($input: QuerySystemMenusByTokenInput!) {
    systemMenusByToken(input: $input) {
      code
      message
      result {
        id
        name
        pathname
        parentId
        showInMenu
        isWebPage
        isNeedLogin
        icon
        tableMemo
        sort
        enable
        cascadeId
        createdUser
        createdDate
        updatedUser
        updatedDate
        systemFunctions {
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
  }
`;

export async function systemMenusByToken(
  this: WowgoGraphqlClass,
  input: QuerySystemMenusByTokenInput,
): Promise<SystemMenusByTokenQuery> {
  const data = await this.request<
    SystemMenusByTokenQuery,
    SystemMenusByTokenQueryVariables
  >(QUERY_SYSTEM_MENUS_BY_TOKEN, { input });

  return data;
}
