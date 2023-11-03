import { v4 as uuidv4 } from "uuid";
import type { Prisma } from "@prisma/client";
import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import { systemRoleParser } from "@/backend/graphql/parsers/system/systemRoleParser";
import type {
  MutationCreateSystemRolesArgs,
  CreateSystemRolesResponse,
} from "@/backend/graphql/types";
import { createSystemRoles as createSystemRolesService } from "@/backend/prisma/service/system/systemRole/createSystemRoles";

export const createSystemRoles = graphqlResolverFactory<
  never,
  MutationCreateSystemRolesArgs,
  CreateSystemRolesResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.mutation.createSystemRoles"],
})(async (source, args, context) => {
  const { dataList } = args.input;
  const {
    res: {
      locals,
      locals: { updatedUser },
    },
  } = context;

  const now = new Date();

  const { data: systemRoles } = await createSystemRolesService({
    locals,
    args: dataList.map<Prisma.system_roleCreateArgs>((data) => {
      const { enable, name, code } = data;
      return {
        data: {
          id: uuidv4(),
          code,
          enable,
          name,
          created_user: updatedUser,
          created_date: now,
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
