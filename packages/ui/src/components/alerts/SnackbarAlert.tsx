import type { SnackbarCloseReason } from "@mui/material/Snackbar";
import Snackbar from "@mui/material/Snackbar";
import type { AlertProps, AlertColor } from "@mui/material/Alert";
import MuiAlert from "@mui/material/Alert";
import type { GrowProps } from "@mui/material/Grow";
import Grow from "@mui/material/Grow";
import type { FC } from "react";
import { forwardRef, memo, useCallback, useMemo } from "react";
import type { BoxProps, SnackbarOrigin } from "@mui/material";
import { useSX } from "@/hooks/theme/useSX";

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  },
);

export interface SnackbarAlertProps {
  className?: string;
  sx?: BoxProps["sx"];
  severity?: AlertColor;
  message?: string;
  open: boolean;
  onClose: () => void;
}

const autoHideDuration = 5000;

function Transition(props: GrowProps): JSX.Element {
  return <Grow {...props} />;
}

const SnackbarAlertFC: FC<SnackbarAlertProps> = ({
  className,
  sx,
  severity = "success",
  message = "",
  open,
  onClose,
}) => {
  const handleClose = useCallback(
    (event: unknown, reason?: SnackbarCloseReason) => {
      if (reason === "clickaway") {
        return;
      }
      onClose();
    },
    [onClose],
  );

  const anchorOrigin = useMemo<SnackbarOrigin>(
    () => ({ horizontal: "right", vertical: "top" }),
    [],
  );

  const alertSx = useSX(
    () => ({
      width: "100%",
      "& .MuiIconButton-root": {
        marginTop: 0,
      },
    }),
    [],
  );

  return (
    <Snackbar
      TransitionComponent={Transition}
      anchorOrigin={anchorOrigin}
      autoHideDuration={autoHideDuration}
      className={className}
      onClose={handleClose}
      open={open}
      sx={sx}
    >
      <Alert onClose={handleClose} severity={severity} sx={alertSx}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export const SnackbarAlert = memo(SnackbarAlertFC);

// export default memo(SnackbarAlert);
