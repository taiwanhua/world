import type { FC, PropsWithChildren } from "react";
import { memo } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useSX, type SX } from "@/frontend/hooks/theme/useSX";

export interface NotFoundProps {
  sx?: SX;
  command: string;
}

const NotFound: FC<PropsWithChildren<NotFoundProps>> = ({ sx, command }) => {
  const paperSx = useSX(() => [{ padding: 1, margin: 2 }, sx], [sx]);

  const typographySx = useSX(() => ({ wordBreak: "break-all" }), []);

  return (
    <Paper elevation={2} sx={paperSx}>
      <Typography color="#ef4440" component="span" sx={typographySx}>
        command not found: {command}
      </Typography>
    </Paper>
  );
};

export default memo(NotFound);
