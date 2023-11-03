export const enableSystemMenus = /* GraphQL */ `
  type EnableSystemMenusResponseData {
    count: Int
  }

  type EnableSystemMenusResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: EnableSystemMenusResponseData!
  }

  input EnableSystemMenusInput {
    ids: [String!]!
  }

  extend type Mutation {
    enableSystemMenus(
      input: EnableSystemMenusInput!
    ): EnableSystemMenusResponse!
  }
`;
