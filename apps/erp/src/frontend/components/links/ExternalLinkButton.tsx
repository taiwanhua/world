"use client";

import type { AnchorHTMLAttributes, FC, PropsWithChildren } from "react";
import { memo } from "react";
import type { ButtonProps } from "@mui/material/Button";
import Button from "@mui/material/Button";
import type { SX } from "@/frontend/hooks/theme/useSX";

export interface ExternalLinkButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  color?: ButtonProps["color"];
  sx?: SX;
}

const ExternalLinkButton: FC<PropsWithChildren<ExternalLinkButtonProps>> = ({
  label,
  href,
  color = "secondary",
  sx,
  ...otherProps
}) => {
  return (
    <Button color={color} sx={sx} variant="text">
      <a href={href} rel="noopener noreferrer" target="_blank" {...otherProps}>
        {label}
      </a>
    </Button>
  );
};

export default memo(ExternalLinkButton);
