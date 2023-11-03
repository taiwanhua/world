export const deleteSystemRoles = /* GraphQL */ `
  type DeleteSystemRolesResponseData {
    count: Int
  }

  type DeleteSystemRolesResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: DeleteSystemRolesResponseData!
  }

  input DeleteSystemRolesInput {
    ids: [String!]!
  }

  extend type Mutation {
    deleteSystemRoles(
      input: DeleteSystemRolesInput!
    ): DeleteSystemRolesResponse!
  }
`;
