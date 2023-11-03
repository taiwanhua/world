import * as yup from "yup";
import { GetText } from "@/client/hooks/text/useTranslation";

export const validationSchema = (t: GetText) =>
  yup
    .object({
      enable: yup.boolean().required(t("switchField.yup.status")),
      name: yup.string().required(t("textField.yup.name")),
      code: yup.string().required(t("textField.yup.code.required")),
    })
    .required();
