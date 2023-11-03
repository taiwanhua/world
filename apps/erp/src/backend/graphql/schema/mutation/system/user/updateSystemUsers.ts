export const updateSystemUsers = /* GraphQL */ `
  input UpdateSystemUsersData {
    id: String!
    providerId: String!
    provider: String!
    displayName: String!
    familyName: String!
    givenName: String!
    email: String!
    emailVerified: Boolean
    password: String!
    language: String!
    locale: String
    picture: String
    accountId: String
    enable: Boolean!
  }

  type UpdateSystemUsersResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: [SystemUser!]!
  }

  input UpdateSystemUsersInput {
    dataList: [UpdateSystemUsersData!]!
  }

  extend type Mutation {
    updateSystemUsers(
      input: UpdateSystemUsersInput!
    ): UpdateSystemUsersResponse!
  }
`;
