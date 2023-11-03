import type { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import ms from "ms";
import Credentials from "next-auth/providers/credentials";
import GoogleProviders from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import md5 from "md5";
import { loginSystemUser } from "@/backend/prisma/service/system/systemUser/loginSystemUser";
import { jwtSignToken } from "@/utils/strategy/jwtStrategy/jwtSignToken";
import { prisma } from "@/backend/prisma/prisma";
import { isSuperAdmin } from "@/utils/api/isSuperAdmin";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProviders({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),

    Credentials({
      id: "wowgo",
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Sign in with Wowgo",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const [email, password] = [credentials?.email, credentials?.password];

        if (!email || !password) {
          return null;
        }

        const passwordMD5 = md5(password);

        const user = await prisma.system_user.findFirst({
          where: {
            email,
            password: passwordMD5,
          },
        });

        if (!user) {
          return null;
        }

        if (!user.enable && !isSuperAdmin(user.provider_id)) {
          return null;
        }

        return user;
      },
    }),
  ],
  //https://javascript.plainenglish.io/how-to-create-a-custom-sign-in-page-in-next-auth-1612dc17beb7
  // pages:{},
  pages: {
    signIn: "/login",
  },
  // debug: false,
  session: {
    maxAge: ms(process.env.NEXTAUTH_JWT_EXPIRE_TIME ?? "") / 1000,
  },
  callbacks: {
    async jwt({ token, account, trigger, session, profile, user }) {
      console.log(
        "jwt function",
        JSON.stringify(token),
        JSON.stringify(account),
        JSON.stringify(trigger),
        JSON.stringify(session),
        JSON.stringify(profile),
        JSON.stringify(user),
      );
      if (trigger === "signIn") {
        const provider = account?.provider;
        const email = token.email ?? "";
        console.log(
          "provider",
          provider,
          JSON.stringify(token),
          JSON.stringify(account),
          JSON.stringify(trigger),
          JSON.stringify(session),
          JSON.stringify(profile),
          JSON.stringify(user),
        );
        switch (provider) {
          case "google": {
            const { data } = await loginSystemUser({
              args: {
                email,
                provider,
                provider_id: account?.providerAccountId ?? "",
                family_name: profile?.family_name ?? "",
                given_name: profile?.given_name ?? "",
                locale: profile?.locale ?? "",
                picture: profile?.picture ?? "",
              },
              locals: {
                me: null,
                updatedUser: email,
              },
            });
            // token.jwtToken = jwtSignToken({ id: data.id });
            break;
          }
          case "wowgo": {
            // token.jwtToken = jwtSignToken({ id: user.id });
            break;
          }
          default:
            break;
        }
      }

      if (trigger === "update") {
        token.updateSession = session;
      }

      return token;
    },
    session({ session, token, user }) {
      console.log("user", user);
      const nextSession = {
        ...session,
        // token: token.jwtToken as string,
        // ...(token.updateSession as Record<string, unknown>),
      };

      return nextSession;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
