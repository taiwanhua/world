import type { NextRequest, NextResponse } from "next/server";
import type { BaseResponse } from "@/backend/graphql/types";
import type { CustomResponse } from "./CustomResponse";

export interface GraphqlFactoryResponse<Data = null> extends BaseResponse {
  result?: Data; // to fit graphql schema
}

export interface FactoryResponse<Data = null> extends BaseResponse {
  result: Data;
}

export type CustomApiHandlerFactory<Data = null> = (
  req: NextRequest,
  res: CustomResponse,
) => Promise<NextResponse<FactoryResponse<Data>>>;

export type CustomApiHandler<Data = null> = (
  req: NextRequest,
  res: CustomResponse,
) => Promise<FactoryResponse<Data>>;
