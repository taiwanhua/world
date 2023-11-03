export const systemRoleSummary = /* GraphQL */ `
  input QuerySystemRoleSummaryInput {
    keyword: String
    userIds: [String!]
    enable: Boolean
    start: Int
    limit: Int
    isByToken: Boolean
  }

  type QuerySystemRoleSummaryData implements SummaryData {
    count: Int!
    pageCount: Int!
    page: Int!
    limit: Int!
    start: Int!
    data: [SystemRole!]!
  }

  type QuerySystemRoleSummaryResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: QuerySystemRoleSummaryData
  }

  extend type Query {
    systemRoleSummary(
      input: QuerySystemRoleSummaryInput!
    ): QuerySystemRoleSummaryResponse!
  }
`;
