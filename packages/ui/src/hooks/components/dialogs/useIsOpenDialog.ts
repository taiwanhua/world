import { useState, useCallback } from "react";
import { delay } from "lodash-es";
import type { Theme } from "@mui/material";

type CallBack = () => void;

export interface UseIsOpenDialogParams {
  theme: Theme;
}

export interface UseIsOpenDialogReturn {
  isDialogOpen: boolean;
  handleSetDialogOpen: (nextDialogOpen: boolean) => void;
  handleDialogOpen: () => void;
  handleDialogClose: (callBack?: CallBack) => void;
  handleDialogJustClose: () => void;
}

export function useIsOpenDialog({
  theme,
}: UseIsOpenDialogParams): UseIsOpenDialogReturn {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    transitions: {
      duration: { leavingScreen },
    },
  } = theme; //useTheme();

  const handleSetDialogOpen = useCallback((nextDialogOpen: boolean) => {
    setIsDialogOpen(nextDialogOpen);
  }, []);

  const handleDialogOpen = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleDialogClose = useCallback(
    (callBack?: CallBack) => {
      setIsDialogOpen(false);
      if (callBack) {
        delay(callBack, leavingScreen);
      }
    },
    [leavingScreen],
  );

  const handleDialogJustClose = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return {
    isDialogOpen,
    handleSetDialogOpen,
    handleDialogOpen,
    handleDialogClose,
    handleDialogJustClose,
  };
}
