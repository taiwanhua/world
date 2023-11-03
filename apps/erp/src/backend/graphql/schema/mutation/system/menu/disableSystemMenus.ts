export const disableSystemMenus = /* GraphQL */ `
  type DisableSystemMenusResponseData {
    count: Int
  }

  type DisableSystemMenusResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: DisableSystemMenusResponseData!
  }

  input DisableSystemMenusInput {
    ids: [String!]!
  }

  extend type Mutation {
    disableSystemMenus(
      input: DisableSystemMenusInput!
    ): DisableSystemMenusResponse!
  }
`;
