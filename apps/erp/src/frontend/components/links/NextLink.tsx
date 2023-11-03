import type { FC, PropsWithChildren } from "react";
import { memo } from "react";
import type { LinkProps } from "next/link";
import NextLink from "next/link";

const Link: FC<PropsWithChildren<LinkProps>> = ({
  as,
  href,
  ...otherProps
}) => {
  return <NextLink {...otherProps} as={as} href={href} legacyBehavior />;
};

export default memo(Link);
