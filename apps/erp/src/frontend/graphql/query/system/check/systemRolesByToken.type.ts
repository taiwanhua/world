import * as Types from '@/backend/graphql/types';

export type SystemRolesByTokenQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SystemRolesByTokenQuery = { __typename?: 'Query', systemRolesByToken: { __typename?: 'QuerySystemRolesByTokenResponse', code: number, message: Array<string>, result?: Array<{ __typename?: 'SystemRole', id: string, code: string, name: string, enable: boolean, createdUser: string, createdDate: any, updatedDate: any, updatedUser: string }> | null } };
