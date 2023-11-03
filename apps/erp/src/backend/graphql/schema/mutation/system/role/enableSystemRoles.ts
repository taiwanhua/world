export const enableSystemRoles = /* GraphQL */ `
  type EnableSystemRolesResponseData {
    count: Int
  }

  type EnableSystemRolesResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: EnableSystemRolesResponseData!
  }

  input EnableSystemRolesInput {
    ids: [String!]!
  }

  extend type Mutation {
    enableSystemRoles(
      input: EnableSystemRolesInput!
    ): EnableSystemRolesResponse!
  }
`;
