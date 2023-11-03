export const systemUserSummary = /* GraphQL */ `
  input QuerySystemUserSummaryInput {
    keyword: String
    roleIds: [String!]
    # provider: String
    # emailVerified: Boolean
    # locale: String
    enable: Boolean
    start: Int
    limit: Int
  }

  type QuerySystemUserSummaryData implements SummaryData {
    count: Int!
    pageCount: Int!
    page: Int!
    limit: Int!
    start: Int!
    data: [SystemUser!]!
  }

  type QuerySystemUserSummaryResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: QuerySystemUserSummaryData
  }

  extend type Query {
    systemUserSummary(
      input: QuerySystemUserSummaryInput!
    ): QuerySystemUserSummaryResponse!
  }
`;
