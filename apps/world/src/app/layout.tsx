import "./globals.css";
import { CssBaseline } from "@mui/material";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import MuiThemeProvider from "@/frontend/components/providers/MuiThemeProvider/MuiThemeProvider";
import DefaultLayout from "@/frontend/components/layouts/DefaultLayout/DefaultLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arhua's World",
  description: "There is Arhua Ho's little world where all growth is recorded.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <MuiThemeProvider>
        <body className={inter.className}>
          <CssBaseline enableColorScheme />
          <DefaultLayout>{children}</DefaultLayout>
        </body>
      </MuiThemeProvider>
    </html>
  );
}
