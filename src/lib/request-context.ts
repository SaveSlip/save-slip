"server-only";

import { NextRequest } from "next/server";
import { nanoid } from "nanoid";

const ALLOWLIST_HEADERS = [
  "host",
  "user-agent",
  "accept-language",
  "referer",
  "x-request-id",
  "cf-connecting-ip",
  "cf-ipcity",
  "cf-ipcountry",
  "cf-ipcontinent",
  "cf-iplongitude",
  "cf-iplatitude",
  "cf-region",
  "cf-region-code",
  "cf-metro-code",
  "cf-postal-code",
  "cf-timezone",
  "cf-ray",
  "sec-ch-ua",
  "sec-ch-ua-mobile",
  "sec-ch-ua-platform",
  "x-forwarded-for",
];

export function extractRequestContext(req: NextRequest) {
  const requestId = req.headers.get("x-request-id") || nanoid();

  const ip =
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    undefined;

  const headers: Record<string, string | undefined> = {};
  for (const h of ALLOWLIST_HEADERS) {
    const v = req.headers.get(h);
    if (v !== null) headers[h] = v;
  }

  const hasCookie = req.headers.get("cookie") ? true : false;

  return {
    requestId,
    ip,
    headers,
    hasCookie,
  } as const;
}
