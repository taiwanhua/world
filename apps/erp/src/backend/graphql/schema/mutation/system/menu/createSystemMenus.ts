export const createSystemMenus = /* GraphQL */ `
  type CreateSystemMenusResponse implements BaseResponse {
    code: Int!
    statusCode: Int!
    message: [String!]!
    result: [SystemMenu!]!
  }

  input CreateSystemMenuData {
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

  input CreateSystemMenusInput {
    dataList: [CreateSystemMenuData!]!
  }

  extend type Mutation {
    createSystemMenus(
      input: CreateSystemMenusInput!
    ): CreateSystemMenusResponse!
  }
`;
