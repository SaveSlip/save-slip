"server-only";

import { NextResponse } from "next/server";

import { type RequestLogger } from "@/lib/server/logger";

type HandleApiErrorOptions = {
  path: string;
  requestId: string;
  err?: unknown;
  errorMessage?: string;
  statusCode?: number;
  logger: RequestLogger;
};

export function handleApiError(options: HandleApiErrorOptions) {
  const { path, err, errorMessage, statusCode, logger, requestId } = options;
  logger.error({
    event: "api.error",
    err: err || errorMessage || "Unknown error",
    path,
  });
  return NextResponse.json(
    {
      error: errorMessage || "Internal Server Error",
      requestId,
    },
    {
      status: statusCode || 500,
      headers: { "x-request-id": String(requestId) },
    },
  );
}
