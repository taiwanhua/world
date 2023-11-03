import * as yup from "yup";
import { GetText } from "@/client/hooks/text/useTranslation";

export const validationSchema = (t: GetText) =>
  yup
    .object({
      name: yup.string().required(t("textField.yup.name")),
      pathname: yup.string().required(t("textField.yup.pathname")),
      parentId: yup
        .string()
        .nullable()
        .required(t("selectTextField.yup.parentMenu")),
      sort: yup.string().required(t("textField.yup.sort")),
    })
    .required();
