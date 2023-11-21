import type { ReactNode } from "react";
import type { Command } from "@/frontend/hooks/zustand/useCmdInputHistoryStore";
import Help from "@/frontend/components/cmd/outputs/results/Help";
import Clear from "@/frontend/components/cmd/outputs/results/Clear";
import NeedAi from "@/frontend/components/cmd/outputs/results/NeedAi";
import Post from "@/frontend/components/cmd/outputs/results//Post";

export type MappingCommand = Exclude<Command, "not-found">;

export const commandMapping: Record<MappingCommand, ReactNode> = {
  about: "",
  clear: <Clear />,
  help: <Help />,
  "need-ai": <NeedAi />,
  post: <Post />,
};
