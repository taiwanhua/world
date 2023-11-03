export const SystemUser = /* GraphQL */ `
  type SystemUser {
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
    enable: Boolean!
    createdUser: String!
    createdDate: DateTime!
    updatedUser: String!
    updatedDate: DateTime!
  }
`;
