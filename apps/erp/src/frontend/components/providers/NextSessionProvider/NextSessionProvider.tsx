"use client";

import type { FC, ReactNode } from "react";
import { memo } from "react";
import { SessionProvider } from "next-auth/react";

export interface NextSessionProviderProps {
  children: ReactNode;
}

const NextSessionProvider: FC<NextSessionProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default memo(NextSessionProvider);
