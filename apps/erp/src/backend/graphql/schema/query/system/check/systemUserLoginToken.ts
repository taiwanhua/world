export const systemUserLoginToken = /* GraphQL */ `
  input QuerySystemUserLoginTokenInput {
    email: String!
    password: String!
  }

  type QuerySystemUserLoginTokenResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: String
  }

  extend type Query {
    systemUserLoginToken(
      input: QuerySystemUserLoginTokenInput!
    ): QuerySystemUserLoginTokenResponse!
  }
`;
