"use client";

import Divider from "@mui/material/Divider";
import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { FC, ReactNode } from "react";
import { Typography } from "@mui/material";
import { memo } from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { useSX } from "@/hooks/theme/useSX";

export interface FourZeroFourProps extends BoxProps {
  paletteMode: string;
  children: ReactNode;
}

const FourZeroFourFC: FC<FourZeroFourProps> = ({ paletteMode, children }) => {
  const boxSX = useSX(
    () => ({
      display: "flex",
      alignItems: "center",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      background: paletteMode === "dark" ? undefined : "#E8E8E8",
    }),
    [paletteMode],
  );

  const paperSX = useSX(
    () => ({
      fontSize: 72,
      background:
        paletteMode === "dark"
          ? "linear-gradient(to right, #9B11BD 0%, #CC0C33 100%)"
          : "linear-gradient(to right, #292929 0%, #5E5E5E 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      boxShadow: "unset",
    }),
    [paletteMode],
  );

  return (
    <>
      <Box sx={boxSX}>
        <Stack
          direction="row"
          divider={<Divider flexItem orientation="vertical" />}
          spacing={2}
        >
          <Paper sx={paperSX}>404</Paper>
          <Paper sx={paperSX}>Page Not Found</Paper>
        </Stack>
      </Box>
      <Box sx={boxSX}>
        <Typography> {children}</Typography>
      </Box>
    </>
  );
};

export const FourZeroFour = memo(FourZeroFourFC);

// export default memo(FourZeroFourFC);
