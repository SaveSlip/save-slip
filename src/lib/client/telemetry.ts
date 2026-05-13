type ClientTelemetryPayload = {
  source: string;
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
      body: JSON.stringify(payload),
    });
  } catch {
    // fire-and-forget — never throw from telemetry
  }
}
