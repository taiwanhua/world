import { create } from "zustand";

type Union<T> = T | (string & Record<never, never>);

export type Command =
  | "help"
  | "clear"
  | "about"
  | "post"
  | "need-ai"
  | "not-found";

export type CmdInputHistory = Union<Command>;

interface Store {
  cmdInputHistory: CmdInputHistory[];
  setCmdInputHistory: (cmdInputHistory: CmdInputHistory[]) => void;
  pushCmdInput: (cmdInput: CmdInputHistory) => void;
  clearCmdInputHistory: () => void;
}

export const useCmdInputHistoryStore = create<Store>((set, get) => ({
  cmdInputHistory: [],
  setCmdInputHistory: (cmdInputHistory): void =>
    set(() => {
      return { cmdInputHistory };
    }),
  pushCmdInput: (cmdInput): void =>
    set(() => {
      const preCmdInputHistory = get().cmdInputHistory;
      return { cmdInputHistory: [...preCmdInputHistory, cmdInput] };
    }),
  clearCmdInputHistory: (): void => set({ cmdInputHistory: [] }),
}));
