export const systemRolesByToken = /* GraphQL */ `
  type QuerySystemRolesByTokenResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: [SystemRole!]
  }

  extend type Query {
    systemRolesByToken: QuerySystemRolesByTokenResponse!
  }
`;
