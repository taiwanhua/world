import type { FC, MouseEvent, FormEventHandler } from "react";
import { memo, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextField } from "ui";
import Button from "@mui/material/Button";
import { useSX } from "@/frontend/hooks/theme/useSX";
import type { SX } from "@/frontend/hooks/theme/useSX";
import type { QuerySystemUserLoginTokenInput } from "@/frontend/graphql/query/system/check/systemUserLoginToken";

export interface LoginFormProps {
  sx?: SX;
  onSubmit: SubmitHandler<QuerySystemUserLoginTokenInput>;
  methods: UseFormReturn<QuerySystemUserLoginTokenInput>;
  disabled?: boolean;
}

const LoginForm: FC<LoginFormProps> = ({ sx, onSubmit, methods, disabled }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: MouseEvent<HTMLButtonElement>,
  ): void => {
    event.preventDefault();
  };

  const iconButtonSX = useSX(() => ({ margin: 0 }), []);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      const handler = methods.handleSubmit(onSubmit);
      void handler(event);
    },
    [methods, onSubmit],
  );

  const buttonSx = useSX(
    () => ({
      textTransform: "none",
      color: "#757575",
    }),
    [],
  );

  return (
    <FormProvider {...methods}>
      <Box
        autoComplete="off"
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={sx}
      >
        <Card sx={{ padding: 1 }} variant="outlined">
          <Grid container minWidth={100} spacing={3}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                disabled={disabled}
                fullWidth
                label="E-mail"
                name="email"
              />

              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        color="primary"
                        edge="end"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        size="small"
                        sx={iconButtonSX}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                autoComplete="current-password"
                disabled={disabled}
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                color="inherit"
                fullWidth
                sx={buttonSx}
                type="submit"
                variant="contained"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </FormProvider>
  );
};

export default memo(LoginForm);
