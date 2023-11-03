export const systemFunctionsByToken = /* GraphQL */ `
  type QuerySystemFunctionsByTokenResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: [SystemFunction!]
  }

  extend type Query {
    systemFunctionsByToken: QuerySystemFunctionsByTokenResponse!
  }
`;
