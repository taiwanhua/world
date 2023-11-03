export const systemUserByToken = /* GraphQL */ `
  type QuerySystemUserByTokenResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: SystemUser
  }

  extend type Query {
    systemUserByToken: QuerySystemUserByTokenResponse!
  }
`;
