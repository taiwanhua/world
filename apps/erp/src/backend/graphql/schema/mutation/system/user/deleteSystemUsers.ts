export const deleteSystemUsers = /* GraphQL */ `
  type DeleteSystemUsersResponseData {
    count: Int
  }

  type DeleteSystemUsersResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: DeleteSystemUsersResponseData!
  }

  input DeleteSystemUsersInput {
    ids: [String!]!
  }

  extend type Mutation {
    deleteSystemUsers(
      input: DeleteSystemUsersInput!
    ): DeleteSystemUsersResponse!
  }
`;
