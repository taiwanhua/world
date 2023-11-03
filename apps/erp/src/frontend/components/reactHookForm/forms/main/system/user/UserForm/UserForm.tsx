import { FC, memo, useState, MouseEvent } from "react";
import Box from "@mui/material/Box";
import { SX } from "@/frontend/hooks/theme/useSX";
import Grid from "@mui/material/Grid";
import { FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";
import { useTranslation } from "@/client/hooks/text/useTranslation";
import TextField from "@/client/components/reactHookForm/fields/TextField/TextField";
import SwitchField from "@/client/components/reactHookForm/fields/SwitchField/SwitchField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useSX } from "@/client/hooks/theme/useSX";
import { UpdateOaAuthUsersFormInput } from "@/client/graphql/oa/mutation/auth/oaAuthUser/updateOaAuthUsers";
import SelectTextField from "@/client/components/reactHookForm/fields/SelectTextField/SelectTextField";
import MenuItem from "@mui/material/MenuItem";

export interface Props {
  sx?: SX;
  onSubmit: SubmitHandler<UpdateOaAuthUsersFormInput>;
  methods: UseFormReturn<UpdateOaAuthUsersFormInput>;
  disabled?: boolean;
  placeToUse: "update" | "create";
}

export const providerTypes: string[] = ["fanloop-oa", "google"];

const UserForm: FC<Props> = ({
  sx,
  onSubmit,
  methods,
  disabled,
  placeToUse,
}) => {
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const iconButtonSX = useSX(() => ({ margin: 0 }), []);

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        sx={sx}
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={3} minWidth={480}>
          {placeToUse === "update" ? (
            <Grid item xs={12}>
              <TextField
                label={t("textField.label.id.default")}
                name="id"
                fullWidth
                disabled
              />
            </Grid>
          ) : null}
          <Grid item xs={6}>
            <TextField
              label={t("textField.label.displayName")}
              name="displayName"
              fullWidth
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={t("textField.label.familyName")}
              name="familyName"
              fullWidth
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={t("textField.label.givenName")}
              name="givenName"
              fullWidth
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={6}>
            <SwitchField
              name="enable"
              label={t("switchField.label.enable")}
              fullWidth
              labelBackgroundColor="dialog"
              disabled={disabled}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label={t("textField.label.email")}
              name="email"
              fullWidth
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={6}>
            <SwitchField
              name="emailVerified"
              label={t("switchField.label.emailVerified")}
              fullWidth
              labelBackgroundColor="dialog"
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={t("textField.label.language")}
              name="language"
              fullWidth
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={t("textField.label.accountId")}
              name="accountId"
              fullWidth
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={t("textField.label.password")}
              name="password"
              fullWidth
              disabled={disabled}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="small"
                      sx={iconButtonSX}
                      color="primary"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectTextField
              name="provider"
              label={t("textField.label.provider")}
              fullWidth
              disabled={disabled}
            >
              <MenuItem key="system" value="system" disabled>
                system
              </MenuItem>
              {providerTypes.map((providerType) => (
                <MenuItem key={providerType} value={providerType}>
                  {providerType}
                </MenuItem>
              ))}
            </SelectTextField>
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
};

export default memo(UserForm);
