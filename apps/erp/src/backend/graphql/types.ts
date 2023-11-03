export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
  File: { input: File; output: File; }
  JSON: { input: unknown; output: unknown; }
};

export type BaseResponse = {
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  statusCode: Scalars['Int']['output'];
};

export type CreateSystemFunctionsData = {
  enable: Scalars['Boolean']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
  menuId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  showName: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CreateSystemFunctionsInput = {
  dataList: Array<CreateSystemFunctionsData>;
};

export type CreateSystemFunctionsResponse = BaseResponse & {
  __typename?: 'CreateSystemFunctionsResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result: Array<SystemFunction>;
  statusCode: Scalars['Int']['output'];
};

export type CreateSystemMenuData = {
  cascadeId?: InputMaybe<Scalars['String']['input']>;
  enable: Scalars['Boolean']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
  isNeedLogin: Scalars['Boolean']['input'];
  isWebPage: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
  pathname: Scalars['String']['input'];
  showInMenu: Scalars['Boolean']['input'];
  sort: Scalars['Int']['input'];
  tableMemo?: InputMaybe<Scalars['String']['input']>;
};

export type CreateSystemMenusInput = {
  dataList: Array<CreateSystemMenuData>;
};

export type CreateSystemMenusResponse = BaseResponse & {
  __typename?: 'CreateSystemMenusResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result: Array<SystemMenu>;
  statusCode: Scalars['Int']['output'];
};

export type CreateSystemRoleData = {
  code: Scalars['String']['input'];
  enable: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
};

export type CreateSystemRolesInput = {
  dataList: Array<CreateSystemRoleData>;
};

export type CreateSystemRolesResponse = BaseResponse & {
  __typename?: 'CreateSystemRolesResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result: Array<SystemRole>;
  statusCode: Scalars['Int']['output'];
};

export type CreateSystemUserData = {
  accountId?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  emailVerified?: InputMaybe<Scalars['Boolean']['input']>;
  enable: Scalars['Boolean']['input'];
  familyName: Scalars['String']['input'];
  givenName: Scalars['String']['input'];
  language: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  picture?: InputMaybe<Scalars['String']['input']>;
  provider: Scalars['String']['input'];
  providerId: Scalars['String']['input'];
};

export type CreateSystemUsersInput = {
  dataList: Array<CreateSystemUserData>;
};

export type CreateSystemUsersResponse = BaseResponse & {
  __typename?: 'CreateSystemUsersResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result: Array<SystemUser>;
  statusCode: Scalars['Int']['output'];
};

export type DeleteSystemFunctionsInput = {
  ids: Array<Scalars['String']['input']>;
};

export type DeleteSystemFunctionsResponse = BaseResponse & {
  __typename?: 'DeleteSystemFunctionsResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result: DeleteSystemFunctionsResponseData;
  statusCode: Scalars['Int']['output'];
};

export type DeleteSystemFunctionsResponseData = {
  __typename?: 'DeleteSystemFunctionsResponseData';
  count?: Maybe<Scalars['Int']['output']>;
};

export type DeleteSystemMenusInput = {
  ids: Array<Scalars['String']['input']>;
};

export type DeleteSystemMenusResponse = BaseResponse & {
  __typename?: 'DeleteSystemMenusResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result: DeleteSystemMenusResponseData;
  statusCode: Scalars['Int']['output'];
};

export type DeleteSystemMenusResponseData = {
  __typename?: 'DeleteSystemMenusResponseData';
  count?: Maybe<Scalars['Int']['output']>;
};

export type DeleteSystemRolesInput = {
  ids: Array<Scalars['String']['input']>;
};

export type DeleteSystemRolesResponse = BaseResponse & {
  __typename?: 'DeleteSystemRolesResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result: DeleteSystemRolesResponseData;
  statusCode: Scalars['Int']['output'];
};

export type DeleteSystemRolesResponseData = {
  __typename?: 'DeleteSystemRolesResponseData';
  count?: Maybe<Scalars['Int']['output']>;
};

export type DeleteSystemUsersInput = {
  ids: Array<Scalars['String']['input']>;
};

export type DeleteSystemUsersResponse = BaseResponse & {
  __typename?: 'DeleteSystemUsersResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result: DeleteSystemUsersResponseData;
  statusCode: Scalars['Int']['output'];
};

export type DeleteSystemUsersResponseData = {
  __typename?: 'DeleteSystemUsersResponseData';
  count?: Maybe<Scalars['Int']['output']>;
};

export type DisableSystemFunctionsInput = {
  ids: Array<Scalars['String']['input']>;
};

export type DisableSystemFunctionsResponse = BaseResponse & {
  __typename?: 'DisableSystemFunctionsResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result: DisableSystemFunctionsResponseData;
  statusCode: Scalars['Int']['output'];
};

export type DisableSystemFunctionsResponseData = {
  __typename?: 'DisableSystemFunctionsResponseData';
  count?: Maybe<Scalars['Int']['output']>;
};

export type DisableSystemMenusInput = {
  ids: Array<Scalars['String']['input']>;
};

export type DisableSystemMenusResponse = BaseResponse & {
  __typename?: 'DisableSystemMenusResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result: DisableSystemMenusResponseData;
  statusCode: Scalars['Int']['output'];
};

export type DisableSystemMenusResponseData = {
  __typename?: 'DisableSystemMenusResponseData';
  count?: Maybe<Scalars['Int']['output']>;
};

export type DisableSystemRolesInput = {
  ids: Array<Scalars['String']['input']>;
};

export type DisableSystemRolesResponse = BaseResponse & {
  __typename?: 'DisableSystemRolesResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result: DisableSystemRolesResponseData;
  statusCode: Scalars['Int']['output'];
};

export type DisableSystemRolesResponseData = {
  __typename?: 'DisableSystemRolesResponseData';
  count?: Maybe<Scalars['Int']['output']>;
};

export type DisableSystemUsersInput = {
  ids: Array<Scalars['String']['input']>;
};

export type DisableSystemUsersResponse = BaseResponse & {
  __typename?: 'DisableSystemUsersResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result: DisableSystemUsersResponseData;
  statusCode: Scalars['Int']['output'];
};

export type DisableSystemUsersResponseData = {
  __typename?: 'DisableSystemUsersResponseData';
  count?: Maybe<Scalars['Int']['output']>;
};

export type EnableSystemFunctionsInput = {
  ids: Array<Scalars['String']['input']>;
};

export type EnableSystemFunctionsResponse = BaseResponse & {
  __typename?: 'EnableSystemFunctionsResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result: EnableSystemFunctionsResponseData;
  statusCode: Scalars['Int']['output'];
};

export type EnableSystemFunctionsResponseData = {
  __typename?: 'EnableSystemFunctionsResponseData';
  count?: Maybe<Scalars['Int']['output']>;
};

export type EnableSystemMenusInput = {
  ids: Array<Scalars['String']['input']>;
};

export type EnableSystemMenusResponse = BaseResponse & {
  __typename?: 'EnableSystemMenusResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result: EnableSystemMenusResponseData;
  statusCode: Scalars['Int']['output'];
};

export type EnableSystemMenusResponseData = {
  __typename?: 'EnableSystemMenusResponseData';
  count?: Maybe<Scalars['Int']['output']>;
};

export type EnableSystemRolesInput = {
  ids: Array<Scalars['String']['input']>;
};

export type EnableSystemRolesResponse = BaseResponse & {
  __typename?: 'EnableSystemRolesResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result: EnableSystemRolesResponseData;
  statusCode: Scalars['Int']['output'];
};

export type EnableSystemRolesResponseData = {
  __typename?: 'EnableSystemRolesResponseData';
  count?: Maybe<Scalars['Int']['output']>;
};

export type EnableSystemUsersInput = {
  ids: Array<Scalars['String']['input']>;
};

export type EnableSystemUsersResponse = BaseResponse & {
  __typename?: 'EnableSystemUsersResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result: EnableSystemUsersResponseData;
  statusCode: Scalars['Int']['output'];
};

export type EnableSystemUsersResponseData = {
  __typename?: 'EnableSystemUsersResponseData';
  count?: Maybe<Scalars['Int']['output']>;
};

export type FixedColumn =
  | 'firstIds'
  | 'secondIds'
  | 'thirdIds';

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['String']['output']>;
  createSystemFunctions: CreateSystemFunctionsResponse;
  createSystemMenus: CreateSystemMenusResponse;
  createSystemRoles: CreateSystemRolesResponse;
  createSystemUsers: CreateSystemUsersResponse;
  deleteSystemFunctions: DeleteSystemFunctionsResponse;
  deleteSystemMenus: DeleteSystemMenusResponse;
  deleteSystemRoles: DeleteSystemRolesResponse;
  deleteSystemUsers: DeleteSystemUsersResponse;
  disableSystemFunctions: DisableSystemFunctionsResponse;
  disableSystemMenus: DisableSystemMenusResponse;
  disableSystemRoles: DisableSystemRolesResponse;
  disableSystemUsers: DisableSystemUsersResponse;
  enableSystemFunctions: EnableSystemFunctionsResponse;
  enableSystemMenus: EnableSystemMenusResponse;
  enableSystemRoles: EnableSystemRolesResponse;
  enableSystemUsers: EnableSystemUsersResponse;
  reassignSystemRelevances: ReassignSystemRelevancesResponse;
  updateSystemFunctions: UpdateSystemFunctionsResponse;
  updateSystemMenus: UpdateSystemMenusResponse;
  updateSystemRoles: UpdateSystemRolesResponse;
  updateSystemUsers: UpdateSystemUsersResponse;
};


