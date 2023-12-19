import type { FC, PropsWithChildren } from "react";
import { memo, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import { useSX, type SX } from "@/frontend/hooks/theme/useSX";
import CmdInputHistory from "@/frontend/components/cmd/outputs/CmdInputHistory";

export interface CmdProps {
  sx?: SX;
}

const timeout = 2000;

const Cmd: FC<PropsWithChildren<CmdProps>> = ({ sx }) => {
  const [open, setOpen] = useState(false);

  const cardSx = useSX(
    () => [
      {
        padding: 1,
        marginTop: 3,
        height: "calc(70vh - 6.25rem)",
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

export default memo(Cmd);
