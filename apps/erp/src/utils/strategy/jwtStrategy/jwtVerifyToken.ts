import { verify } from "jsonwebtoken";
import type { JwtPayload } from "./jwtSignToken";

export interface JwtVerifyPayload extends JwtPayload {
  expiresIn: number;
}

export function jwtVerifyToken(token: string): JwtVerifyPayload | string {
  let decode: JwtVerifyPayload | string = "";
  try {
    decode = verify(
      token,
      process.env.NEXTAUTH_SECRET ?? "",
    ) as JwtVerifyPayload;
  } catch (err) {
    // console.log(err)
    // eslint-disable-next-line no-console
    console.log("jwtVerifyToken error");
  }

  return decode;
}
