export const systemRole = /* GraphQL */ `
  type QuerySystemRoleResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: SystemRole
  }

  input QuerySystemRoleInput {
    id: String!
  }

  extend type Query {
    systemRole(input: QuerySystemRoleInput!): QuerySystemRoleResponse!
  }
`;
