import md5 from "md5";
import { responseConfig } from "@/backend/constant/responseConfig";
import { graphqlResolverFactory } from "@/backend/factory/graphqlResolverFactory";
import type {
  QuerySystemUserLoginTokenArgs,
  QuerySystemUserLoginTokenResponse,
} from "@/backend/graphql/types";
import { prisma } from "@/backend/prisma/prisma";
import { isSuperAdmin } from "@/utils/api/isSuperAdmin";
import { jwtSignToken } from "@/utils/strategy/jwtStrategy/jwtSignToken";

export const systemUserLoginToken = graphqlResolverFactory<
  never,
  QuerySystemUserLoginTokenArgs,
  QuerySystemUserLoginTokenResponse
>({
  requirePermissionPaths: [],
})(async (source, args, _context) => {
  const {
    input: { email, password },
  } = args;

  const passwordMD5 = md5(password);

  const user = await prisma.system_user.findFirst({
    where: {
      email,
      password: passwordMD5,
    },
  });

  if (!user) {
    return responseConfig.loginEmailPasswordError;
  }

  if (user.enable || isSuperAdmin(user.provider_id)) {
    // pass : means is enable or is super admin
  } else {
    return responseConfig.userIsDisable;
  }

  const token = jwtSignToken({ id: user.id });

  return {
    ...responseConfig.success,
    result: token,
  };
});
