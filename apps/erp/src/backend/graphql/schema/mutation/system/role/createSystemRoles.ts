export const createSystemRoles = /* GraphQL */ `
  type CreateSystemRolesResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: [SystemRole!]!
  }

  input CreateSystemRoleData {
    code: String!
    name: String!
    enable: Boolean!
  }

  input CreateSystemRolesInput {
    dataList: [CreateSystemRoleData!]!
  }

  extend type Mutation {
    createSystemRoles(
      input: CreateSystemRolesInput!
    ): CreateSystemRolesResponse!
  }
`;
