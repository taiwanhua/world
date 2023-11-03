import type { FC, PropsWithChildren } from "react";
import { memo, useEffect } from "react";
import { useCmdInputHistoryStore } from "@/frontend/hooks/zustand/useCmdInputHistoryStore";
import type { SX } from "@/frontend/hooks/theme/useSX";

export interface ClearProps {
  sx?: SX;
}

const Clear: FC<PropsWithChildren<ClearProps>> = () => {
  const { clearCmdInputHistory } = useCmdInputHistoryStore();

  useEffect(() => {
    clearCmdInputHistory();
  }, [clearCmdInputHistory]);

  return null;
};

export default memo(Clear);
