"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chat from "@/frontend/components/chat/Chat";
import { useSX } from "@/frontend/hooks/theme/useSX";

export default function NeedAi(): JSX.Element {
  const typographySx = useSX(
    () => ({
      wordBreak: "break-all",
      fontSize: "0.4rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
    }),
    [],
  );

  return (
    <Box padding={3}>
      <Typography color="#ef4440" component="div" sx={typographySx}>
        <pre>
          {`
   _____  .___        _________                            __                       
   /  _  \\ |   |      /   _____/ ____   ___________   _____/  |______ _______ ___.__.
  /  /_\\  \\|   |      \\_____  \\_/ __ \\_/ ___\\_  __ \\_/ __ \\   __\\__  \\\\_  __ <   |  |
 /    |    \\   |      /        \\  ___/\\  \\___|  | \\/\\  ___/|  |  / __ \\|  | \\/\\___  |
 \\____|__  /___|     /_______  /\\___  >\\___  >__|    \\___  >__| (____  /__|   / ____|
         \\/                  \\/     \\/     \\/            \\/          \\/       \\/     
         `}
        </pre>
      </Typography>

      <Chat />
    </Box>
  );
}
