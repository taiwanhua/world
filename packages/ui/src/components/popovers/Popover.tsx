import type { FC } from "react";
import { memo, useCallback, useMemo } from "react";
import type {
  PopoverProps as MUIPopoverProps,
  PopoverOrigin,
} from "@mui/material/Popover";
import MuiPopover from "@mui/material/Popover";
import type { BoxProps } from "@mui/material/Box";

export interface PopoverProps extends MUIPopoverProps {
  className?: string;
  sx?: BoxProps["sx"];
  open: boolean;
  onClose: () => void;
  disableBackdropClick?: boolean;
}

const PopoverFC: FC<PopoverProps> = ({
  className,
  sx,
  open,
  onClose,
  disableBackdropClick = false,
  children,
  ...other
}) => {
  const popoverAnchorOrigin: PopoverOrigin = useMemo(
    () => ({ vertical: "bottom", horizontal: "left" }),
    [],
  );

  const handleClose = useCallback<NonNullable<MUIPopoverProps["onClose"]>>(
    (event, reason) => {
      if (disableBackdropClick && reason === "backdropClick") {
        return;
      }
      onClose();
    },
    [disableBackdropClick, onClose],
  );

  return (
    <MuiPopover
      anchorOrigin={popoverAnchorOrigin}
      className={className}
      onClose={handleClose}
      open={open}
      sx={sx}
      {...other}
    >
      {children}
    </MuiPopover>
  );
};

export const Popover = memo(PopoverFC);

// export default memo(Popover);
