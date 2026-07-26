# Pre-Launch Checklist

## Environments
- [ ] All environment variables set in Vercel for Production scope
- [ ] MongoDB Atlas IP allowlist configured (or VPC peering if applicable)
- [ ] Redis instance provisioned and tested under expected load
- [ ] DNS cutover tested on staging domain first
- [ ] HTTPS/TLS certificate active and auto-renewing
- [ ] Cron jobs verified running on schedule in staging
- [ ] Error tracking receiving events from staging
- [ ] Full E2E suite green against staging
- [ ] Security headers verified (CSP, HSTS, X-Frame-Options)
- [ ] Backup policy confirmed on MongoDB Atlas (automated daily backups, point-in-time recovery enabled)
- [ ] Rollback procedure dry-run completed

## Verification Steps
1. Run `npx jest --config jest.config.js tests/unit --coverage --runInBand --detectOpenHandles` and confirm coverage meets thresholds.
2. Run `npx next build` and confirm zero TypeScript errors.
3. Run `npx tsx scripts/verify-env.ts` and confirm all critical env vars are present.
4. Vercify `_next/static`, `/api/*`, and static asset routes are excluded from auth middleware in `proxy.ts`.
5. Confirm `INTERNAL_CRON_SECRET` is set and Vercel Cron jobs are configured for `/api/cron/*`.
6. Confirm `ALERT_WEBHOOK_URL` and `ALERT_WEBHOOK_SECRET` are set for production alerting.
7. Review rollback runbook at `docs/rollback-runbook.md` with the on-call team.
