export const systemRelevance = /* GraphQL */ `
  type QuerySystemRelevanceResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: SystemRelevance
  }

  input QuerySystemRelevanceInput {
    id: String!
  }

  extend type Query {
    systemRelevance(
      input: QuerySystemRelevanceInput!
    ): QuerySystemRelevanceResponse!
  }
`;
