import { FC, memo } from "react";
import Box from "@mui/material/Box";
import { SX } from "@/frontend/hooks/theme/useSX";
import Grid from "@mui/material/Grid";
import { FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";
import { useTranslation } from "@/client/hooks/text/useTranslation";
import TextField from "@/client/components/reactHookForm/fields/TextField/TextField";
import SelectTextField from "@/client/components/reactHookForm/fields/SelectTextField/SelectTextField";
import MenuItem from "@mui/material/MenuItem";
import { useOaAuthMenuSummary } from "@/client/hooks/graphql/oa/auth/oaAuthMenu/useOaAuthMenuSummary";
import { UpdateOaAuthFunctionsFormInput } from "@/client/graphql/oa/mutation/auth/oaAuthFunction/updateOaAuthFunctions";
import { authFunctionTypes } from "@maya-oa/core/dist/constant/oa/authFunctionType";
import SwitchField from "@/client/components/reactHookForm/fields/SwitchField/SwitchField";
import SelectMenuTreeField from "@/client/components/reactHookForm/fields/SelectMenuTreeField/SelectMenuTreeField";

export interface Props {
  sx?: SX;
  onSubmit: SubmitHandler<UpdateOaAuthFunctionsFormInput>;
  methods: UseFormReturn<UpdateOaAuthFunctionsFormInput>;
  disabled?: boolean;
  placeToUse: "update" | "create";
}

const FunctionForm: FC<Props> = ({
  sx,
  onSubmit,
  methods,
  disabled,
  placeToUse,
}) => {
  const { t } = useTranslation();

  const { menus, getOmitMenusTree } = useOaAuthMenuSummary({
    input: { limit: 0 },
  });

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
          <Grid item xs={8}>
            <TextField
              label={t("textField.label.name")}
              name="name"
              fullWidth
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={4}>
            <SwitchField
              name="enable"
              label={t("textField.label.enable")}
              fullWidth
              labelBackgroundColor="dialog"
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t("textField.label.showName")}
              name="showName"
              fullWidth
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label={t("textField.label.icon")}
              name="icon"
              fullWidth
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectTextField
              name="type"
              label={t("textField.label.functionType")}
              fullWidth
              disabled={disabled}
            >
              {authFunctionTypes.map((functionType) => (
                <MenuItem key={functionType} value={functionType}>
                  {functionType}
                </MenuItem>
              ))}
            </SelectTextField>
          </Grid>
          <Grid item xs={12}>
            <SelectMenuTreeField
              name="menuId"
              label={t("selectTextField.label.parentMenuId")}
              fullWidth
              disabled={disabled}
              menuTree={getOmitMenusTree()}
              menusData={menus?.result?.data ?? []}
            />
          </Grid>

          {/* <Grid item xs={12}>
            <SelectTextField
              name="menuId"
              label={t("selectTextField.label.parentMenuId")}
              fullWidth
              disabled={disabled}
            >
              {menusOptions.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </SelectTextField>
          </Grid> */}
        </Grid>
      </Box>
    </FormProvider>
  );
};

export default memo(FunctionForm);
