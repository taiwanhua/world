import * as Types from '@/backend/graphql/types';

export type SystemMenusByTokenQueryVariables = Types.Exact<{
  input: Types.QuerySystemMenusByTokenInput;
}>;


export type SystemMenusByTokenQuery = { __typename?: 'Query', systemMenusByToken: { __typename?: 'QuerySystemMenusByTokenResponse', code: number, message: Array<string>, result?: Array<{ __typename?: 'SystemMenu', id: string, name: string, pathname: string, parentId?: string | null, showInMenu?: boolean | null, isWebPage?: boolean | null, isNeedLogin?: boolean | null, icon?: string | null, tableMemo?: string | null, sort: number, enable?: boolean | null, cascadeId?: string | null, createdUser: string, createdDate: any, updatedUser: string, updatedDate: any, systemFunctions: Array<{ __typename?: 'SystemFunction', id: string, menuId: string, name: string, showName: string, type: string, icon?: string | null, enable: boolean, createdUser: string, createdDate: any, updatedDate: any, updatedUser: string }> }> | null } };
