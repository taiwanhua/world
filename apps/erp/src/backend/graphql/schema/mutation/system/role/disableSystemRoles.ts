export const disableSystemRoles = /* GraphQL */ `
  type DisableSystemRolesResponseData {
    count: Int
  }

  type DisableSystemRolesResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: DisableSystemRolesResponseData!
  }

  input DisableSystemRolesInput {
    ids: [String!]!
  }

  extend type Mutation {
    disableSystemRoles(
      input: DisableSystemRolesInput!
    ): DisableSystemRolesResponse!
  }
`;
