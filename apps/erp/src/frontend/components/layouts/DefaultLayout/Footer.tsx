import type { FC } from "react";
import { memo } from "react";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import Box from "@mui/material/Box";
import { useSX, type SX } from "@/frontend/hooks/theme/useSX";

export interface HeaderProps {
  sx?: SX;
}

const Header: FC<HeaderProps> = ({ sx }) => {
  const boxSX = useSX(
    () => ({
      padding: 1,
      fontWeight: "lighter",
      ...sx,
    }),
    [sx],
  );

  const iconButtonSX = useSX(() => ({ margin: 0 }), []);

  return (
    <Box component="footer" sx={boxSX}>
      Arhua Ho ©2023-present Created by
      <IconButton color="secondary" href="#contained-buttons" sx={iconButtonSX}>
        <GitHubIcon />
      </IconButton>
    </Box>
  );
};

export default memo(Header);
