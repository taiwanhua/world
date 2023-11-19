import type { FC, PropsWithChildren } from "react";
import { memo, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FaceIcon from "@mui/icons-material/Face";
import Face3Icon from "@mui/icons-material/Face3";
import { useChat } from "ai/react";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import SendIcon from "@mui/icons-material/Send";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import { useSX, type SX } from "@/frontend/hooks/theme/useSX";

const maxQuestionLength = 300;
export interface ChatInputHistoryProps {
  sx?: SX;
}

const ChatInputHistoryFC: FC<PropsWithChildren<ChatInputHistoryProps>> = ({
  sx,
}) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { isLoading, messages, input, handleSubmit, handleInputChange, stop } =
    useChat({
      api: "/api/openai/streaming",
      onFinish: () => {
        inputRef.current?.focus();
      },
    });

  useEffect(() => {
    if (messages.length === 0) {
      return;
    }

    boxRef.current?.scrollTo({
      top: boxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const boxSx = useSX(
    () => [
      {
        padding: 1,
        height: "calc( 100% - 10rem)",
        overflow: "auto",
      },
      sx,
    ],
    [sx],
  );
  const inputBoxSx = useSX(() => [{ height: "10rem", padding: 1 }], []);
  const userChipSx = useSX(
    () => [
      {
        height: "auto",
        display: "block",
        padding: 1,
        width: "fit-content",
        "& .MuiChip-label": {
          display: "block",
          whiteSpace: "normal",
        },
      },
    ],
    [],
  );
  const aiChipSx = useSX(
    () => [
      {
        height: "auto",
        display: "block",
        padding: 1,
        width: "fit-content",
        "& .MuiChip-label": {
          display: "block",
          whiteSpace: "normal",
        },
        "& .MuiChip-icon": {
          marginRight: 1,
        },
      },
    ],
    [],
  );
  const buttonGroupSx = useSX(
    () => [{ width: "2.5rem", height: "8rem", justifyContent: "center" }],
    [],
  );
  const inputSx = useSX(() => [{ width: "calc(100% - 2.5rem)" }], []);

  return (
    <>
      <Box ref={boxRef} sx={boxSx}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          paddingBottom={1}
          paddingTop={1}
        >
          <Chip
            color="success"
            icon={<Face3Icon />}
            label="您好，我是秘書圓媛，可以問我有關於我老闆阿華的資訊"
            sx={aiChipSx}
          />
        </Stack>

        {messages.map(({ id, role, content }) => {
          const isUser = role === "user";

          return (
            <Stack
              direction="row"
              justifyContent={isUser ? "flex-end" : "flex-start"}
              key={id}
              paddingBottom={1}
              paddingTop={1}
            >
              <Chip
                color={isUser ? "primary" : "success"}
                icon={isUser ? <FaceIcon /> : <Face3Icon />}
                label={content}
                sx={isUser ? userChipSx : aiChipSx}
              />
            </Stack>
          );
        })}

        {isLoading ? <CircularProgress color="secondary" /> : null}
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={inputBoxSx}>
        <TextField
          disabled={isLoading}
          error={input.length > maxQuestionLength}
          helperText={`每個問題最多 ${input.length} / ${maxQuestionLength}字`}
          label="免付費諮詢"
          maxRows={4}
          minRows={4}
          multiline
          onChange={handleInputChange}
          placeholder="請輸入問題，開始對話..."
          ref={inputRef}
          sx={inputSx}
          value={input}
          variant="outlined"
        />
        <ButtonGroup orientation="vertical" sx={buttonGroupSx}>
          <Tooltip title="傳送">
            <IconButton color="success" type="submit">
              <SendIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="中斷">
            <IconButton color="error" onClick={stop} type="button">
              <DoNotDisturbAltIcon />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default memo(ChatInputHistoryFC);
