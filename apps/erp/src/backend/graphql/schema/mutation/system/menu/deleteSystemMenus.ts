export const deleteSystemMenus = /* GraphQL */ `
  type DeleteSystemMenusResponseData {
    count: Int
  }

  type DeleteSystemMenusResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: DeleteSystemMenusResponseData!
  }

  input DeleteSystemMenusInput {
    ids: [String!]!
  }

  extend type Mutation {
    deleteSystemMenus(
      input: DeleteSystemMenusInput!
    ): DeleteSystemMenusResponse!
  }
`;
