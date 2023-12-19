import type { FC, PropsWithChildren } from "react";
import { memo, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import { useSX, type SX } from "@/frontend/hooks/theme/useSX";
import ChatInputHistory from "@/frontend/components/chat/ChatInputHistory";

export interface ChatProps {
  sx?: SX;
}

const timeout = 2000;

const Chat: FC<PropsWithChildren<ChatProps>> = ({ sx }) => {
  const [open, setOpen] = useState(false);

  const cardSx = useSX(
    () => [
      {
        height: "calc(70vh - 6.25rem)",
        overflow: "auto",
        borderColor: (theme) => theme.palette.grey[500],
      },
      sx,
    ],
    [sx],
  );

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <Collapse in={open} timeout={timeout}>
      <Card sx={cardSx} variant="outlined">
        <ChatInputHistory />
      </Card>
    </Collapse>
  );
};

export default memo(Chat);
