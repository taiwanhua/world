import type { FC } from "react";
import { memo, useMemo } from "react";
import type { TextFieldProps as MUITextFieldProps } from "@mui/material/TextField";
import MUITextField from "@mui/material/TextField";
import { isNil } from "lodash-es";
import { useController } from "react-hook-form";

export interface TextFieldProps extends Omit<MUITextFieldProps, "name"> {
  name: string;
}

const TextFieldFC: FC<TextFieldProps> = ({
  sx,
  name,
  disabled,
  helperText,
  ...other
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController<Record<string, string | null | undefined>>({ name });

  const isNotNilValue = useMemo(() => (isNil(value) ? "" : value), [value]);

  return (
    <MUITextField
      disabled={disabled}
      error={Boolean(error)}
      helperText={error?.message ? error.message : helperText}
      inputRef={ref}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      sx={sx}
      value={isNotNilValue}
      {...other}
    />
  );
};

export const TextField = memo(TextFieldFC);

export default memo(TextFieldFC);
