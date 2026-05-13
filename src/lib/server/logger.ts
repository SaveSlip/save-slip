"server-only";

import pino, { Logger, LoggerOptions } from "pino";

import { env } from "@/env/server";

const base = {
  env: env.APP_ENV,
  version: env.VERSION,
  node: process.version,
};

const options: LoggerOptions = {
  level: env.LOG_LEVEL,
  transport:
    env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            ignore: "pid,hostname",
          },
        }
      : undefined,
  base,
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "res.headers.cookie",
      "*.password",
      "*.secret",
      "*.token",
      "*.email",
      "*.name",
      "*.message",
    ],
    censor: "[REDACTED]",
  },
};

type LogMethod = (obj: { event: string; [key: string]: unknown }) => void;

export interface RequestLogger {
  info: LogMethod;
  warn: LogMethod;
  error: LogMethod;
  child: Logger["child"];
  bindings: Logger["bindings"];
}

const logger: Logger = pino(options);

export function createRequestLogger(context: LoggerContext): RequestLogger {
  return logger.child({
    ...context,
  }) as RequestLogger;
}

export type LoggerContext = {
  requestId: string;
  traceId?: string;
  [key: string]: unknown;
};
