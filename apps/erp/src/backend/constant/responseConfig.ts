import type { BaseResponse } from "@/backend/graphql/types";

export const responseConfig = {
  success: {
    code: 0,
    message: [],
    statusCode: 200,
  },
  unauthorized: {
    code: 401000,
    message: ["Unauthorized"],
    statusCode: 401,
  },
  userNotFound: {
    code: 401001,
    message: ["User not found"],
    statusCode: 401,
  },
  permissionDenied: {
    code: 401002,
    message: ["Permission denied"],
    statusCode: 401,
  },
  userIsDisable: {
    code: 401003,
    message: ["This user is disable"],
    statusCode: 401,
  },
  notAllowGuest: {
    code: 401004,
    message: ["This api is not allow guest"],
    statusCode: 401,
  },
  loginEmailPasswordError: {
    code: 403001,
    message: ["Email or Password Error"],
    statusCode: 403,
  },

  // api message
  missingParameter: {
    code: 400001,
    message: ["Missing Parameter"],
    statusCode: 400,
  },
  badApiParameter: {
    code: 400002,
    message: ["Bad Parameter"],
    statusCode: 400,
  },
  validateParameterError: {
    code: 400003,
    message: ["Parameter Validation Error"],
    statusCode: 400,
  },
  dataDuplicate: {
    code: 400004,
    message: ["Data is duplicate, please check your data."],
    statusCode: 400,
  },

  dataNotFound: {
    code: 404001,
    message: ["Data not found"],
    statusCode: 404,
  },

  missRequirePermissionPath: {
    code: 500001,
    message: ["Miss require Permission Path"],
    statusCode: 500,
  },
} satisfies Record<string, BaseResponse>;

export type ResponseKey = keyof typeof responseConfig;
