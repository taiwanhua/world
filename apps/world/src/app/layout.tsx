import "./globals.css";
import { CssBaseline } from "@mui/material";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import MuiThemeProvider from "@/frontend/components/providers/MuiThemeProvider/MuiThemeProvider";
import { resume } from "@/content/resume";
import DefaultLayout from "@/frontend/components/layouts/DefaultLayout/DefaultLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: `${resume.name} ${resume.englishName}｜${resume.title}｜Arhua's World`,
  description: resume.summary,
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="zh-Hant">
      <body className={`${inter.className} ${inter.variable}`}>
        <MuiThemeProvider>
          <CssBaseline enableColorScheme />
          <DefaultLayout>{children}</DefaultLayout>
        </MuiThemeProvider>
      </body>
    </html>
  );
}
