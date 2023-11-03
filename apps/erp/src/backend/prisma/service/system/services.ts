import { systemFunctionServices } from "./systemFunction/services";
import { systemMenuServices } from "./systemMenu/services";
import { systemRelevanceServices } from "./systemRelevance/services";
import { systemRoleServices } from "./systemRole/services";
import { systemUserServices } from "./systemUser/services";

export const systemServices = {
  ...systemFunctionServices,
  ...systemMenuServices,
  ...systemRelevanceServices,
  ...systemRoleServices,
  ...systemUserServices,
};
