export const systemMenuSummary = /* GraphQL */ `
  input QuerySystemMenuSummaryInput {
    keyword: String
    # parentId: String
    # isNeedLogin: Boolean
    # isWebPage: Boolean
    # showInMenu: Boolean
    enable: Boolean
    start: Int
    limit: Int
    isByToken: Boolean
  }

  type QuerySystemMenuSummaryData implements SummaryData {
    count: Int!
    pageCount: Int!
    page: Int!
    limit: Int!
    start: Int!
    data: [SystemMenu!]!
  }

  type QuerySystemMenuSummaryResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: QuerySystemMenuSummaryData
  }

  extend type Query {
    systemMenuSummary(
      input: QuerySystemMenuSummaryInput!
    ): QuerySystemMenuSummaryResponse!
  }
`;
