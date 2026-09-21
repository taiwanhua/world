import type { FC, PropsWithChildren } from "react";
import { memo } from "react";
import Paper from "@mui/material/Paper";
import { useSX, type SX } from "@/frontend/hooks/theme/useSX";
import ResumeContent from "@/frontend/components/resume/ResumeContent";

export interface AboutProps {
  sx?: SX;
}

const About: FC<PropsWithChildren<AboutProps>> = ({ sx }) => {
  const paperSx = useSX(() => [{ padding: 2, margin: 2 }, sx], [sx]);

  return (
    <Paper elevation={2} sx={paperSx}>
      <ResumeContent compact />
    </Paper>
  );
};

export default memo(About);
