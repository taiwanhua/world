import md5 from "md5";
import type { Prisma } from "@prisma/client";
import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import { systemUserParser } from "@/backend/graphql/parsers/system/systemUserParser";
import type {
  MutationUpdateSystemUsersArgs,
  UpdateSystemUsersResponse,
} from "@/backend/graphql/types";
import { updateSystemUsers as updateSystemUsersService } from "@/backend/prisma/service/system/systemUser/updateSystemUsers";

export const updateSystemUsers = graphqlResolverFactory<
  never,
  MutationUpdateSystemUsersArgs,
  UpdateSystemUsersResponse
>({
  requirePermissionPaths: ["wowgo.api.graphql.mutation.updateSystemUsers"],
})(async (source, args, context) => {
  const { dataList } = args.input;
  const {
    res: {
      locals,
      locals: { updatedUser },
    },
  } = context;

  const now = new Date();

  const { data: systemUsers } = await updateSystemUsersService({
    locals,
    args: dataList.map<Prisma.system_userUpdateArgs>((data) => {
      return {
        where: { id: data.id },
        data: {
          display_name: data.displayName,
          email: data.email,
          enable: data.enable,
          family_name: data.familyName,
          given_name: data.givenName,
          language: data.language,
          locale: data.locale ?? data.language,
          account_id: data.accountId,
          provider: data.provider,
          provider_id:
            data.providerId === "" ? Date.now().toString() : data.providerId,
          email_verified: data.emailVerified ?? false,
          password: data.provider === "google" ? "" : md5(data.password), // to create other provider user no need password
          picture: data.picture,
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
    result: systemUsers.map(systemUserParser),
  };
});
