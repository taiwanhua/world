"use client";

import type { NextPage } from "next";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { useTheme } from "@/frontend/hooks/theme/useTheme";
import { useSX } from "@/frontend/hooks/theme/useSX";

const FourZeroFour: NextPage = () => {
  const { paletteMode } = useTheme();

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
  );
};

export default FourZeroFour;
