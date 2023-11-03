export const systemMenu = /* GraphQL */ `
  type QuerySystemMenuResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: SystemMenu
  }

  input QuerySystemMenuInput {
    id: String!
  }

  extend type Query {
    systemMenu(input: QuerySystemMenuInput!): QuerySystemMenuResponse!
  }
`;
