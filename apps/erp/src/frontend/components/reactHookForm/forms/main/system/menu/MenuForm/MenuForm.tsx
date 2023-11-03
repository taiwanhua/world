import { FC, memo } from "react";
import Box from "@mui/material/Box";
import { SX } from "@/frontend/hooks/theme/useSX";
import Grid from "@mui/material/Grid";
import { FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";
import TextField from "@/client/components/reactHookForm/fields/TextField/TextField";
import { useOaAuthMenuSummary } from "@/client/hooks/graphql/oa/auth/oaAuthMenu/useOaAuthMenuSummary";
import SwitchField from "@/client/components/reactHookForm/fields/SwitchField/SwitchField";
import { useTranslation } from "@/client/hooks/text/useTranslation";
import { UpdateOaAuthMenusFormInput } from "@/client/graphql/oa/mutation/auth/oaAuthMenu/updateOaAuthMenus";
import NumberFormatField from "@/client/components/reactHookForm/fields/NumberFormatField/NumberFormatField";
import SelectMenuTreeField from "@/client/components/reactHookForm/fields/SelectMenuTreeField/SelectMenuTreeField";

export interface Props {
  sx?: SX;
  onSubmit: SubmitHandler<UpdateOaAuthMenusFormInput>;
  methods: UseFormReturn<UpdateOaAuthMenusFormInput>;
  disabled?: boolean;
  placeToUse: "update" | "create";
}

const MenuForm: FC<Props> = ({
  sx,
  onSubmit,
  methods,
  disabled,
  placeToUse,
}) => {
  const { id } = methods.getValues();

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
          <Grid item xs={8}>
            <TextField
              label={t("textField.label.pathname")}
              name="pathname"
              fullWidth
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label={t("textField.label.icon")}
              name="icon"
              fullWidth
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={4}>
            <SwitchField
              name="showInMenu"
              label={t("textField.label.showInMenu")}
              fullWidth
              labelBackgroundColor="dialog"
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={4}>
            <SwitchField
              name="isWebPage"
              label={t("textField.label.isWebPage")}
              fullWidth
              labelBackgroundColor="dialog"
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={4}>
            <NumberFormatField
              name="sort"
              label={t("textField.label.sort")}
              fullWidth
              disabled={disabled}
              saveType="number"
              nanSaveValue={null}
              numericFormatProps={{
                decimalScale: 0,
                allowNegative: false,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectMenuTreeField
              name="parentId"
              label={t("selectTextField.label.parentMenu")}
              fullWidth
              disabled={disabled}
              menuTree={getOmitMenusTree(id)}
              menusData={menus?.result?.data ?? []}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t("textField.label.tableMemo")}
              name="tableMemo"
              fullWidth
              disabled={disabled}
              multiline
              minRows={4}
              maxRows={4}
            />
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  );
};

export default memo(MenuForm);
