"use client";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import { useEffect, useState } from "react";
import ExternalLinkButton from "@/frontend/components/links/ExternalLinkButton";
import { useSX } from "@/frontend/hooks/theme/useSX";

const timeout = 2000;

interface PostData {
  name: string;
  url: string;
  date: string;
}

export const posts: PostData[] = [
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

export default function Post(): JSX.Element {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const linkSX = useSX(() => ({ marginLeft: 0 }), []);
  const tableContainerSX = useSX(() => ({ height: "70vh" }), []);

  return (
    <Box padding={3}>
      <Collapse in={open} timeout={timeout}>
        <TableContainer component={Paper} sx={tableContainerSX}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>貼文名稱</TableCell>
                <TableCell>日期</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map(({ name, url, date }) => (
                <TableRow key={name}>
                  <TableCell>
                    <ExternalLinkButton href={url} label={name} sx={linkSX} />
                  </TableCell>
                  <TableCell>{date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </Box>
  );
}
