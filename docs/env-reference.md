# Environment Variable Reference

This document lists all environment variables used in the EntreSkill Hub codebase.

## Database

| Variable | Required | Used In | Description |
|---|---|---|---|
| `MONGODB_URI` | Yes | `src/lib/mongoose.ts` | MongoDB connection string |

## Auth

| Variable | Required | Used In | Description |
|---|---|---|---|
| `NEXTAUTH_URL` | Yes | `src/lib/auth.ts`, `src/lib/email.ts` | Base URL for NextAuth |
| `NEXTAUTH_SECRET` | Yes | `src/lib/auth.ts` | Secret for JWT signing |
| `GOOGLE_CLIENT_ID` | No | `src/lib/auth.ts` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | No | `src/lib/auth.ts` | Google OAuth client secret |

## Redis / Rate Limiting

| Variable | Required | Used In | Description |
|---|---|---|---|
| `UPSTASH_REDIS_REST_URL` | Yes | `src/lib/rate-limit.ts` | Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Yes | `src/lib/rate-limit.ts` | Upstash Redis REST token |

## Object Storage

| Variable | Required | Used In | Description |
|---|---|---|---|
| `STORAGE_ENDPOINT` | No | `src/lib/storage.ts` | S3-compatible endpoint |
| `STORAGE_ACCESS_KEY` | No | `src/lib/storage.ts` | Storage access key |
| `STORAGE_SECRET_KEY` | No | `src/lib/storage.ts` | Storage secret key |
| `STORAGE_BUCKET` | No | `src/lib/storage.ts` | Storage bucket name |

## Email

| Variable | Required | Used In | Description |
|---|---|---|---|
| `EMAIL_PROVIDER_API_KEY` | No | `src/lib/email.ts` | Resend/SES API key (preferred) |
| `EMAIL_FROM_ADDRESS` | No | `src/lib/email.ts` | Default from address |
| `SMTP_HOST` | No | `src/lib/email.ts` | SMTP host (fallback) |
| `SMTP_PORT` | No | `src/lib/email.ts` | SMTP port (fallback) |
| `SMTP_USER` | No | `src/lib/email.ts` | SMTP user (fallback) |
| `SMTP_PASS` | No | `src/lib/email.ts` | SMTP password (fallback) |

## Cron / Internal Jobs

| Variable | Required | Used In | Description |
|---|---|---|---|
| `INTERNAL_CRON_SECRET` | Yes | `src/app/api/cron/**/route.ts` | Bearer token for cron endpoints |

## Monitoring

| Variable | Required | Used In | Description |
|---|---|---|---|
| `SENTRY_DSN` | No | `sentry.*.config.ts`, `next.config.ts` | Sentry DSN |
| `ALERT_WEBHOOK_URL` | No | (future) | Slack/email webhook for alerts |

## App

| Variable | Required | Used In | Description |
|---|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Yes | `src/lib/email.ts` | Public-facing app URL |

## Notes

- Vercel manages secrets via **Vercel Environment Variables** scoped per environment (Development / Preview / Production).
- `.env.example` contains placeholder values for local setup.
- Never commit actual secrets to the repository.
