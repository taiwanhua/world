import type { DependencyList } from "react";
import type { SxProps, Theme } from "@mui/material/styles";
import { useMemo } from "react";
import { isNonNil } from "@/utils/is/isNonNil";

export type SX = SxProps<Theme> | undefined;

export const useSX = (
  handle: () => SX | SX[],
  compare?: DependencyList,
): SX => {
  return useMemo<SX>(() => {
    const sx = handle();
    return Array.isArray(sx) ? sx.flat().filter(isNonNil) : sx;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, compare);
};
