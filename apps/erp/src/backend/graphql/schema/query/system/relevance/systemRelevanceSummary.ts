export const systemRelevanceSummary = /* GraphQL */ `
  input QuerySystemRelevanceSummaryInput {
    type: String!
    firstId: String
    secondId: String
    thirdId: String
    enable: Boolean
    start: Int
    limit: Int
  }

  type QuerySystemRelevanceSummaryData implements SummaryData {
    count: Int!
    pageCount: Int!
    page: Int!
    limit: Int!
    start: Int!
    data: [SystemRelevance!]!
  }

  type QuerySystemRelevanceSummaryResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: QuerySystemRelevanceSummaryData
  }

  extend type Query {
    systemRelevanceSummary(
      input: QuerySystemRelevanceSummaryInput!
    ): QuerySystemRelevanceSummaryResponse!
  }
`;
