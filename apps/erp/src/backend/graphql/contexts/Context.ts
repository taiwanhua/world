import type { YogaInitialContext } from "graphql-yoga";
import type { NextRequest } from "next/server";
import type { CustomResponse } from "@/backend/types/api/CustomResponse";

export interface GraphqlServerContext {
  req: NextRequest;
  res: CustomResponse;
}

export type GraphqlContext = YogaInitialContext & GraphqlServerContext;
