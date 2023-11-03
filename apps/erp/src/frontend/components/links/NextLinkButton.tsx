"use client";

import type { FC, PropsWithChildren } from "react";
import { memo } from "react";
import type { LinkProps } from "next/link";
import Button from "@mui/material/Button";
import Link from "next/link";

export interface NextLinkButtonProps extends LinkProps {
  label: string;
}

const NextLinkButton: FC<PropsWithChildren<NextLinkButtonProps>> = ({
  label,
  href,
  ...otherProps
}) => {
  return (
    <Button color="success" variant="text">
      <Link href={href} {...otherProps}>
        {label}
      </Link>
    </Button>
  );
};

export default memo(NextLinkButton);
