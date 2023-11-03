import type { NextRequest } from "next/server";
import type { Middleware } from "@/backend/types/api/Middleware";
import type { CustomResponse } from "@/backend/types/api/CustomResponse";

export const corsMiddleware: Middleware = (
  req: NextRequest,
  res: CustomResponse,
) => {
  const requestHeaders = new Headers(req.headers);

  let whiteList: string[] = [];
  try {
    whiteList = JSON.parse(process.env.CORS_WHITE_LIST_URLS ?? "") as string[];
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(
      "(process.env.CORS_WHITE_LIST_URLS should be string[] (can be Empty)",
      e,
    );
  }

  const origin = requestHeaders.get("origin") ?? "";

  if (whiteList.includes(origin)) {
    //   res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
  }
};
