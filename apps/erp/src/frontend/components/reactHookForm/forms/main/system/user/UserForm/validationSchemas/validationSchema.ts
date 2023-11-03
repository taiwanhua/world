import * as yup from "yup";
import { GetText } from "@/client/hooks/text/useTranslation";

export const validationSchema = (t: GetText, placeToUse: "update" | "create") =>
  yup
    .object({
      displayName: yup.string().required(t("textField.yup.displayName")),
      familyName: yup.string().required(t("textField.yup.familyName")),
      givenName: yup.string().required(t("textField.yup.givenName")),
      email: yup.string().required(t("textField.yup.email")),
      // password: yup.string().required(t("textField.yup.password")),
      password: yup.string().when("provider", {
        is: (provider: string) => provider !== "google",
        then: (schema) => schema.required(t("textField.yup.password")),
      }),
      enable: yup.boolean().required(t("switchField.yup.status")),
      ...(placeToUse === "create"
        ? {
            orgIds: yup.array().min(1, t("selectTextField.yup.belongOrgIds")),
          }
        : null),
    })
    .required();
