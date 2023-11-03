export const updateSystemRoles = /* GraphQL */ `
  input UpdateSystemRolesData {
    id: String!
    code: String!
    name: String!
    enable: Boolean!
  }

  type UpdateSystemRolesResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: [SystemRole!]!
  }

  input UpdateSystemRolesInput {
    dataList: [UpdateSystemRolesData!]!
  }

  extend type Mutation {
    updateSystemRoles(
      input: UpdateSystemRolesInput!
    ): UpdateSystemRolesResponse!
  }
`;
