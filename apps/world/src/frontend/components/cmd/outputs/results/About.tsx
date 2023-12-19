import type { FC, PropsWithChildren } from "react";
import { memo } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useSX, type SX } from "@/frontend/hooks/theme/useSX";

export interface AboutProps {
  sx?: SX;
}

const About: FC<PropsWithChildren<AboutProps>> = ({ sx }) => {
  const paperSx = useSX(() => [{ padding: 1, margin: 2 }, sx], [sx]);

  const typographySx = useSX(
    () => ({ wordBreak: "break-word", paddingBottom: 1, paddingTop: 1 }),
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
        {/* --GCP、Docker、GitHub Action */}
      </Typography>
      <Divider />
      <Typography component="p" sx={typographySx}>
        <a
          href={process.env.ONE_ZERO_FOUR_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          🖥️ 104 制式履歷連結 💻
        </a>
      </Typography>
      <Typography component="p" sx={typographySx}>
        <a
          href={process.env.GITHUB_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          🖥️ GitHub連結 💻
        </a>
      </Typography>
      <Divider />
      <Typography component="p" sx={typographySx}>
        <a
          href={process.env.WS_GAME_URL}
          rel="noopener noreferrer"
          target="_blank"
        >
          🎲🕹️ 來玩個小遊戲認識一下 (❁´◡`❁) 🎰🎮
        </a>
      </Typography>
    </Paper>
  );
};

export default memo(About);
