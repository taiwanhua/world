import * as Types from '@/backend/graphql/types';

export type SystemFunctionsByTokenQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SystemFunctionsByTokenQuery = { __typename?: 'Query', systemFunctionsByToken: { __typename?: 'QuerySystemFunctionsByTokenResponse', code: number, message: Array<string>, result?: Array<{ __typename?: 'SystemFunction', id: string, menuId: string, name: string, showName: string, type: string, icon?: string | null, enable: boolean, createdUser: string, createdDate: any, updatedDate: any, updatedUser: string }> | null } };
