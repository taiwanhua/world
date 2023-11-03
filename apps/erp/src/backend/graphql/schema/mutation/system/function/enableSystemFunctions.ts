export const enableSystemFunctions = /* GraphQL */ `
  type EnableSystemFunctionsResponseData {
    count: Int
  }

  type EnableSystemFunctionsResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: EnableSystemFunctionsResponseData!
  }

  input EnableSystemFunctionsInput {
    ids: [String!]!
  }

  extend type Mutation {
    enableSystemFunctions(
      input: EnableSystemFunctionsInput!
    ): EnableSystemFunctionsResponse!
  }
`;
