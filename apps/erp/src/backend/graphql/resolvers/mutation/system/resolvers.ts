import { resolvers as SystemFunctionResolver } from "./function/resolvers";
import { resolvers as SystemMenuResolver } from "./menu/resolvers";
import { resolvers as SystemRelevanceResolver } from "./relevance/resolvers";
import { resolvers as systemRoleResolver } from "./role/resolvers";
import { resolvers as SystemUserResolver } from "./user/resolvers";

export const resolvers = {
  ...SystemFunctionResolver,
  ...SystemMenuResolver,
  ...SystemRelevanceResolver,
  ...systemRoleResolver,
  ...SystemUserResolver,
};
