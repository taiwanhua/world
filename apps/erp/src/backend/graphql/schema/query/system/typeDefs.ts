import { systemUserSummary } from "./user/systemUserSummary";
import { systemFunctionsByToken } from "./check/systemFunctionsByToken";
import { systemMenusByToken } from "./check/systemMenusByToken";
import { systemMenuSummary } from "./menu/systemMenuSummary";
import { systemRolesByToken } from "./check/systemRolesByToken";
import { systemRoleSummary } from "./role/systemRoleSummary";
import { systemUserByToken } from "./check/systemUserByToken";
import { systemUserLoginToken } from "./check/systemUserLoginToken";
import { systemRelevanceSummary } from "./relevance/systemRelevanceSummary";

export const typeDefs = [
  systemUserSummary,
  systemFunctionsByToken,
  systemMenusByToken,
  systemMenuSummary,
  systemRolesByToken,
  systemRoleSummary,
  systemUserByToken,
  systemUserLoginToken,
  systemRelevanceSummary,
];
