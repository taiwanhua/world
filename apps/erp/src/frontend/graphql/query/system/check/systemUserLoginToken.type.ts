import * as Types from '@/backend/graphql/types';

export type SystemUserLoginTokenQueryVariables = Types.Exact<{
  input: Types.QuerySystemUserLoginTokenInput;
}>;


export type SystemUserLoginTokenQuery = { __typename?: 'Query', systemUserLoginToken: { __typename?: 'QuerySystemUserLoginTokenResponse', code: number, message: Array<string>, result?: string | null } };
