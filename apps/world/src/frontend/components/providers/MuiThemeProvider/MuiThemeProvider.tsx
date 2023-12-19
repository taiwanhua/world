"use client";

import type { FC, ReactNode } from "react";
import { memo } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@/frontend/hooks/theme/useTheme";

export interface MuiThemeProviderProps {
  children: ReactNode;
}

const MuiThemeProvider: FC<MuiThemeProviderProps> = ({ children }) => {
  const { theme } = useTheme();

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default memo(MuiThemeProvider);
