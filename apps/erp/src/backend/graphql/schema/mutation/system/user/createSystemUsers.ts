export const createSystemUsers = /* GraphQL */ `
  type CreateSystemUsersResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: [SystemUser!]!
  }

  input CreateSystemUserData {
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

  input CreateSystemUsersInput {
    dataList: [CreateSystemUserData!]!
  }

  extend type Mutation {
    createSystemUsers(
      input: CreateSystemUsersInput!
    ): CreateSystemUsersResponse!
  }
`;
