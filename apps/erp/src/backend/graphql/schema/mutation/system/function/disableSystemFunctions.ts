export const disableSystemFunctions = /* GraphQL */ `
  type DisableSystemFunctionsResponseData {
    count: Int
  }

  type DisableSystemFunctionsResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: DisableSystemFunctionsResponseData!
  }

  input DisableSystemFunctionsInput {
    ids: [String!]!
  }

  extend type Mutation {
    disableSystemFunctions(
      input: DisableSystemFunctionsInput!
    ): DisableSystemFunctionsResponse!
  }
`;
