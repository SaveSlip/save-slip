"server-only";

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    LOG_LEVEL: z
      .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
      .default("info"),
    APP_ENV: z
      .enum(
        ["development", "test", "staging", "production"],
        "APP_ENV must be 'development', 'staging', 'production'",
      )
      .default("development"),
    VERSION: z.string(),
    APP_URL: z.url(),
  },
  experimental__runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
