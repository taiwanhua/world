import type { FC, PropsWithChildren } from "react";
import { memo, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import { useSX, type SX } from "@/frontend/hooks/theme/useSX";
import CmdInputHistory from "@/frontend/components/cmd/outputs/CmdInputHistory";

export interface ChatProps {
  sx?: SX;
}

const timeout = 2000;

const Chat: FC<PropsWithChildren<ChatProps>> = ({ sx }) => {
  const [open, setOpen] = useState(false);

  const cardSx = useSX(
    () => [
      {
        padding: 1,
        marginTop: 3,
        height: "calc(60vh - 100px)",
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
        <CmdInputHistory initialCommand="about" />
      </Card>
    </Collapse>
  );
};

export default memo(Chat);
