"use client";

import { useEffect, useRef } from "react";
import type { FormEvent } from "react";
import { useChat } from "ai/react";
import SendIcon from "@mui/icons-material/Send";
import StopIcon from "@mui/icons-material/Stop";

const maxQuestionLength = 300;
const suggestions = [
  "介紹阿華的全端開發經驗",
  "他如何將 AI 導入工程流程？",
  "有哪些個人作品可以看看？",
];

export default function ChatInputHistory(): JSX.Element {
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const {
    isLoading,
    messages,
    input,
    setInput,
    handleSubmit,
    handleInputChange,
    stop,
    error,
  } = useChat({
    api: "/api/openai/streaming",
  });

  useEffect(() => {
    const output = outputRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [messages, error]);

  function submit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!input.trim() || input.length > maxQuestionLength || isLoading) return;
    handleSubmit(event);
  }

  return (
    <section aria-label="與 AI 助理圓媛對話" className="panel chat-window">
      <div className="terminal-chrome">
        <div aria-hidden="true" className="window-dots">
          <i />
          <i />
          <i />
        </div>
        <span>YUANYUAN / AI LINK</span>
        <span className="terminal-session">RESUME ASSISTANT</span>
      </div>
      <div
        aria-label="對話紀錄"
        className="chat-output"
        ref={outputRef}
        role="log"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Scroll regions need keyboard focus.
        tabIndex={0}
      >
        <div className="chat-message">
          <span aria-hidden="true" className="chat-avatar">
            ✳
          </span>
          <div className="chat-bubble">
            <span>YUANYUAN · AI ASSISTANT</span>
            <p>
              你好，我是阿華的 AI 履歷助理圓媛。
              <br />
              你想了解他的工作經歷、技術能力，還是正在探索的作品？
            </p>
            {messages.length === 0 && (
              <div className="chat-suggestions">
                {suggestions.map((question) => (
                  <button
                    key={question}
                    onClick={(): void => {
                      setInput(question);
                      inputRef.current?.focus();
                    }}
                    type="button"
                  >
                    {question} ↗
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {messages.map(({ id, role, content }) => (
          <div
            className={`chat-message ${role === "user" ? "user" : "assistant"}`}
            key={id}
          >
            <span aria-hidden="true" className="chat-avatar">
              {role === "user" ? "YOU" : "✳"}
            </span>
            <div className="chat-bubble">
              <span>{role === "user" ? "YOU" : "YUANYUAN"}</span>
              <p>{content}</p>
            </div>
          </div>
        ))}
        {Boolean(isLoading) && (
          <p className="chat-waiting" role="status">
            圓媛正在整理回覆
            <span className="cursor-block" />
          </p>
        )}
        {Boolean(error) && (
          <div className="chat-alert" role="alert">
            {error?.message}
          </div>
        )}
      </div>
      <form className="chat-form" onSubmit={submit}>
        <div className="chat-input-line">
          <textarea
            aria-describedby="chat-input-help"
            aria-invalid={input.length > maxQuestionLength}
            aria-label="輸入想問圓媛的問題"
            disabled={isLoading}
            onChange={handleInputChange}
            onKeyDown={(event): void => {
              if (
                event.key === "Enter" &&
                !event.shiftKey &&
                !event.nativeEvent.isComposing
              ) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder="輸入問題，開始一段對話…"
            ref={inputRef}
            rows={2}
            value={input}
          />
          {isLoading ? (
            <button
              aria-label="停止回覆"
              className="chat-send"
              onClick={stop}
              type="button"
            >
              <StopIcon fontSize="small" />
            </button>
          ) : (
            <button
              aria-label="傳送訊息"
              className="chat-send"
              disabled={!input.trim() || input.length > maxQuestionLength}
              type="submit"
            >
              <SendIcon fontSize="small" />
            </button>
          )}
        </div>
        <div className="chat-form-footer" id="chat-input-help">
          <span>Enter 傳送 · Shift + Enter 換行</span>
          <span>
            {input.length} / {maxQuestionLength} 字
          </span>
        </div>
      </form>
    </section>
  );
}
