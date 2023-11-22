import type { FC, PropsWithChildren } from "react";
import { memo } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useSX, type SX } from "@/frontend/hooks/theme/useSX";

export interface AboutProps {
  sx?: SX;
}

const About: FC<PropsWithChildren<AboutProps>> = ({ sx }) => {
  const paperSx = useSX(() => [{ padding: 1, margin: 2 }, sx], [sx]);

  const typographySx = useSX(
    () => ({ wordBreak: "break-word", paddingBottom: 1 }),
    [],
  );

  return (
    <Paper elevation={2} sx={paperSx}>
      <Typography component="p" sx={typographySx}>
        我是阿華，全端工程師，喜歡追劇、音樂、大自然🐛🐝👟⚾🌳🌲🍀🍁🌿🌾🌵🪴
      </Typography>
      <Typography component="p" sx={typographySx}>
        常用的技術或工具有 :
        React、Next、TypeScript、Express、GraphQL、Prisma、Git、MySQL、
        --GCP、Docker、GitHub Action
      </Typography>
      <Typography component="p" sx={typographySx}>
        <a href="104" rel="noopener noreferrer" target="_blank">
          🖥️ 制式履歷 💻
        </a>
      </Typography>
      <Typography component="p" sx={typographySx}>
        <a
          href="https://github.com/taiwanhua/world"
          rel="noopener noreferrer"
          target="_blank"
        >
          🖥️ GitHub連結 💻
        </a>
      </Typography>
    </Paper>
  );
};

export default memo(About);
