# Database Migrations

## Overview

Migrations are timestamped scripts that modify the MongoDB schema or data in a controlled, reversible way. They are run manually against Staging first, then Production.

## Naming Convention

```
YYYYMMDDHHMMSS-description.ts
```

Example: `20240722170000-add-user-preferences.ts`

## Structure

Each migration file exports two functions:

```ts
export async function up(): Promise<void> {
  // Apply migration
}

export async function down(): Promise<void> {
  // Rollback migration
}
```

## Rules

1. **Additive-first:** New optional fields and new collections only. No removing or renaming fields in a single migration.
2. **Backward-compatible:** Changes must be safe for at least one release cycle.
3. **Destructive changes:** Require a two-step process:
   - Step 1: Deprecate field (mark as unused, stop writing to it)
   - Step 2 (next release): Remove field
4. **Rollback script:** Must accompany every migration with a tested `down()` implementation.
5. **Order:** Migrations run in timestamp order. Never edit an applied migration.

## Running Migrations

```bash
npm run migrate -- --up 20240722170000-add-user-preferences
npm run migrate -- --down 20240722170000-add-user-preferences
```

## Current Schema State

Baseline migration documents the current schema. No data changes are needed.
