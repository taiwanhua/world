"use client";

import type { FC, PropsWithChildren } from "react";
import { memo } from "react";
import type { LinkProps } from "next/link";
import type { ButtonProps } from "@mui/material/Button";
import Button from "@mui/material/Button";
import Link from "next/link";

export interface NextLinkButtonProps extends LinkProps {
  label: string;
  color?: ButtonProps["color"];
}

const NextLinkButton: FC<PropsWithChildren<NextLinkButtonProps>> = ({
  label,
  href,
  color = "success",
  ...otherProps
}) => {
  return (
    <Button color={color} variant="text">
      <Link href={href} {...otherProps}>
        {label}
      </Link>
    </Button>
  );
};

export default memo(NextLinkButton);
