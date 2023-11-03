import * as yup from "yup";
import { GetText } from "@/client/hooks/text/useTranslation";

export const validationSchema = (t: GetText) =>
  yup
    .object({
      name: yup.string().required(t("textField.yup.name")),
      showName: yup.string().required(t("textField.yup.showName")),
      type: yup.string().nullable().required(t("textField.yup.functionType")),
      menuId: yup
        .string()
        .nullable()
        .required(t("selectTextField.yup.parentMenuId")),
    })
    .required();
