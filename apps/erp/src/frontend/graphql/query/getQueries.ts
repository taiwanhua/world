import type { WowgoGraphqlClass } from "@/frontend/graphql/WowgoGraphql";
import type { SystemFunctionsByTokenBind } from "./system/check/systemFunctionsByToken";
import { systemFunctionsByToken } from "./system/check/systemFunctionsByToken";
import type { SystemMenusByTokenBind } from "./system/check/systemMenusByToken";
import { systemMenusByToken } from "./system/check/systemMenusByToken";
import type { SystemRolesByTokenBind } from "./system/check/systemRolesByToken";
import { systemRolesByToken } from "./system/check/systemRolesByToken";
import type { SystemUserByTokenBind } from "./system/check/systemUserByToken";
import { systemUserByToken } from "./system/check/systemUserByToken";
import type { SystemUserLoginByTokenBind } from "./system/check/systemUserLoginToken";
import { systemUserLoginToken } from "./system/check/systemUserLoginToken";

interface Return {
  systemFunctionsByToken: SystemFunctionsByTokenBind;
  systemMenusByToken: SystemMenusByTokenBind;
  systemRolesByToken: SystemRolesByTokenBind;
  systemUserByToken: SystemUserByTokenBind;
  systemUserLoginToken: SystemUserLoginByTokenBind;
}

export function getQueries(graphqlClass: WowgoGraphqlClass): Return {
  return {
    systemFunctionsByToken: systemFunctionsByToken.bind(graphqlClass),
    systemMenusByToken: systemMenusByToken.bind(graphqlClass),
    systemRolesByToken: systemRolesByToken.bind(graphqlClass),
    systemUserByToken: systemUserByToken.bind(graphqlClass),
    systemUserLoginToken: systemUserLoginToken.bind(graphqlClass),
  };
}