export type MutationCreateSystemFunctionsArgs = {
  input: CreateSystemFunctionsInput;
};


export type MutationCreateSystemMenusArgs = {
  input: CreateSystemMenusInput;
};


export type MutationCreateSystemRolesArgs = {
  input: CreateSystemRolesInput;
};


export type MutationCreateSystemUsersArgs = {
  input: CreateSystemUsersInput;
};


export type MutationDeleteSystemFunctionsArgs = {
  input: DeleteSystemFunctionsInput;
};


export type MutationDeleteSystemMenusArgs = {
  input: DeleteSystemMenusInput;
};


export type MutationDeleteSystemRolesArgs = {
  input: DeleteSystemRolesInput;
};


export type MutationDeleteSystemUsersArgs = {
  input: DeleteSystemUsersInput;
};


export type MutationDisableSystemFunctionsArgs = {
  input: DisableSystemFunctionsInput;
};


export type MutationDisableSystemMenusArgs = {
  input: DisableSystemMenusInput;
};


export type MutationDisableSystemRolesArgs = {
  input: DisableSystemRolesInput;
};


export type MutationDisableSystemUsersArgs = {
  input: DisableSystemUsersInput;
};


export type MutationEnableSystemFunctionsArgs = {
  input: EnableSystemFunctionsInput;
};


