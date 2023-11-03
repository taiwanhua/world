"use client";

// this AutocompleteField is need to refactor
import type { AutocompleteProps } from "@mui/material/Autocomplete";
import Autocomplete from "@mui/material/Autocomplete";
import type { ChipProps } from "@mui/material/Chip";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import { memo, useMemo } from "react";
import { useController, useFormContext } from "react-hook-form";

const chipProps: ChipProps = { size: "small" };

export interface AutocompleteFieldProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    "renderInput"
  > {
  helperText?: string;
  name: string;
  label?: string;
  valueParser?: (value: T) => unknown; // out
  renderInputProps?: TextFieldProps;
  isNilDefaultValue?: T;
}

const defaultValueParser = <T,>(value: T): T => value;

const AutocompleteFieldFC = <
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  placeholder,
  multiple,
  label = "Autocomplete",
  name,
  disabled,
  helperText,
  valueParser = defaultValueParser, // out
  renderInputProps,
  isNilDefaultValue,
  ...otherProps
}: AutocompleteFieldProps<
  T,
  Multiple,
  DisableClearable,
  FreeSolo
>): JSX.Element => {
  // const [field, meta, helper] = useField(name);

  const {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    field: { value /** onChange, onBlur, ref */ },
    fieldState: { error },
    // formState: {},
  } = useController({ name });

  const { setValue } = useFormContext();

  const componentsProps = useMemo(
    () => ({
      popupIndicator: { sx: { marginTop: 0 } },
      clearIndicator: { sx: { marginTop: 0 } },
    }),
    [],
  );

  return (
    <Autocomplete
      ChipProps={chipProps}
      componentsProps={componentsProps}
      disabled={disabled}
      multiple={multiple}
      onChange={(e, values): void => {
        const nextValues = Array.isArray(values)
          ? values.map(valueParser)
          : valueParser(values as T);

        setValue(name, nextValues);
      }}
      open={disabled ? false : undefined}
      renderInput={(params): JSX.Element => (
        <TextField
          {...params}
          error={Boolean(error)}
          helperText={error?.message ? error.message : helperText}
          label={label}
          placeholder={placeholder}
          variant="outlined"
          {...renderInputProps}
        />
      )}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      value={value ?? isNilDefaultValue}
      {...otherProps}
    />
  );
};

export const AutocompleteField = memo(AutocompleteFieldFC);

// export default memo(AutocompleteFieldFC) as typeof AutocompleteFieldFC;
