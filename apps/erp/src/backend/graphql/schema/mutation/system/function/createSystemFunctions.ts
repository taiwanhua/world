export const createSystemFunctions = /* GraphQL */ `
  input CreateSystemFunctionsData {
    menuId: String!
    name: String!
    showName: String!
    icon: String
    type: String!
    enable: Boolean!
  }

  type CreateSystemFunctionsResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: [SystemFunction!]!
  }

  input CreateSystemFunctionsInput {
    dataList: [CreateSystemFunctionsData!]!
  }

  extend type Mutation {
    createSystemFunctions(
      input: CreateSystemFunctionsInput!
    ): CreateSystemFunctionsResponse!
  }
`;
