import * as Types from '@/backend/graphql/types';

export type SystemUserByTokenQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SystemUserByTokenQuery = { __typename?: 'Query', systemUserByToken: { __typename?: 'QuerySystemUserByTokenResponse', code: number, message: Array<string>, result?: { __typename?: 'SystemUser', id: string, email: string, emailVerified?: boolean | null, password: string, enable: boolean, familyName: string, givenName: string, language: string, locale?: string | null, picture?: string | null, provider: string, providerId: string, displayName: string, createdUser: string, createdDate: any, updatedDate: any, updatedUser: string } | null } };
