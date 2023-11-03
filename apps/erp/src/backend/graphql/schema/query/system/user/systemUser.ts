export const systemUser = /* GraphQL */ `
  type QuerySystemUserResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: SystemUser
  }

  input QuerySystemUserInput {
    id: String!
  }

  extend type Query {
    systemUser(input: QuerySystemUserInput!): QuerySystemUserResponse!
  }
`;
