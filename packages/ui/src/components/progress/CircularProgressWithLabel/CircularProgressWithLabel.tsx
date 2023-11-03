import type { FC, PropsWithChildren } from "react";
import { memo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { CircularProgressProps } from "@mui/material/CircularProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { useSX } from "@/hooks/theme/useSX";

const CircularProgressWithLabelFC: FC<
  PropsWithChildren<CircularProgressProps>
> = ({ value, sx, ...props }) => {
  const containerBoxSx = useSX(
    () => ({
      position: "relative",
      display: "inline-flex",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      ...sx,
    }),
    [sx],
  );
  const boxSx = useSX(
    () => ({
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
    [],
  );

  const showValue = value ? Math.min(Math.round(value), 100) : 0;

  return (
    <Box sx={containerBoxSx}>
      <CircularProgress
        value={showValue}
        variant="determinate"
        {...props}
        color={value && value > 100 ? "success" : "info"}
        size={80}
      />
      <Box sx={boxSx}>
        <Typography color="text.secondary" component="div" variant="body1">
          {`${showValue}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export const CircularProgressWithLabel = memo(CircularProgressWithLabelFC);

// export default memo(CircularProgressWithLabelFC);
