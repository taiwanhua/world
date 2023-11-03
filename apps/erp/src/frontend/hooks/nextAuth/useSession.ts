"use client";

import type { SignInOptions } from "next-auth/react";
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
  useSession as useNextAuthSession,
} from "next-auth/react";
import { useCallback } from "react";
import type { Session } from "next-auth";
import { useRouter } from "@/frontend/hooks/router/useRouter";

export interface Params {
  unauthenticatedPathName?: "/login";
}

export interface Return {
  updateSessionToken: (token: string) => void;
  data: Session | null;
  currentToken: string | undefined;
  status: "loading" | "authenticated" | "unauthenticated";
  nextAuthSignIn: typeof nextAuthSignIn;
  nextAuthSignOut: typeof nextAuthSignOut;
  wowgoSignIn: (
    signInOptions: SignInOptions,
    signInData: Record<string, string>,
  ) => Promise<void>;
  googleSignIn: (signInOptions: SignInOptions) => Promise<void>;
  credentialsSignIn: (signInOptions: SignInOptions) => Promise<void>;
}

export function useSession({
  unauthenticatedPathName = "/login",
}: Params): Return {
  const { router, asPath } = useRouter();

  const { update, data, status } = useNextAuthSession({
    required: false, // if true, `status` can only be "loading" or "authenticated"
    onUnauthenticated: () => {
      router.replace(`${unauthenticatedPathName}?redirect=${asPath}`);
    },
  });

  const currentToken = data?.token;

  const updateSessionToken = useCallback(
    (token: string) => {
      void update({ token });
    },
    [update],
  );

  const wowgoSignIn = useCallback<Return["wowgoSignIn"]>(
    async (signInOptions, signInData) => {
      await nextAuthSignIn("wowgo", {
        ...signInOptions,
        ...signInData,
      });
    },
    [],
  );

  const googleSignIn = useCallback<Return["googleSignIn"]>(
    async (signInOptions) => {
      await nextAuthSignIn("google", signInOptions);
    },
    [],
  );

  const credentialsSignIn = useCallback<Return["credentialsSignIn"]>(
    async (signInOptions) => {
      // to next-auth oauth page
      await nextAuthSignIn("credentials", signInOptions);
    },
    [],
  );

  return {
    updateSessionToken,
    data,
    currentToken,
    status,
    nextAuthSignIn,
    nextAuthSignOut,
    wowgoSignIn,
    googleSignIn,
    credentialsSignIn,
  };
}
