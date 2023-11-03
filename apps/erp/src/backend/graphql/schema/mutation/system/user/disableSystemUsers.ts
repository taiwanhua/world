export const disableSystemUsers = /* GraphQL */ `
  type DisableSystemUsersResponseData {
    count: Int
  }

  type DisableSystemUsersResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: DisableSystemUsersResponseData!
  }

  input DisableSystemUsersInput {
    ids: [String!]!
  }

  extend type Mutation {
    disableSystemUsers(
      input: DisableSystemUsersInput!
    ): DisableSystemUsersResponse!
  }
`;
