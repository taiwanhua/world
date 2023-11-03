import type { NextRequest } from "next/server";
// import type {
//   system_menu as PrismaSystemMenu,
//   system_function as PrismaSystemFunction,
// } from "@prisma/client";
// import { intersection, difference, uniq } from "lodash-es";
import type { NextApiRequest } from "next";
import type { CustomResponse } from "@/backend/types/api/CustomResponse";
import type { BaseResponse, SystemMenu } from "@/backend/graphql/types";
import type { PermissionPath } from "@/backend/constant/permission/spec";
import { generatePermissionPath } from "@/utils/generate/generatePermissionPath";
import { systemMenuParser } from "@/backend/graphql/parsers/system/systemMenuParser";
import { userFunctions } from "@/backend/prisma/service/system/systemRelevance/userFunctions";
import { userMenus } from "@/backend/prisma/service/system/systemRelevance/userMenus";
// import { prisma } from "@/backend/prisma/prisma";
import { responseConfig } from "@/backend/constant/responseConfig";

export interface Params {
  /**
   * the permission path which user need, example :
   *
   * [a, b] =\> a && b
   *
   * [[a, b], [c, d]] =\> (a || b) && (c || d)
   *
   * [[], [a,b]] =\> a || b
   */
  requirePermissionPaths?: (PermissionPath | PermissionPath[])[];
}

export const apiValidation = async function (
  req: NextRequest | NextApiRequest,
  res: CustomResponse,
  params: Params,
): Promise<BaseResponse> {
  const { requirePermissionPaths = [] } = params;

  if (requirePermissionPaths.length === 0) {
    // allow all user
    return responseConfig.success;
  }

  const {
    locals: { me },
    locals,
  } = res;

  if (!me) {
    return responseConfig.notAllowGuest;
  }

  const { data: userSystemFunctions } = await userFunctions({
    locals,
    args: {},
  });

  const isHaveAllApiPermission = userSystemFunctions.some(
    ({ name }) => name === "api*",
  );

  if (isHaveAllApiPermission) {
    return responseConfig.success;
  }

  //   // If we want to get hint about requirePermissionPaths which is not in deploy environment's DB
  //   // PS. To promise all permission path is match DB data, not only match data when build or deploy
  // const allMenus = await prisma.system_menu.findMany();
  // const allFunctions = await prisma.system_function.findMany();

  // const allPopulatedMenus: SystemMenu[] =
  //   allFunctions.length === 0
  //     ? allMenus.map(systemMenuParser)
  //     : allMenus.map<SystemMenu>((menu: PrismaSystemMenu) => {
  //         return systemMenuParser({
  //           ...menu,
  //           systemFunctions: allFunctions.filter(
  //             (systemFunction: PrismaSystemFunction) =>
  //               systemFunction.menu_id === menu.id,
  //           ),
  //         });
  //       });

  // const allPermissionPath =
  //   generatePermissionPath<PermissionPath>(allPopulatedMenus);

  // const flatRequirePermissionPaths = uniq(requirePermissionPaths.flat());
  // const missRequirePermissionPathError = `Please check database's system_menu and system_function table (check format example: 'menu_name.sub_menu_name.sub_sub_menu_name.function_name'), the check list is : {{ `;

  // const intersectionPaths = intersection(
  //   flatRequirePermissionPaths,
  //   allPermissionPath,
  // );
  // const isMissRequirePermissionPath =
  //   intersectionPaths.length < flatRequirePermissionPaths.length;

  // if (isMissRequirePermissionPath) {
  //   const differencePaths = difference(
  //     flatRequirePermissionPaths,
  //     intersectionPaths,
  //   );

  //   return {
  //     ...responseConfig.missRequirePermissionPath,
  //     message: [
  //       `${missRequirePermissionPathError} ${differencePaths.join(", ")} }}`,
  //     ],
  //   };
  // }

  const { data: userSystemMenus } = await userMenus({ locals, args: {} });

  const parsedSystemMenus = userSystemMenus.map<SystemMenu>(
    (userSystemMenu) => {
      return systemMenuParser(userSystemMenu);
    },
  );

  const userPermissionPath =
    generatePermissionPath<PermissionPath>(parsedSystemMenus);

  const invalidateErrors: string[] = [];

  requirePermissionPaths.forEach((element) => {
    let target = element;

    if (!Array.isArray(target)) {
      target = [target];
    }

    const isValidated =
      target.length > 0
        ? target.some((path) => userPermissionPath.includes(path))
        : true;

    if (!isValidated) {
      invalidateErrors.push(`( ${target.join(" || ")} )`);
    }
  });

  if (invalidateErrors.length === 0) {
    return responseConfig.success;
  }

  const invalidateError = `To use this api, the current user should at least have : {{ ${invalidateErrors.join(
    " && ",
  )} }}`;

  return { ...responseConfig.permissionDenied, message: [invalidateError] };
};
