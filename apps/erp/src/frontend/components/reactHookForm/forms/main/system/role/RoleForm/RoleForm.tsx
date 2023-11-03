import { FC, memo } from "react";
import Box from "@mui/material/Box";
import { SX } from "@/frontend/hooks/theme/useSX";
import Grid from "@mui/material/Grid";
import { FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";
import { useTranslation } from "@/client/hooks/text/useTranslation";
import TextField from "@/client/components/reactHookForm/fields/TextField/TextField";
import { UpdateOaAuthRolesFormInput } from "@/client/graphql/oa/mutation/auth/oaAuthRole/updateOaAuthRoles";
import SwitchField from "@/client/components/reactHookForm/fields/SwitchField/SwitchField";

export interface Props {
  sx?: SX;
  onSubmit: SubmitHandler<UpdateOaAuthRolesFormInput>;
  methods: UseFormReturn<UpdateOaAuthRolesFormInput>;
  disabled?: boolean;
  placeToUse: "update" | "create";
}

const RoleForm: FC<Props> = ({
  sx,
  onSubmit,
  methods,
  disabled,
  placeToUse,
}) => {
  const { t } = useTranslation();

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
          <Grid item xs={12}>
            <TextField
              label={t("textField.label.name")}
              name="name"
              fullWidth
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t("textField.label.code.default")}
              name="code"
              fullWidth
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <SwitchField
              name="enable"
              label={t("switchField.label.enable")}
              fullWidth
              labelBackgroundColor="dialog"
              disabled={disabled}
            />
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
};

export default memo(RoleForm);
