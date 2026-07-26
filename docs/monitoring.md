# Monitoring & Alerting

## 1. Application Errors — Sentry

- **Tool:** Sentry (`@sentry/nextjs` wired into client, server, and edge)
- **Alert rules:**
  - Any new error type → immediate alert
  - Error rate spike (>2x baseline over 5 min) → alert
- **Configuration:** Set `SENTRY_DSN` in Vercel environment variables
- **Verification:** Trigger a test error in staging and confirm it appears in Sentry within 1 minute

## 2. Uptime

- **Tool:** Vercel Analytics + external uptime monitor (e.g., UptimeRobot, Better Uptime)
- **Monitors:**
  - `https://staging.entreskillhub.com` — alert if downtime > 2 min
  - `https://entreskillhub.com` — alert if downtime > 2 min
- **Response:** Page on-call engineer if production is down

## 3. API Latency

- **Tool:** Vercel Analytics
- **Threshold:** p95 latency > 1.5s sustained for 5 minutes
- **Alert:** Engineering Slack/email channel
- **Action:** Investigate slow queries, missing indexes, or upstream provider latency

## 4. Cron Job Failures

- **Tool:** Internal logging + alert webhook
- **Webhook URL:** Set `ALERT_WEBHOOK_URL` environment variable (Slack/email)
- **Trigger:** Any unhandled error in `/api/cron/*` routes sends a webhook payload
- **Payload:** `{ "service": "cron", "path": "/api/cron/session-expiry", "error": "...", "timestamp": "..." }`

## 5. MongoDB Atlas

- **Tool:** Atlas built-in monitoring
- **Alerts:**
  - Slow query alert: > 100ms
  - Connection pool saturation: > 80% utilized
  - Disk usage: > 80%
- **Action:** Review slow queries and add indexes; scale tier if connections saturated

## 6. Redis (Upstash)

- **Tool:** Upstash dashboard
- **Alerts:**
  - Command error rate > 1%
  - Latency p99 > 50ms
- **Action:** Review rate-limit logic for hot keys; consider key TTL tuning

## 7. Alert Routing

All alerts route to a shared engineering channel (Slack/email webhook). Configure before public launch.
