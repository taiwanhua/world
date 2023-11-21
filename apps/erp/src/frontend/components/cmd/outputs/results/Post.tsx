import type { FC, PropsWithChildren } from "react";
import { Fragment, memo } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useSX, type SX } from "@/frontend/hooks/theme/useSX";
import { posts } from "@/app/post/page";

export interface NotFoundProps {
  sx?: SX;
}

const NotFound: FC<PropsWithChildren<NotFoundProps>> = ({ sx }) => {
  const paperSx = useSX(() => [{ padding: 1, margin: 2 }, sx], [sx]);

  const typographySx = useSX(
    () => ({ display: "block", wordBreak: "break-all" }),
    [],
  );

  return (
    <Paper elevation={2} sx={paperSx}>
      {posts.map(({ name, date, url }) => (
        <Fragment key={url}>
          <Typography component="span" sx={typographySx}>
            <a href={url} rel="noopener noreferrer" target="_blank">
              {date} - 🖥️ {name} 💻
            </a>
          </Typography>
          <Divider />
        </Fragment>
      ))}
    </Paper>
  );
};

export default memo(NotFound);
