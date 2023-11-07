import type { FC, KeyboardEventHandler, PropsWithChildren } from "react";
import { memo, useEffect, useRef, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import { useSX, type SX } from "@/frontend/hooks/theme/useSX";
import type { ChatInputHistory } from "@/frontend/hooks/zustand/useChatInputHistoryStore";
import { useChatInputHistoryStore } from "@/frontend/hooks/zustand/useChatInputHistoryStore";
import ChatInput from "@/frontend/components/chat/inputs/ChatInput";

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
    if (inputValue.trim().length === 0) {
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
          }
          setIsGenerating(false);
        }
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log("--stream error--", err));
  }, [chatInputHistory, inputValue, pushChatInput, writingChatInput]);

  const boxSx = useSX(() => [{ paddingBottom: 2 }, sx], [sx]);

  return (
    <>
      <Box ref={boxRef} sx={boxSx}>
        {chatInputHistory.map(({ role, content }) => (
          <>
            {role}:{content}
          </>
        ))}
      </Box>
      <Box>
        <ChatInput
          disabled={isGenerating}
          inputValue={inputValue}
          onEnterKeyDown={onEnterKeyDown}
          ref={inputRef}
          setInputValue={setInputValue}
          variant="outlined"
        />
      </Box>
    </>
  );
};

export default memo(ChatInputHistoryFC);