export type MutationEnableSystemMenusArgs = {
  input: EnableSystemMenusInput;
};


export type MutationEnableSystemRolesArgs = {
  input: EnableSystemRolesInput;
};


export type MutationEnableSystemUsersArgs = {
  input: EnableSystemUsersInput;
};


export type MutationReassignSystemRelevancesArgs = {
  input: ReassignSystemRelevancesInput;
};


export type MutationUpdateSystemFunctionsArgs = {
  input: UpdateSystemFunctionsInput;
};


export type MutationUpdateSystemMenusArgs = {
  input: UpdateSystemMenusInput;
};


export type MutationUpdateSystemRolesArgs = {
  input: UpdateSystemRolesInput;
};


export type MutationUpdateSystemUsersArgs = {
  input: UpdateSystemUsersInput;
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['String']['output']>;
  systemFunctionsByToken: QuerySystemFunctionsByTokenResponse;
  systemMenu: QuerySystemMenuResponse;
  systemMenuSummary: QuerySystemMenuSummaryResponse;
  systemMenusByToken: QuerySystemMenusByTokenResponse;
  systemRelevance: QuerySystemRelevanceResponse;
  systemRelevanceSummary: QuerySystemRelevanceSummaryResponse;
  systemRole: QuerySystemRoleResponse;
  systemRoleSummary: QuerySystemRoleSummaryResponse;
  systemRolesByToken: QuerySystemRolesByTokenResponse;
  systemUser: QuerySystemUserResponse;
  systemUserByToken: QuerySystemUserByTokenResponse;
  systemUserLoginToken: QuerySystemUserLoginTokenResponse;
  systemUserSummary: QuerySystemUserSummaryResponse;
};


