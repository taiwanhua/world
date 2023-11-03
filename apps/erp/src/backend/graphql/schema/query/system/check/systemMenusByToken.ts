export const systemMenusByToken = /* GraphQL */ `
  input QuerySystemMenusByTokenInput {
    isSkipDisable: Boolean
  }

  type QuerySystemMenusByTokenResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: [SystemMenu!]
  }

  extend type Query {
    systemMenusByToken(
      input: QuerySystemMenusByTokenInput!
    ): QuerySystemMenusByTokenResponse!
  }
`;
