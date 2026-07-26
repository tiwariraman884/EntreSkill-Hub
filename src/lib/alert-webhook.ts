export interface AlertPayload {
  level: "info" | "warning" | "error";
  source: string;
  message: string;
  details?: Record<string, unknown>;
}

const WEBHOOK_URL = process.env.ALERT_WEBHOOK_URL;
const WEBHOOK_SECRET = process.env.ALERT_WEBHOOK_SECRET;

export async function sendAlert(payload: AlertPayload): Promise<void> {
  if (!WEBHOOK_URL) {
    console.warn("ALERT_WEBHOOK_URL is not configured. Alert:", payload);
    return;
  }

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(WEBHOOK_SECRET ? { Authorization: `Bearer ${WEBHOOK_SECRET}` } : {}),
      },
      body: JSON.stringify({
        ...payload,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
      }),
    });
  } catch (error) {
    console.error("Failed to send alert webhook:", error);
  }
}
