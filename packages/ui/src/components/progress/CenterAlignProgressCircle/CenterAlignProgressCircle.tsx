import type { FC } from "react";
import { memo } from "react";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useSX } from "@/hooks/theme/useSX";

export interface CenterAlignProgressCircleProps extends BoxProps {
  loading: boolean;
}

const CenterAlignProgressCircleFC: FC<CenterAlignProgressCircleProps> = ({
  sx,
  loading,
}) => {
  const boxSx = useSX(
    () => [
      {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      sx,
    ],
    [sx],
  );
  return loading ? (
    <Box sx={boxSx}>
      <CircularProgress />
    </Box>
  ) : null;
};

export const CenterAlignProgressCircle = memo(CenterAlignProgressCircleFC);

// export default memo(CenterAlignProgressCircleFC);
