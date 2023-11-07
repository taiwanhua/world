import type { ChatCompletionMessageParam } from "openai/resources";
import { create } from "zustand";

export type ChatInputHistory = ChatCompletionMessageParam;

interface Store {
  chatInputHistory: ChatInputHistory[];
  setChatInputHistory: (chatInputHistory: ChatInputHistory[]) => void;
  pushChatInput: (chatInput: ChatInputHistory | ChatInputHistory[]) => void;
  writingChatInput: (aiContent: string) => void;
  clearChatInputHistory: () => void;
}

export const useChatInputHistoryStore = create<Store>((set, get) => ({
  chatInputHistory: [],
  setChatInputHistory: (chatInputHistory): void =>
    set(() => {
      return { chatInputHistory };
    }),
  pushChatInput: (chatInput): void =>
    set(() => {
      const preChatInputHistory = get().chatInputHistory;
      return {
        chatInputHistory: [
          ...preChatInputHistory,
          ...(Array.isArray(chatInput) ? chatInput : [chatInput]),
        ],
      };
    }),
  writingChatInput: (aiContent: string): void => {
    set(() => {
      const preChatInputHistory = get().chatInputHistory;
      const lastOne = preChatInputHistory.slice(-1);
      const others = preChatInputHistory.slice(
        0,
        preChatInputHistory.length - 1,
      );
      lastOne[0].content = `${lastOne[0].content ?? ""}${aiContent}`;
      return { chatInputHistory: [...others, ...lastOne] };
    });
  },
  clearChatInputHistory: (): void => set({ chatInputHistory: [] }),
}));
