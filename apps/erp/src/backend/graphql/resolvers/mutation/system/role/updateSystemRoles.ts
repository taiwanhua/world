import type { Prisma } from "@prisma/client";
import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import { systemRoleParser } from "@/backend/graphql/parsers/system/systemRoleParser";
import type {
  MutationUpdateSystemRolesArgs,
  UpdateSystemRolesResponse,
} from "@/backend/graphql/types";
import { updateSystemRoles as updateSystemRolesService } from "@/backend/prisma/service/system/systemRole/updateSystemRoles";

export const updateSystemRoles = graphqlResolverFactory<
  never,
  MutationUpdateSystemRolesArgs,
  UpdateSystemRolesResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.mutation.updateSystemRoles"],
})(async (source, args, context) => {
  const { dataList } = args.input;
  const {
    res: {
      locals,
      locals: { updatedUser },
    },
  } = context;

  const now = new Date();

  const { data: systemRoles } = await updateSystemRolesService({
    locals,
    args: dataList.map<Prisma.system_roleUpdateArgs>((data) => {
      const { id, enable, name, code } = data;
      return {
        where: { id },
        data: {
          enable,
          name,
          code,
          // created_user: updatedUser,
          // created_date: now,
          updated_user: updatedUser,
          updated_date: now,
        },
      };
    }),
  });

  return {
    ...responseConfig.success,
    result: systemRoles.map(systemRoleParser),
  };
});
