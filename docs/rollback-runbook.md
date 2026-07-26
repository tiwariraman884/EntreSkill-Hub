# Rollback Runbook

## 1. Vercel Rollback (Application)

Vercel retains prior production deployments. Rollback is a one-click action.

### Steps

1. Open Vercel dashboard → **Deployments** for `entreskillhub`
2. Identify the last known good production deployment (preceding the bad deploy)
3. Click the **⋯** (more) menu on that deployment
4. Select **Promote to Production**
5. Confirm promotion
6. Wait for the promotion to complete (~30-60 seconds)

### Verification

- Smoke test critical flows:
  - Homepage loads
  - Registration/login works
  - Dashboard accessible
  - Admin routes accessible for admin users
- Monitor Sentry for new errors post-rollback
- Check Vercel Analytics for error rate returning to baseline

### Target Time-to-Rollback

< 5 minutes

## 2. Database Rollback

MongoDB schema changes follow additive-first policy. Destructive changes require a two-step deprecation cycle.

### If a migration causes issues

1. Identify the problematic migration timestamp
2. Run the rollback:
   ```bash
   npm run migrate -- --down scripts/migrations/YYYYMMDDHHMMSS-description.ts
   ```
3. Verify data integrity after rollback
4. If rollback is not possible (e.g., data loss), use MongoDB Atlas point-in-time recovery:
   - Go to Atlas → **Cluster** → **Backup** → **Restore**
   - Select point-in-time before the migration
   - Follow Atlas restore procedure

### Notes

- Always test migrations against Staging first before running on Production
- Never drop a collection or remove a field in a single migration
- Keep rollback scripts tested and up-to-date

## 3. Emergency Contacts

- Engineering lead: [to be filled]
- Vercel support: https://vercel.com/support
- MongoDB Atlas support: https://support.mongodb.com
