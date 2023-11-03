import type { GraphqlContext } from "@/backend/graphql/contexts/Context";
import type { JwtVerifyPayload } from "@/utils/strategy/jwtStrategy/jwtVerifyToken";
import { jwtVerifyToken } from "@/utils/strategy/jwtStrategy/jwtVerifyToken";

export interface Return {
  isValid: boolean;
  jwtVerifyPayload: JwtVerifyPayload;
  token: string;
}

export const tokenDecodedCheck = function (
  graphqlContext: GraphqlContext,
): Return {
  const authorization =
    graphqlContext.request.headers.get("authorization") ?? "";

  if (authorization === "") {
    return {
      isValid: true,
      token: "",
      jwtVerifyPayload: { expiresIn: 0, id: "" },
    };
  }

  const parts = authorization.split(" ");

  if (parts.length !== 2 || parts[0].toLowerCase() !== "bearer") {
    return {
      isValid: false,
      token: authorization,
      jwtVerifyPayload: { expiresIn: 0, id: "" },
    };
  }

  const tokenDecoded = jwtVerifyToken(parts[1]);

  if (!tokenDecoded || typeof tokenDecoded === "string") {
    return {
      isValid: false,
      token: authorization,
      jwtVerifyPayload: { expiresIn: 0, id: "" },
    };
  }

  if (!tokenDecoded.exp || tokenDecoded.exp * 1000 < Date.now()) {
    return {
      isValid: false,
      token: authorization,
      jwtVerifyPayload: tokenDecoded,
    };
  }

  // check token in DB table
  //   const res = await context.DB.wowgo.prisma.token.findUnique({
  //     where: {
  //       id: parts[1],
  //     },
  //   });

  //   if (res === null) {
  //     return false;
  //   }

  return {
    isValid: true,
    token: authorization,
    jwtVerifyPayload: tokenDecoded,
  };
};
