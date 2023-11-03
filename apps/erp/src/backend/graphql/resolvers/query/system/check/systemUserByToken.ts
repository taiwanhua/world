import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import { systemUserParser } from "@/backend/graphql/parsers/system/systemUserParser";
import type { QuerySystemUserByTokenResponse } from "@/backend/graphql/types";
import { prisma } from "@/backend/prisma/prisma";

export const systemUserByToken = graphqlResolverFactory<
  never,
  never,
  QuerySystemUserByTokenResponse
>({
  requirePermissionPaths: [],
})(async (source, args, context) => {
  const {
    res: { locals },
  } = context;

  const userId = locals.me?.id;

  if (!userId) {
    return responseConfig.unauthorized;
  }

  const systemUser = await prisma.system_user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!systemUser) {
    return {
      ...responseConfig.userNotFound,
    };
  }

  return {
    ...responseConfig.success,
    result: systemUserParser(systemUser),
  };
});
