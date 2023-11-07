import type { FC, KeyboardEventHandler, PropsWithChildren } from "react";
import { memo, useEffect, useRef, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FaceIcon from "@mui/icons-material/Face";
import Face3Icon from "@mui/icons-material/Face3";
import { useSX, type SX } from "@/frontend/hooks/theme/useSX";
import type { ChatInputHistory } from "@/frontend/hooks/zustand/useChatInputHistoryStore";
import { useChatInputHistoryStore } from "@/frontend/hooks/zustand/useChatInputHistoryStore";
import ChatInput from "@/frontend/components/chat/inputs/ChatInput";

const maxQuestionLength = 300;
export interface ChatInputHistoryProps {
  sx?: SX;
}

const ChatInputHistoryFC: FC<PropsWithChildren<ChatInputHistoryProps>> = ({
  sx,
}) => {
  const { chatInputHistory, pushChatInput, writingChatInput } =
    useChatInputHistoryStore();

  const boxRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (chatInputHistory.length === 0) {
      return;
    }

    boxRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [chatInputHistory]);

  const onEnterKeyDown = useCallback<
    KeyboardEventHandler<HTMLInputElement>
  >(async () => {
    if (
      inputValue.trim().length === 0 ||
      inputValue.length > maxQuestionLength
    ) {
      return;
    }
    setIsGenerating(true);
    const userInput: ChatInputHistory = { role: "user", content: inputValue };

    pushChatInput([userInput, { role: "assistant", content: "" }]);

    await fetch("/api/openai/streaming", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ prompt: [...chatInputHistory, userInput] }),
    })
      .then(async (response) => {
        if (response.ok) {
          const reader = response.body?.getReader();

          while (reader) {
            // eslint-disable-next-line no-await-in-loop
            const { value, done } = await reader.read();
            if (done) {
              setIsGenerating(false);
              break;
            }

            const chunk = new TextDecoder("utf-8").decode(value);

            writingChatInput(chunk);
            boxRef.current?.scrollTo(0, boxRef.current.scrollHeight);
          }

          setInputValue("");
          setIsGenerating(false);
          // boxRef.current?.scrollIntoView({
          //   behavior: "smooth",
          //   block: "end",
          //   inline: "end",
          // });
        }
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log("--stream error--", err));
  }, [chatInputHistory, inputValue, pushChatInput, writingChatInput]);

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
      },
    ],
    [],
  );

  return (
    <>
      <Box ref={boxRef} sx={boxSx}>
        {chatInputHistory.map(({ role, content }) => (
          <Stack
            direction="row"
            justifyContent={role === "user" ? "flex-end" : "flex-start"}
            key={`${role}-${content ?? ""}`}
            paddingBottom={1}
            paddingTop={1}
          >
            <Chip
              color={role === "user" ? "primary" : "success"}
              icon={role === "user" ? <FaceIcon /> : <Face3Icon />}
              label={content}
              sx={role === "user" ? userChipSx : aiChipSx}
            />
          </Stack>
        ))}
      </Box>
      <Box sx={inputBoxSx}>
        <ChatInput
          disabled={isGenerating}
          error={inputValue.length > 300}
          helperText={`每個問題最多 ${inputValue.length} / ${maxQuestionLength}字`}
          inputValue={inputValue}
          onEnterKeyDown={onEnterKeyDown}
          placeholder="請輸入問題，開始對話..."
          ref={inputRef}
          setInputValue={setInputValue}
          variant="outlined"
        />
      </Box>
    </>
  );
};

export default memo(ChatInputHistoryFC);
