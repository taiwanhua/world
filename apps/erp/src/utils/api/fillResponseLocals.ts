// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { GraphqlContext } from "@/backend/graphql/contexts/Context";
import { prisma } from "@/backend/prisma/prisma";
import { systemUserParser } from "@/backend/graphql/parsers/system/systemUserParser";
import { defaultUpdateUser } from "../../backend/constant/value";
import { tokenDecodedCheck } from "./tokenDecodedCheck";

/** It is a simple way to fill locals to Response, because Route handlers's NextResponse is so hard to do this */
export const fillResponseLocals = async function (
  graphqlContext: GraphqlContext,
): Promise<GraphqlContext> {
  const {
    isValid,
    jwtVerifyPayload: { id },
  } = tokenDecodedCheck(graphqlContext);

  graphqlContext.res = {
    ...graphqlContext.res,
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    cookies: graphqlContext.res?.cookies ?? {},
    locals: {
      me: null,
      updatedUser: defaultUpdateUser,
      // db: new Services(),
    },
  };

  if (!isValid) {
    return graphqlContext;
  }

  // TODO get auth info and fill in
  // const session = await getServerSession(authOptions);

  const prismaUser = await prisma.system_user.findFirst({ where: { id } });

  const user = prismaUser ? systemUserParser(prismaUser) : null;

  graphqlContext.res.locals = {
    me: user,
    updatedUser: user ? user.email : defaultUpdateUser,
    // db: new Services(),
  };

  return graphqlContext;
};
