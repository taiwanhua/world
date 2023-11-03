import { useState, useCallback, useMemo } from "react";
import type { SnackbarAlertProps } from "@/components/alerts/SnackbarAlert";

export type SnackbarAlertMessageAndSeverity = Pick<
  SnackbarAlertProps,
  "message" | "severity"
>;

export interface UseSnackbarAlertReturn {
  showSnackbarAlert: (
    messageAndSeverity: SnackbarAlertMessageAndSeverity,
  ) => void;
  snackbarAlertProps: SnackbarAlertProps & { key: string };
}

export function useSnackbarAlert(): UseSnackbarAlertReturn {
  const [snackbarAlertOpen, setSnackbarAlertOpen] = useState(false);
  const [snackbarAlertMessageAndSeverity, setSnackbarAlertMessageAndSeverity] =
    useState<SnackbarAlertMessageAndSeverity>({
      message: "",
      severity: "success",
    });

  const snackbarAlertOnClose = useCallback(() => {
    setSnackbarAlertOpen(false);
  }, []);

  const showSnackbarAlert = useCallback(
    (messageAndSeverity: SnackbarAlertMessageAndSeverity) => {
      setSnackbarAlertOpen(true);
      setSnackbarAlertMessageAndSeverity(messageAndSeverity);
    },
    [],
  );

  const key = useMemo<string>(
    () => `${Math.random()}${JSON.stringify(snackbarAlertMessageAndSeverity)}`,
    [snackbarAlertMessageAndSeverity],
  );

  return {
    showSnackbarAlert,
    snackbarAlertProps: {
      open: snackbarAlertOpen,
      onClose: snackbarAlertOnClose,
      ...snackbarAlertMessageAndSeverity,
      key,
    },
  };
}
