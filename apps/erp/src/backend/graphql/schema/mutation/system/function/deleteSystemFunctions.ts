export const deleteSystemFunctions = /* GraphQL */ `
  type DeleteSystemFunctionsResponseData {
    count: Int
  }

  type DeleteSystemFunctionsResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: DeleteSystemFunctionsResponseData!
  }

  input DeleteSystemFunctionsInput {
    ids: [String!]!
  }

  extend type Mutation {
    deleteSystemFunctions(
      input: DeleteSystemFunctionsInput!
    ): DeleteSystemFunctionsResponse!
  }
`;
