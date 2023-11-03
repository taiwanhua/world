"use client";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import Cmd from "@/frontend/components/cmd/Cmd";

export default function Home(): JSX.Element {
  return (
    <Box padding={3}>
      <Typography marginBottom={1}>
        Hi 大家好👋 我是阿華，歡迎來到我的世界👀，
        進一步獲得更多資訊請在下方輸入指令👇👇👇
      </Typography>
      <Typography color="burlywood" marginBottom={2}>
        <Link href="/need-ai"> 或是點擊聯繫我的私人小秘書🤙👨‍💼</Link>
      </Typography>
      <Cmd />
    </Box>
  );
}
