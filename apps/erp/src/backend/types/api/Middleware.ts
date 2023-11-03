import type { NextRequest } from "next/server";
import type { CustomResponse } from "@/backend/types/api/CustomResponse";

export type Middleware = (
  req: NextRequest,
  res: CustomResponse,
) => Promise<void> | void;
