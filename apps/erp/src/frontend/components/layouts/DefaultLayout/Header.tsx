import type { FC } from "react";
import { memo, useCallback } from "react";
import Box from "@mui/material/Box";
import type { SwitchProps } from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { MuiDarkOrLightSwitch } from "ui";
import Paper from "@mui/material/Paper";
import { useSX, type SX } from "@/frontend/hooks/theme/useSX";
import { useTheme } from "@/frontend/hooks/theme/useTheme";
import NextLinkButton from "@/frontend/components/links/NextLinkButton";

export interface HeaderProps {
  className?: string;
  sx?: SX;
}

const Header: FC<HeaderProps> = () => {
  const { paletteMode, paletteModeMutate } = useTheme();

  const onSwitch = useCallback<NonNullable<SwitchProps["onChange"]>>(
    (_event, checked): void => {
      paletteModeMutate(checked ? "dark" : "light");
    },
    [paletteModeMutate],
  );

  const boxSX = useSX(
    () => ({
      width: "100%",
      minWidth: "fit-content",
      justifyContent: "center",
    }),
    [],
  );

  return (
    <Box sx={boxSX}>
      <Paper elevation={12}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          padding={1}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          width="100%"
        >
          <NextLinkButton href="/" label="Home" />
          <NextLinkButton href="/about" label="About" />
          <NextLinkButton href="/post" label="Post" />
          <NextLinkButton href="/need-ai" label="AI Secretary" />

          <MuiDarkOrLightSwitch
            checked={paletteMode === "dark"}
            onChange={onSwitch}
          />
        </Stack>
      </Paper>
    </Box>
  );
};

export default memo(Header);
