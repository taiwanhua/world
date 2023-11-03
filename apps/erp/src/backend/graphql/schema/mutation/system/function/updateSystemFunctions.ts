export const updateSystemFunctions = /* GraphQL */ `
  input UpdateSystemFunctionsData {
    id: String!
    menuId: String!
    name: String!
    showName: String!
    icon: String
    type: String!
    enable: Boolean!
  }

  type UpdateSystemFunctionsResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: [SystemFunction!]!
  }

  input UpdateSystemFunctionsInput {
    dataList: [UpdateSystemFunctionsData!]!
  }

  extend type Mutation {
    updateSystemFunctions(
      input: UpdateSystemFunctionsInput!
    ): UpdateSystemFunctionsResponse!
  }
`;
