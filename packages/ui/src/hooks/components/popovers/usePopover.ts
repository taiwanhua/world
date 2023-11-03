import type { MouseEventHandler } from "react";
import { useState, useCallback } from "react";
import type { Theme } from "@mui/material";
import { delay } from "lodash-es";

type CallBack = () => void;

export interface UsePopoverParams {
  theme: Theme;
}

export interface UsePopoverReturn<T> {
  handlePopoverOpen: MouseEventHandler<T>;
  handlePopoverClose: (callBack?: CallBack) => void;
  popoverProps: {
    open: boolean;
    anchorEl: T | null;
    onClose: () => void;
  };
}

export function usePopover<T = HTMLButtonElement>({
  theme,
}: UsePopoverParams): UsePopoverReturn<T> {
  const {
    transitions: {
      duration: { leavingScreen },
    },
  } = theme; //useTheme();

  const [anchorEl, setAnchorEl] = useState<T | null>(null);

  const open = Boolean(anchorEl);

  const handlePopoverClose = useCallback(
    (callBack?: CallBack) => {
      setAnchorEl(null);
      if (callBack) {
        delay(callBack, leavingScreen);
      }
    },
    [leavingScreen],
  );

  const popoverOnClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handlePopoverOpen = useCallback<MouseEventHandler<T>>((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  return {
    handlePopoverOpen,
    handlePopoverClose,
    popoverProps: {
      open,
      anchorEl,
      onClose: popoverOnClose,
    },
  };
}
