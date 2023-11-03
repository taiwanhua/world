import * as yup from "yup";
import type { QuerySystemUserLoginTokenInput } from "@/frontend/graphql/query/system/check/systemUserLoginToken";

export const validationSchema =
  (): yup.ObjectSchema<QuerySystemUserLoginTokenInput> =>
    yup
      .object({
        email: yup.string().required("E-mail is required"),
        password: yup.string().required("Password is required"),
      })
      .required();
