export const updateSystemMenus = /* GraphQL */ `
  input UpdateSystemMenusData {
    id: String!
    cascadeId: String
    name: String!
    pathname: String!
    icon: String
    showInMenu: Boolean!
    isWebPage: Boolean!
    isNeedLogin: Boolean!
    parentId: String
    tableMemo: String
    sort: Int!
    enable: Boolean!
  }

  type UpdateSystemMenusResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: [SystemMenu!]!
  }

  input UpdateSystemMenusInput {
    dataList: [UpdateSystemMenusData!]!
  }

  extend type Mutation {
    updateSystemMenus(
      input: UpdateSystemMenusInput!
    ): UpdateSystemMenusResponse!
  }
`;
