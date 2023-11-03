import type { FC } from "react";
import { memo, useMemo } from "react";
import { useController } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { lighten, darken, alpha } from "@mui/material/styles";
import type { SwitchProps } from "@mui/material/Switch";
import Switch from "@mui/material/Switch";
import { FormGroup } from "@mui/material";
import { useSX } from "@/hooks/theme/useSX";

export interface SwitchFieldProps extends Omit<SwitchProps, "name"> {
  name: string;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  fullWidth?: boolean;
  labelBackgroundColor?: "unset" | "default" | "dialog";
}

const SwitchFieldFC: FC<SwitchFieldProps> = ({
  className,
  sx,
  name,
  label,
  helperText,
  disabled,
  fullWidth,
  labelBackgroundColor = "default",
  ...other
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error, isTouched },
  } = useController<Record<string, boolean | null | undefined>>({ name });

  const isTouchedAndHaveError = useMemo(
    () => Boolean(isTouched && error),
    [error, isTouched],
  );

  const formControlSx = useSX(
    () => [
      {
        ".MuiFormLabel-root.Mui-focused + .MuiFormGroup-root": {
          borderColor: (theme) =>
            isTouchedAndHaveError ? undefined : theme.palette.primary.main,
          borderWidth: 2,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 1.625,
          paddingLeft: 1.625,
        },
      },
      sx,
    ],
    [sx, isTouchedAndHaveError],
  );

  const formLabelSx = useSX(
    () => (theme) => {
      const black = "#000";
      const defaultBackground = theme.palette.background.default;
      const dialogColor = lighten(theme.palette.background.default, 0.2);

      return {
        height: "12px",
        fontSize: "0.75em",
        top: "-8px",
        left: "8px",
        position: "absolute",
        ...(labelBackgroundColor === "unset"
          ? { backgroundColor: defaultBackground }
          : undefined), // this color is for 1 floor card background color
        ...(labelBackgroundColor === "default"
          ? {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? lighten(defaultBackground, 0.053)
                  : darken(defaultBackground, 0.053),
            }
          : undefined), // this color is for 2 floor card background color
        ...(labelBackgroundColor === "dialog"
          ? {
              backgroundColor:
                // eslint-disable-next-line no-nested-ternary
                theme.palette.mode === "dark"
                  ? disabled
                    ? dialogColor
                    : undefined
                  : darken(defaultBackground, 0),
              background: disabled
                ? undefined
                : `linear-gradient(${dialogColor},${dialogColor} 70%,${black} 70%,${black} 100%)`,
              paddingRight: 0.75,
            }
          : undefined), //  this color is for dialog
        // backgroundColor:
        //   theme.palette.mode === "dark"
        //     ? lighten(theme.palette.background.default, 0.105)
        //     : darken(theme.palette.background.default, 0.05), // this color is for 2 floor card background color
        paddingRight: 0.75,
        paddingLeft: 0.75,
      };
    },
    [disabled, labelBackgroundColor],
  );

  const formGroupSx = useSX(
    () => ({
      paddingRight: 1.75,
      paddingLeft: 1.75,
      paddingTop: 0.125,
      paddingBottom: 0.125,
      minWidth: "68px",
      minHeight: "40px",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: (theme): string => {
        if (isTouchedAndHaveError) {
          return theme.palette.error.main;
        }
        return theme.palette.mode === "dark"
          ? alpha(lighten(theme.palette.background.default, 1), 0.5)
          : alpha(darken(theme.palette.background.default, 1), 0.23);
      },
      borderRadius: (theme) => `${theme.shape.borderRadius}px`,
      "&:hover": {
        borderColor: (theme): string | undefined => {
          if (isTouchedAndHaveError) {
            return theme.palette.error.main;
          }
          return disabled ? undefined : theme.palette.text.primary;
        },
      },
      backgroundColor: (theme) =>
        // eslint-disable-next-line no-nested-ternary
        theme.palette.mode === "dark"
          ? disabled
            ? undefined
            : "#000000"
          : undefined,
    }),
    [disabled, isTouchedAndHaveError],
  );

  const formControlLabelSx = useSX(() => ({ height: 36 }), []);

  return (
    <FormControl
      className={className}
      component="fieldset"
      disabled={disabled}
      error={isTouchedAndHaveError}
      fullWidth={fullWidth}
      sx={formControlSx}
      variant="outlined"
    >
      <FormLabel component="legend" sx={formLabelSx}>
        {label}
      </FormLabel>

      <FormGroup sx={formGroupSx}>
        <FormControlLabel
          control={
            <Switch
              checked={value ?? false}
              disableRipple
              inputRef={ref}
              onBlur={onBlur}
              onChange={onChange}
              value={value ?? false}
              {...other}
            />
          }
          label=""
          sx={formControlLabelSx}
          // {...radioOption}
        />
      </FormGroup>

      <FormHelperText>
        {isTouchedAndHaveError ? error?.message : helperText}
      </FormHelperText>
    </FormControl>
  );
};

export const SwitchField = memo(SwitchFieldFC);

export default memo(SwitchField);
