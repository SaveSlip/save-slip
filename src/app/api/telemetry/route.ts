import { NextRequest, NextResponse } from "next/server";

import { createRequestLogger } from "@/lib/server/logger";
import { extractRequestContext } from "@/lib/server/request-context";
import { handleApiError } from "@/lib/server/error-handler";
import { VALID_TELEMETRY_SOURCES, type TelemetrySource } from "@/lib/telemetry";

const MAX_MESSAGE_LENGTH = 500;
const MAX_URL_LENGTH = 2000;
const MAX_DIGEST_LENGTH = 64;
const MAX_SOURCE_LENGTH = 64;

type TelemetryBody = {
  source: TelemetrySource;
  message: string;
  digest?: string;
  url: string;
  timestamp: string;
};

function parseTelemetryBody(raw: unknown): TelemetryBody | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;

  const body = raw as Record<string, unknown>;

  if (typeof body.message !== "string" || !body.message.trim()) return null;
  if (typeof body.url !== "string" || !body.url.trim()) return null;
  if (typeof body.timestamp !== "string") return null;

  const rawSource =
    typeof body.source === "string"
      ? (body.source.slice(0, MAX_SOURCE_LENGTH) as TelemetrySource)
      : "ClientBoundary";
  const source: TelemetrySource = VALID_TELEMETRY_SOURCES.includes(rawSource)
    ? rawSource
    : "ClientBoundary";

  return {
    source,
    message: body.message.slice(0, MAX_MESSAGE_LENGTH),
    digest:
      typeof body.digest === "string"
        ? body.digest.slice(0, MAX_DIGEST_LENGTH)
        : undefined,
    url: body.url.slice(0, MAX_URL_LENGTH),
    timestamp: body.timestamp,
  };
}

export async function POST(req: NextRequest) {
  const ctx = extractRequestContext(req);
  const requestId = ctx.requestId;
  const logger = createRequestLogger({ requestId });

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return handleApiError({
      path: req.nextUrl.pathname,
      errorMessage: "Invalid request body - JSON parsing failed",
      statusCode: 400,
      requestId,
      logger,
    });
  }

  const body = parseTelemetryBody(raw);
  if (!body) {
    return handleApiError({
      path: req.nextUrl.pathname,
      errorMessage: "Missing or invalid required fields",
      statusCode: 400,
      requestId,
      logger,
    });
  }

  try {
    logger.error({
      event: "client.error",
      source: body.source,
      clientMessage: body.message,
      digest: body.digest,
      clientUrl: body.url,
      clientTimestamp: body.timestamp,
    });

    return NextResponse.json({ ok: true, requestId }, { status: 200 });
  } catch (err) {
    return handleApiError({
      path: req.nextUrl.pathname,
      err,
      requestId,
      logger,
    });
  }
}
