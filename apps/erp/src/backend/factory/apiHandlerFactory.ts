import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { CustomResponse } from "@/backend/types/api/CustomResponse";
import type {
  CustomApiHandler,
  CustomApiHandlerFactory,
} from "@/backend/types/api/apiHandler";
import type { Params } from "@/utils/api/apiValidation";
import { apiValidation } from "@/utils/api/apiValidation";
import { responseConfig } from "@/backend/constant/responseConfig";
import { fillResponseLocals } from "@/utils/api/fillResponseLocals";

export function apiHandlerFactory<T>({ ...apiValidationParams }: Params = {}): (
  apiHandler: CustomApiHandler<T>,
) => CustomApiHandlerFactory<T | null> {
  return (apiHandler) =>
    async (request: NextRequest, response: CustomResponse) => {
      const context = { request, req: request, res: response, params: {} };
      const { req, res } = await fillResponseLocals(context);

      const apiValidationResult = await apiValidation(
        req,
        res,
        apiValidationParams,
      );

      if (apiValidationResult.message.length > 0) {
        return NextResponse.json({
          ...responseConfig.permissionDenied,
          message: [
            ...responseConfig.permissionDenied.message,
            ...apiValidationResult.message,
          ],
          result: null,
        });
      }

      const handlerResult = await apiHandler(req, res);

      // if (handlerResult === null) {
      //   // mean it should be handle by res.redirect or res.send,
      //   return;
      // }
      // const a = NextResponse.json(handlerResult);

      return NextResponse.json(handlerResult);
    };
}
