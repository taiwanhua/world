import type { FC } from "react";
import { memo, useMemo } from "react";
import type { BaseTextFieldProps } from "@mui/material/TextField";
import MUITextField from "@mui/material/TextField";
import { useController } from "react-hook-form";
import { isNil } from "lodash-es";

export interface SelectTextFieldProps extends Omit<BaseTextFieldProps, "name"> {
  name: string;
}

const SelectTextFieldFC: FC<SelectTextFieldProps> = ({
  sx,
  name,
  disabled,
  children,
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
      helperText={error?.message}
      inputRef={ref}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      select
      sx={sx}
      value={isNotNilValue}
      {...other}
    >
      {children}
    </MUITextField>
  );
};

export const SelectTextField = memo(SelectTextFieldFC);

export default memo(SelectTextFieldFC);
