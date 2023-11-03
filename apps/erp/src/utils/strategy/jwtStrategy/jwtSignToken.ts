import type { JwtPayload as JwtWebTokenPayload } from "jsonwebtoken";
import { sign } from "jsonwebtoken";
import ms from "ms";

export interface JwtPayload extends JwtWebTokenPayload {
  id: string;
}

export function jwtSignToken(payload: JwtPayload): string {
  return sign(payload, process.env.NEXTAUTH_SECRET ?? "", {
    expiresIn: ms(process.env.NEXTAUTH_JWT_EXPIRE_TIME ?? "") / 1000,
  });
}