export type QuerySystemMenuArgs = {
  input: QuerySystemMenuInput;
};


export type QuerySystemMenuSummaryArgs = {
  input: QuerySystemMenuSummaryInput;
};


export type QuerySystemMenusByTokenArgs = {
  input: QuerySystemMenusByTokenInput;
};


export type QuerySystemRelevanceArgs = {
  input: QuerySystemRelevanceInput;
};


export type QuerySystemRelevanceSummaryArgs = {
  input: QuerySystemRelevanceSummaryInput;
};


export type QuerySystemRoleArgs = {
  input: QuerySystemRoleInput;
};


export type QuerySystemRoleSummaryArgs = {
  input: QuerySystemRoleSummaryInput;
};


export type QuerySystemUserArgs = {
  input: QuerySystemUserInput;
};


export type QuerySystemUserLoginTokenArgs = {
  input: QuerySystemUserLoginTokenInput;
};


export type QuerySystemUserSummaryArgs = {
  input: QuerySystemUserSummaryInput;
};

export type QuerySystemFunctionsByTokenResponse = BaseResponse & {
  __typename?: 'QuerySystemFunctionsByTokenResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result?: Maybe<Array<SystemFunction>>;
  statusCode: Scalars['Int']['output'];
};

export type QuerySystemMenuInput = {
  id: Scalars['String']['input'];
};

export type QuerySystemMenuResponse = BaseResponse & {
  __typename?: 'QuerySystemMenuResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result?: Maybe<SystemMenu>;
  statusCode: Scalars['Int']['output'];
};

export type QuerySystemMenuSummaryData = SummaryData & {
  __typename?: 'QuerySystemMenuSummaryData';
  count: Scalars['Int']['output'];
  data: Array<SystemMenu>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  pageCount: Scalars['Int']['output'];
  start: Scalars['Int']['output'];
};

