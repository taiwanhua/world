import type { FC } from "react";
import { memo, useCallback, useRef } from "react";
import type { TextFieldProps } from "@mui/material/TextField";
import MUITextField from "@mui/material/TextField";
import { useController } from "react-hook-form";
import { isNil, set } from "lodash-es";
import type {
  OnValueChange,
  SourceInfo,
  NumberFormatValues,
  InputAttributes,
} from "react-number-format";
import { NumericFormat } from "react-number-format";

export interface NumericFormatSpecifyProps {
  thousandSeparator?: boolean | string;
  decimalSeparator?: string;
  isAllowed?: (values: NumberFormatValues) => boolean;
  allowedDecimalSeparators?: string[];
  thousandsGroupStyle?: "thousand" | "lakh" | "wan" | "none";
  decimalScale?: number;
  fixedDecimalScale?: boolean;
  allowNegative?: boolean;
  allowLeadingZeros?: boolean;
  suffix?: string;
  prefix?: string;
}

export interface NumberFormatFieldProps
  extends Omit<TextFieldProps, "name" | "value" | "defaultValue" | "type"> {
  saveType?: "string" | "number";
  min?: number;
  max?: number;
  nanSaveValue?: null | "" | undefined;
  numericFormatProps?: NumericFormatSpecifyProps;
  name: string;
}

type SaveTypeCondition<S> = S extends "string" ? string : number;

type SaveType = SaveTypeCondition<NumberFormatFieldProps["saveType"]>;

const NumberFormatFieldFC: FC<NumberFormatFieldProps> = ({
  name,
  disabled,
  saveType = "string",
  min,
  max,
  nanSaveValue = "",
  numericFormatProps,
  ...other
}) => {
  const inputParser = useCallback(
    (value: string) => {
      const result =
        numericFormatProps?.decimalScale === 0
          ? Number.parseInt(value, 10)
          : Number.parseFloat(value);
      if (Number.isNaN(result)) {
        return nanSaveValue;
      }
      return saveType === "string" ? `${result}` : result;
    },
    [numericFormatProps?.decimalScale, saveType, nanSaveValue],
  );

  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController<Record<string, SaveType>>({
    name,
  });

  const changeEvent = useRef<null | SourceInfo>();

  const onValueChange = useCallback<OnValueChange>(
    (values, sourceInfo) => {
      set(sourceInfo, "target.value", inputParser(values.value));
      set(sourceInfo, "target.name", name);
      changeEvent.current = sourceInfo;
      onChange(sourceInfo);
    },
    [inputParser, name, onChange],
  );

  const onFieldBlur = useCallback<
    NonNullable<InputAttributes["onBlur"]>
  >(() => {
    // onBlur(changeEvent.current ?? e);
    onBlur();
    changeEvent.current = null;
  }, [onBlur]);

  const isAllowed = useCallback(
    ({ formattedValue, floatValue }: NumberFormatValues) => {
      if (floatValue === undefined) {
        return true;
      }

      if (formattedValue.startsWith("-.") || formattedValue.startsWith(".")) {
        return false;
      }
      if (min !== undefined && floatValue < min) {
        return false;
      }
      if (max !== undefined && floatValue > max) {
        return false;
      }

      return true;
    },
    [max, min],
  );

  const fieldValue = isNil(value) ? "" : value;

  return (
    <NumericFormat
      customInput={MUITextField}
      disabled={disabled}
      inputRef={ref}
      name={name}
      onBlur={onFieldBlur}
      onValueChange={onValueChange}
      value={fieldValue}
      {...other}
      isAllowed={isAllowed}
      {...numericFormatProps}
      error={Boolean(error)}
      helperText={error?.message}
    />
  );
};

export const NumberFormatField = memo(NumberFormatFieldFC);

export default memo(NumberFormatFieldFC);
