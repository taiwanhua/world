"use client";

import type { CSSProperties, FC, ReactNode } from "react";
import { memo, useCallback, useMemo, useRef, useState, useEffect } from "react";
import type { TypographyProps } from "@mui/material/Typography";
import Typography from "@mui/material/Typography";
import type { PaperProps } from "@mui/material/Paper";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { BoxProps } from "@mui/material/Box";
import type { InteractionProps, ReactJsonViewProps } from "react-json-view";
import dynamic from "next/dynamic";
import type { Theme } from "@mui/material/styles";
import { useController, useFormContext } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";
import { useTheme } from "@/client/hooks/theme/useTheme";
import { useSX } from "@/client/hooks/theme/useSX";

export type { InteractionProps } from "react-json-view";

const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    return false;
  }
};

export type EnableClipboard = NonNullable<
  ReactJsonViewProps["enableClipboard"]
>;

export const enableClipboard: Exclude<EnableClipboard, boolean> = ({ src }) =>
  copy(JSON.stringify(src));

const DynamicBrowserReactJsonView = dynamic(() => import("react-json-view"), {
  ssr: false,
});

export interface Props {
  label?: ReactNode;
  labelProps?: TypographyProps;
  paperProps?: PaperProps;
  jsonViewStyle?: CSSProperties;
  reactJsonViewProps?: Omit<ReactJsonViewProps, "src">;
  name: string;
  disabled?: boolean;
  paperSx?: SX;
}

const BrowserReactJsonViewField: FC<Props> = ({
  label = "",
  labelProps,
  paperProps = {},
  jsonViewStyle = {},
  reactJsonViewProps,
  name,
  disabled,
  paperSx,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const [width, setWidth] = useState(0);

  const initialWidth = useCallback(() => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      setWidth(rect.width);
    }
  }, []);

  useEffect(() => {
    initialWidth();
  }, [initialWidth]);

  const { paletteMode } = useTheme();

  const { setValue } = useFormContext();

  const {
    field: { value /** onChange, onBlur, ref */ },
    fieldState: { error /** isTouched */ },
  } = useController({ name });

  const isError = useMemo(() => Boolean(error?.message), [error?.message]);

  const onJsonEditOrAdd = useCallback<(edit: InteractionProps) => void>(
    ({ updated_src }) => {
      setValue(name, updated_src, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [name, setValue],
  );

  const defaultLabelProps = useMemo<TypographyProps>(
    () => ({
      variant: "body1",
      component: "div",
      marginTop: 1,
      sx: isError
        ? (theme) => ({
            color: theme.palette.error.main,
          })
        : disabled
        ? (theme) => ({
            color: theme.palette.text.disabled,
          })
        : undefined,
    }),
    [disabled, isError],
  );

  const browserReactJsonViewStyle = useMemo<CSSProperties>(
    () => ({
      width: "fit-content",
      minWidth: "100%",
      minHeight: "100%",
      fontSize: "0.875rem",
      ...jsonViewStyle,
    }),
    [jsonViewStyle],
  );

  const parameterDetailPreviewPaperSx = useSX(
    () => ({
      marginTop: 1,
      height: 180,
      resize: "vertical",
      overflow: "auto",
      "&& .key-modal-request": {
        zIndex: (theme: Theme) => theme.zIndex.drawer + 3,
        position: "fixed !important",
        padding: "20%",
      },
      "&& .variable-row": {
        padding: "3px 5px 3px 30px !important",
      },
      "textarea.variable-editor": {
        width: width - 32,
      },
      ...paperSx,
    }),
    [paperSx, width],
  );

  return (
    <>
      <Typography {...(labelProps ?? defaultLabelProps)}>{label}</Typography>
      <Divider />

      <Paper ref={ref} sx={parameterDetailPreviewPaperSx} {...paperProps}>
        <DynamicBrowserReactJsonView
          displayDataTypes={false}
          enableClipboard={enableClipboard} // to disableClipboard can pass false in reactJsonViewProps
          indentWidth={2}
          name={false}
          onAdd={disabled ? undefined : onJsonEditOrAdd}
          onEdit={disabled ? undefined : onJsonEditOrAdd}
          style={browserReactJsonViewStyle}
          {...reactJsonViewProps}
          src={value ?? {}}
          theme={paletteMode === "dark" ? "bright" : "bright:inverted"}
        />
      </Paper>
      <FormHelperText error key={error?.message ?? ""}>
        {error?.message}
      </FormHelperText>
    </>
  );
};

export default memo(BrowserReactJsonViewField);
