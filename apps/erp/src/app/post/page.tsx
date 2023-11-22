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
import { posts } from "@/frontend/components/cmd/outputs/results/Post";

const timeout = 2000;

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
