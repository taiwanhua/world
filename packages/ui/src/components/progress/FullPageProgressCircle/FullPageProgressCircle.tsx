import type { FC } from "react";
import { memo } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import type { BackdropProps } from "@mui/material/Backdrop";
import { useSX, type SX } from "@/hooks/theme/useSX";

export interface FullPageProgressCircleProps
  extends Omit<BackdropProps, "open"> {
  className?: string;
  sx?: SX;
  loading: boolean;
}

const FullPageProgressCircleFC: FC<FullPageProgressCircleProps> = ({
  className,
  sx,
  loading,
}) => {
  const backdropSx = useSX(
    () => [
      {
        zIndex: (theme) => theme.zIndex.drawer + 1,
      },
      sx,
    ],
    [sx],
  );
  return (
    <Backdrop className={className} open={loading} sx={backdropSx}>
      <CircularProgress />
    </Backdrop>
  );
};

export const FullPageProgressCircle = memo(FullPageProgressCircleFC);

// export default memo(FullPageProgressCircleFC);