export type QuerySystemMenuSummaryInput = {
  enable?: InputMaybe<Scalars['Boolean']['input']>;
  isByToken?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type QuerySystemMenuSummaryResponse = BaseResponse & {
  __typename?: 'QuerySystemMenuSummaryResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result?: Maybe<QuerySystemMenuSummaryData>;
  statusCode: Scalars['Int']['output'];
};

export type QuerySystemMenusByTokenInput = {
  isSkipDisable?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QuerySystemMenusByTokenResponse = BaseResponse & {
  __typename?: 'QuerySystemMenusByTokenResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result?: Maybe<Array<SystemMenu>>;
  statusCode: Scalars['Int']['output'];
};

export type QuerySystemRelevanceInput = {
  id: Scalars['String']['input'];
};

export type QuerySystemRelevanceResponse = BaseResponse & {
  __typename?: 'QuerySystemRelevanceResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result?: Maybe<SystemRelevance>;
  statusCode: Scalars['Int']['output'];
};

export type QuerySystemRelevanceSummaryData = SummaryData & {
  __typename?: 'QuerySystemRelevanceSummaryData';
  count: Scalars['Int']['output'];
  data: Array<SystemRelevance>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  pageCount: Scalars['Int']['output'];
  start: Scalars['Int']['output'];
};

export type QuerySystemRelevanceSummaryInput = {
  enable?: InputMaybe<Scalars['Boolean']['input']>;
  firstId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  secondId?: InputMaybe<Scalars['String']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
  thirdId?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type QuerySystemRelevanceSummaryResponse = BaseResponse & {
  __typename?: 'QuerySystemRelevanceSummaryResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result?: Maybe<QuerySystemRelevanceSummaryData>;
  statusCode: Scalars['Int']['output'];
};

export type QuerySystemRoleInput = {
  id: Scalars['String']['input'];
};

export type QuerySystemRoleResponse = BaseResponse & {
  __typename?: 'QuerySystemRoleResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result?: Maybe<SystemRole>;
  statusCode: Scalars['Int']['output'];
};

export type QuerySystemRoleSummaryData = SummaryData & {
  __typename?: 'QuerySystemRoleSummaryData';
  count: Scalars['Int']['output'];
  data: Array<SystemRole>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  pageCount: Scalars['Int']['output'];
  start: Scalars['Int']['output'];
};

export type QuerySystemRoleSummaryInput = {
  enable?: InputMaybe<Scalars['Boolean']['input']>;
  isByToken?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
  userIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type QuerySystemRoleSummaryResponse = BaseResponse & {
  __typename?: 'QuerySystemRoleSummaryResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result?: Maybe<QuerySystemRoleSummaryData>;
  statusCode: Scalars['Int']['output'];
};

export type QuerySystemRolesByTokenResponse = BaseResponse & {
  __typename?: 'QuerySystemRolesByTokenResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result?: Maybe<Array<SystemRole>>;
  statusCode: Scalars['Int']['output'];
};

export type QuerySystemUserByTokenResponse = BaseResponse & {
  __typename?: 'QuerySystemUserByTokenResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result?: Maybe<SystemUser>;
  statusCode: Scalars['Int']['output'];
};

export type QuerySystemUserInput = {
  id: Scalars['String']['input'];
};

export type QuerySystemUserLoginTokenInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type QuerySystemUserLoginTokenResponse = BaseResponse & {
  __typename?: 'QuerySystemUserLoginTokenResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result?: Maybe<Scalars['String']['output']>;
  statusCode: Scalars['Int']['output'];
};

export type QuerySystemUserResponse = BaseResponse & {
  __typename?: 'QuerySystemUserResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result?: Maybe<SystemUser>;
  statusCode: Scalars['Int']['output'];
};

export type QuerySystemUserSummaryData = SummaryData & {
  __typename?: 'QuerySystemUserSummaryData';
  count: Scalars['Int']['output'];
  data: Array<SystemUser>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  pageCount: Scalars['Int']['output'];
  start: Scalars['Int']['output'];
};

export type QuerySystemUserSummaryInput = {
  enable?: InputMaybe<Scalars['Boolean']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  roleIds?: InputMaybe<Array<Scalars['String']['input']>>;
  start?: InputMaybe<Scalars['Int']['input']>;
};

export type QuerySystemUserSummaryResponse = BaseResponse & {
  __typename?: 'QuerySystemUserSummaryResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result?: Maybe<QuerySystemUserSummaryData>;
  statusCode: Scalars['Int']['output'];
};

export type ReassignSystemRelevancesInput = {
  firstIds: Array<Scalars['String']['input']>;
  fixed: Array<FixedColumn>;
  secondIds: Array<Scalars['String']['input']>;
  thirdIds: Array<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type ReassignSystemRelevancesResponse = BaseResponse & {
  __typename?: 'ReassignSystemRelevancesResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result?: Maybe<ReassignSystemRelevancesResponseData>;
  statusCode: Scalars['Int']['output'];
};

export type ReassignSystemRelevancesResponseData = {
  __typename?: 'ReassignSystemRelevancesResponseData';
  count?: Maybe<Scalars['Int']['output']>;
};

export type SummaryData = {
  count: Scalars['Int']['output'];
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  pageCount: Scalars['Int']['output'];
  start: Scalars['Int']['output'];
};

export type SystemFunction = {
  __typename?: 'SystemFunction';
  createdDate: Scalars['DateTime']['output'];
  createdUser: Scalars['String']['output'];
  enable: Scalars['Boolean']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  menuId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  showName: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedDate: Scalars['DateTime']['output'];
  updatedUser: Scalars['String']['output'];
};

export type SystemMenu = {
  __typename?: 'SystemMenu';
  cascadeId?: Maybe<Scalars['String']['output']>;
  createdDate: Scalars['DateTime']['output'];
  createdUser: Scalars['String']['output'];
  enable?: Maybe<Scalars['Boolean']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isNeedLogin?: Maybe<Scalars['Boolean']['output']>;
  isWebPage?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  pathname: Scalars['String']['output'];
  showInMenu?: Maybe<Scalars['Boolean']['output']>;
  sort: Scalars['Int']['output'];
  systemFunctions: Array<SystemFunction>;
  tableMemo?: Maybe<Scalars['String']['output']>;
  updatedDate: Scalars['DateTime']['output'];
  updatedUser: Scalars['String']['output'];
};

export type SystemRelevance = {
  __typename?: 'SystemRelevance';
  createdDate: Scalars['DateTime']['output'];
  createdUser: Scalars['String']['output'];
  enable: Scalars['Boolean']['output'];
  firstId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  memo?: Maybe<Scalars['String']['output']>;
  secondId: Scalars['String']['output'];
  thirdId?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  updatedDate: Scalars['DateTime']['output'];
  updatedUser: Scalars['String']['output'];
};

export type SystemRole = {
  __typename?: 'SystemRole';
  code: Scalars['String']['output'];
  createdDate: Scalars['DateTime']['output'];
  createdUser: Scalars['String']['output'];
  enable: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedDate: Scalars['DateTime']['output'];
  updatedUser: Scalars['String']['output'];
};

export type SystemUser = {
  __typename?: 'SystemUser';
  createdDate: Scalars['DateTime']['output'];
  createdUser: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  emailVerified?: Maybe<Scalars['Boolean']['output']>;
  enable: Scalars['Boolean']['output'];
  familyName: Scalars['String']['output'];
  givenName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  language: Scalars['String']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  providerId: Scalars['String']['output'];
  updatedDate: Scalars['DateTime']['output'];
  updatedUser: Scalars['String']['output'];
};

export type Test =
  | 'E'
  | 'S'
  | 'T';

export type UpdateSystemFunctionsData = {
  enable: Scalars['Boolean']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  menuId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  showName: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type UpdateSystemFunctionsInput = {
  dataList: Array<UpdateSystemFunctionsData>;
};

export type UpdateSystemFunctionsResponse = BaseResponse & {
  __typename?: 'UpdateSystemFunctionsResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result: Array<SystemFunction>;
  statusCode: Scalars['Int']['output'];
};

export type UpdateSystemMenusData = {
  cascadeId?: InputMaybe<Scalars['String']['input']>;
  enable: Scalars['Boolean']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isNeedLogin: Scalars['Boolean']['input'];
  isWebPage: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
  pathname: Scalars['String']['input'];
  showInMenu: Scalars['Boolean']['input'];
  sort: Scalars['Int']['input'];
  tableMemo?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSystemMenusInput = {
  dataList: Array<UpdateSystemMenusData>;
};

export type UpdateSystemMenusResponse = BaseResponse & {
  __typename?: 'UpdateSystemMenusResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result: Array<SystemMenu>;
  statusCode: Scalars['Int']['output'];
};

export type UpdateSystemRolesData = {
  code: Scalars['String']['input'];
  enable: Scalars['Boolean']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UpdateSystemRolesInput = {
  dataList: Array<UpdateSystemRolesData>;
};

export type UpdateSystemRolesResponse = BaseResponse & {
  __typename?: 'UpdateSystemRolesResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result: Array<SystemRole>;
  statusCode: Scalars['Int']['output'];
};

export type UpdateSystemUsersData = {
  accountId?: InputMaybe<Scalars['String']['input']>;
  displayName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  emailVerified?: InputMaybe<Scalars['Boolean']['input']>;
  enable: Scalars['Boolean']['input'];
  familyName: Scalars['String']['input'];
  givenName: Scalars['String']['input'];
  id: Scalars['String']['input'];
  language: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  picture?: InputMaybe<Scalars['String']['input']>;
  provider: Scalars['String']['input'];
  providerId: Scalars['String']['input'];
};

export type UpdateSystemUsersInput = {
  dataList: Array<UpdateSystemUsersData>;
};

export type UpdateSystemUsersResponse = BaseResponse & {
  __typename?: 'UpdateSystemUsersResponse';
  code: Scalars['Int']['output'];
  message: Array<Scalars['String']['output']>;
  result: Array<SystemUser>;
  statusCode: Scalars['Int']['output'];
};
