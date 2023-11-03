import type { NextRequest, NextResponse } from "next/server";
import { apiHandlerFactory } from "@/backend/factory/apiHandlerFactory";
import type { FactoryResponse } from "@/backend/types/api/apiHandler";
import { responseConfig } from "@/backend/constant/responseConfig";

interface Result {
  releaseTime: string;
  releaseVersion: string;
}

// eslint-disable-next-line @typescript-eslint/require-await
async function streaming(
  request: NextRequest,
  response: NextResponse,
): Promise<FactoryResponse<Result>> {
  const headers = new Headers(request.headers);

  // should get correct version in env file
  // eslint-disable-next-line no-console
  console.log(
    `${JSON.stringify(request)} ${JSON.stringify(headers)}`,
    `${JSON.stringify(response)} ${JSON.stringify(request)}`,
  );

  return {
    ...responseConfig.success,
    result: { releaseTime: "any time", releaseVersion: "0.0.0" },
  };
}

const getVersion = apiHandlerFactory<Result>()(streaming);

export { getVersion as GET };
