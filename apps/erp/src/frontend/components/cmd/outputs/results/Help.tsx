import type { FC, PropsWithChildren } from "react";
import { memo } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import type { Command } from "@/frontend/hooks/zustand/useCmdInputHistoryStore";
import { useSX, type SX } from "@/frontend/hooks/theme/useSX";

export interface HelpProps {
  sx?: SX;
}

interface CommandConfig {
  command: Command;
  detail: string;
}

export const commands: CommandConfig[] = [
  { command: "help", detail: "show command and details" },
  { command: "clear", detail: "clear terminal" },
  { command: "about", detail: "show information about me" },
  { command: "post", detail: "show my posts" },
  {
    command: "need-ai",
    detail:
      "contact my AI secretary, basically I don't pay him a salary, so you need to communicate with him politely, otherwise he will not pay much attention to your questions.",
  },
];

const Help: FC<PropsWithChildren<HelpProps>> = ({ sx }) => {
  const paperSx = useSX(() => [{ padding: 1, margin: 2 }, sx], [sx]);

  const typographyCommandSx = useSX(
    () => ({ wordBreak: "break-word", minWidth: 100 }),
    [],
  );

  const typographyDetailSx = useSX(() => ({ wordBreak: "break-word" }), []);

  return (
    <Paper elevation={2} sx={paperSx}>
      <List>
        {commands.map(({ command, detail }) => (
          <ListItem disableGutters key={command}>
            <Typography
              color="#ef4440"
              component="span"
              sx={typographyCommandSx}
            >
              {command}
            </Typography>
            <Typography component="span" sx={typographyDetailSx}>
              {detail}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default memo(Help);
