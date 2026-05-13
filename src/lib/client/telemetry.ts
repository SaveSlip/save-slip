import { type TelemetrySource } from "@/lib/telemetry";

type ClientTelemetryPayload = {
  source: TelemetrySource;
  message: string;
  digest?: string;
};

export async function postClientTelemetry(
  payload: ClientTelemetryPayload,
): Promise<void> {
  try {
    await fetch("/api/telemetry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    // fire-and-forget — never throw from telemetry
  }
}
