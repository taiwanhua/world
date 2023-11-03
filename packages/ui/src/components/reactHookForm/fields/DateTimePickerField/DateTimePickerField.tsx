import type { FC } from "react";
import { memo, useCallback } from "react";
import type { BaseTextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import formatInTimeZone from "date-fns-tz/formatInTimeZone";
import zonedTimeToUtc from "date-fns-tz/zonedTimeToUtc";
import utcToZonedTime from "date-fns-tz/utcToZonedTime";
import { isValid } from "date-fns";
import { isNull } from "lodash-es";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import { useController } from "react-hook-form";
import { useOaTerritoriesStore } from "@/client/hooks/zustand/useOaTerritoriesStore";

const commonDate = "yyyy-MM-dd";
const commonTime = "HH:mm:ss";
const hourAndMin = "HH:mm";
const commonDateTime = `${commonDate} ${commonTime}`;

const mismatchTerritory = "TW";

export const dateTimeFormat = {
  commonDate,
  commonTime,
  hourAndMin,
  commonDateTime,
  commonDateTimeLocal: commonDateTime.replace(" ", "'T'"),
};

export interface DateTimePickerFieldProps extends BaseTextFieldProps {
  name: string;
  step?: number;
  max?: string;
  min?: string;
  /** the default value is mismatchTerritory */
  territory: string | null | undefined;
}

const DateTimePickerFieldFC: FC<DateTimePickerFieldProps> = ({
  sx,
  name,
  step = 1, // 1min
  max = "9999-12-31T23:59:59", // for native input to format
  min,
  territory,
  disabled,
  ...other
}) => {
  const {
    territoryConfig: territoryConfigStore,
    mismatchTerritory,
    mismatchTimezone,
  } = useOaTerritoriesStore();

  const timezone =
    territoryConfigStore[territory ?? mismatchTerritory]?.timezone ??
    mismatchTimezone;

  const inputFormatter = useCallback(
    (value: string): string => {
      const date = new Date(value);
      if (!isValid(date) || isNull(value)) {
        return "";
      }

      return formatInTimeZone(
        date,
        timezone,
        dateTimeFormat.commonDateTimeLocal,
      );
    },
    [timezone],
  );

  const inputParser = useCallback(
    (value: string): string => {
      const nextDatetime = zonedTimeToUtc(value, timezone);
      return isValid(nextDatetime) ? nextDatetime.toISOString() : "";
    },
    [timezone],
  );

  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name });

  const onNowClick = useCallback(() => {
    // there is local now to utc
    // const nextDatetime = zonedTimeToUtc(new Date(), timezone);
    // onChange(nextDatetime.toISOString());

    // there is specific timezone's utc now
    const utcDatetime = utcToZonedTime(new Date(), timezone);
    const nextDatetime = zonedTimeToUtc(utcDatetime, timezone);
    onChange(nextDatetime.toISOString());
  }, [onChange, timezone]);

  const onFieldBlur = useCallback<NonNullable<BaseTextFieldProps["onBlur"]>>(
    ({ target: { value } }) => {
      onChange(inputParser(value));
      onBlur();
    },
    [inputParser, onBlur, onChange],
  );

  const onNowMouseDown = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
  };

  return (
    <TextField
      defaultValue={inputFormatter(value)}
      helperText={error?.message}
      inputRef={ref}
      key={value}
      name={name}
      onBlur={onFieldBlur}
      onChange={undefined}
      sx={sx}
      value={undefined}
      // value={inputFormatter(value)}
      error={Boolean(error)}
      {...other}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        endAdornment: disabled ? null : (
          <InputAdornment position="end">
            <Button
              size="small"
              variant="text"
              color="inherit"
              sx={{
                paddingLeft: 0,
                paddingRight: 0,
                minWidth: 36,
              }}
              onClick={onNowClick}
              onMouseDown={onNowMouseDown}
              disabled={disabled}
            >
              now ({territory === "GLOBAL" ? "TW" : territory})
            </Button>
          </InputAdornment>
        ),
      }}
      disabled={disabled}
      inputProps={{ step, min, max }}
      type="datetime-local"
    />
  );
};

export const DateTimePickerField = memo(DateTimePickerFieldFC);

export default memo(DateTimePickerFieldFC);
