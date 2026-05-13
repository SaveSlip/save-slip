export const VALID_TELEMETRY_SOURCES = [
  "ClientBoundary",
  "GlobalError",
  "UnhandledRejection",
  "ClipboardCopy",
  "ContactFormValidation",
] as const;

export type TelemetrySource = (typeof VALID_TELEMETRY_SOURCES)[number];
