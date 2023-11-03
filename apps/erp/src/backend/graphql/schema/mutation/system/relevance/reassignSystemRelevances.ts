export const reassignSystemRelevances = /* GraphQL */ `
  input ReassignSystemRelevancesInput {
    type: String!
    fixed: [FixedColumn!]!
    firstIds: [String!]!
    secondIds: [String!]!
    thirdIds: [String!]!
  }

  type ReassignSystemRelevancesResponseData {
    count: Int
  }

  type ReassignSystemRelevancesResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: ReassignSystemRelevancesResponseData
  }

  extend type Mutation {
    reassignSystemRelevances(
      input: ReassignSystemRelevancesInput!
    ): ReassignSystemRelevancesResponse!
  }
`;
