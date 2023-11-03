// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    token?: string;
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface Profile {
    sub?: string;
    name?: string;
    email?: string;
    image?: string;

    //google profile
    email_verified?: boolean;
    picture?: string;
    given_name?: string;
    family_name?: string;
    locale?: string;
    iat?: number;
    exp?: number;
  }
}
