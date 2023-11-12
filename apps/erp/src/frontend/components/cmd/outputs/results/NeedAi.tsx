import type { FC, PropsWithChildren } from "react";
import { memo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { type SX } from "@/frontend/hooks/theme/useSX";
import { useCmdInputHistoryStore } from "@/frontend/hooks/zustand/useCmdInputHistoryStore";

export interface NeedAiProps {
  sx?: SX;
}

const NeedAi: FC<PropsWithChildren<NeedAiProps>> = () => {
  const { clearCmdInputHistory } = useCmdInputHistoryStore();
  const router = useRouter();

  useEffect(() => {
    clearCmdInputHistory();
    router.push("/need-ai");
  }, [clearCmdInputHistory, router]);

  return null;
};

export default memo(NeedAi);
