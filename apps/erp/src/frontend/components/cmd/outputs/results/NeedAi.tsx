import type { FC, PropsWithChildren } from "react";
import { memo, useEffect } from "react";
import { type SX } from "@/frontend/hooks/theme/useSX";
import { useRouter } from "@/frontend/hooks/router/useRouter";
import { useCmdInputHistoryStore } from "@/frontend/hooks/zustand/useCmdInputHistoryStore";

export interface NeedAiProps {
  sx?: SX;
}

const NeedAi: FC<PropsWithChildren<NeedAiProps>> = () => {
  const { clearCmdInputHistory } = useCmdInputHistoryStore();
  const { mutate } = useRouter();

  useEffect(() => {
    clearCmdInputHistory();
    mutate({
      pathnameForUpdate: "/need-ai",
    });
  }, [clearCmdInputHistory, mutate]);

  return null;
};

export default memo(NeedAi);
