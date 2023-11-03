export const enableSystemUsers = /* GraphQL */ `
  type EnableSystemUsersResponseData {
    count: Int
  }

  type EnableSystemUsersResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: EnableSystemUsersResponseData!
  }

  input EnableSystemUsersInput {
    ids: [String!]!
  }

  extend type Mutation {
    enableSystemUsers(
      input: EnableSystemUsersInput!
    ): EnableSystemUsersResponse!
  }
`;
