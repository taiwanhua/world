import type { NextResponse } from "next/server";
// import type { Services } from "@/backend/prisma/service/services";
import type { SystemUser } from "@/backend/graphql/types";

export interface Locals {
  me: SystemUser | null;
  updatedUser: string;
  // db: Services;
}

export interface CustomResponse<T = unknown> extends NextResponse<T> {
  locals: Locals;
}
