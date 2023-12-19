import type { FC, PropsWithChildren } from "react";
import { Fragment, memo } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useSX, type SX } from "@/frontend/hooks/theme/useSX";

export interface PostProps {
  sx?: SX;
}

interface PostData {
  name: string;
  url: string;
  date: string;
}

export const posts: PostData[] = [
  {
    name: "雜七雜八廣記系列 第十一回 : 詞法環境(Lexical environment)、 變數環境(variable environment)、閉包 closure",
    url: "https://ithelp.ithome.com.tw/articles/10340943",
    date: "2023-12-17",
  },
  {
    name: "雜七雜八廣記系列 第十回 : var 、 let 、const",
    url: "https://ithelp.ithome.com.tw/articles/10340930",
    date: "2023-12-11",
  },
  {
    name: "雜七雜八廣記系列 第九回 : Scope、Scope chain",
    url: "https://ithelp.ithome.com.tw/articles/10340927",
    date: "2023-12-01",
  },
  {
    name: "凡走過必留下痕跡 TypeScript 系列 第三回 : Narrowing 概念",
    url: "https://ithelp.ithome.com.tw/articles/10340558",
    date: "2023-11-03",
  },
  {
    name: "凡走過必留下痕跡 TypeScript 系列 第二回 : 基本原始(The primitives)型態",
    url: "https://ithelp.ithome.com.tw/articles/10340557",
    date: "2023-11-02",
  },
  {
    name: "凡走過必留下痕跡 TypeScript 系列 第一回 : 前言&初識TypeScript",
    url: "https://ithelp.ithome.com.tw/articles/10220130",
    date: "2023-11-01",
  },
];

const Post: FC<PropsWithChildren<PostProps>> = ({ sx }) => {
  const paperSx = useSX(() => [{ padding: 1, margin: 2 }, sx], [sx]);

  const typographySx = useSX(
    () => ({ display: "block", wordBreak: "break-all" }),
    [],
  );

  return (
    <Paper elevation={2} sx={paperSx}>
      {posts.map(({ name, date, url }) => (
        <Fragment key={url}>
          <Typography component="span" sx={typographySx}>
            <a href={url} rel="noopener noreferrer" target="_blank">
              {date} - 🖥️ {name} 💻
            </a>
          </Typography>
          <Divider />
        </Fragment>
      ))}
    </Paper>
  );
};

export default memo(Post);
