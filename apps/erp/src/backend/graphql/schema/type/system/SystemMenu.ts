export const SystemMenu = /* GraphQL */ `
  type SystemMenu {
    id: String!
    cascadeId: String
    name: String!
    pathname: String!
    icon: String
    showInMenu: Boolean
    isWebPage: Boolean
    isNeedLogin: Boolean
    parentId: String
    tableMemo: String
    sort: Int!
    enable: Boolean
    createdUser: String!
    createdDate: DateTime!
    updatedUser: String!
    updatedDate: DateTime!
    systemFunctions: [SystemFunction!]!
  }
`;
