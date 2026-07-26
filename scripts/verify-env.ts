#!/usr/bin/env node

const checks = [
  { name: "NEXTAUTH_SECRET", required: true },
  { name: "MONGODB_URI", required: true },
  { name: "UPSTASH_REDIS_REST_URL", required: true },
  { name: "UPSTASH_REDIS_REST_TOKEN", required: true },
  { name: "NEXTAUTH_URL", required: true },
  { name: "INTERNAL_CRON_SECRET", required: true },
  { name: "EMAIL_PROVIDER_API_KEY", required: false },
  { name: "SMTP_HOST", required: false },
];

const missingCritical = [];
const missingOptional = [];

for (const check of checks) {
  if (!process.env[check.name]) {
    if (check.required) {
      missingCritical.push(check.name);
    } else {
      missingOptional.push(check.name);
    }
  }
}

if (missingCritical.length > 0) {
  console.error("CRITICAL: Missing required environment variables:");
  for (const name of missingCritical) {
    console.error(`  - ${name}`);
  }
  process.exit(1);
}

if (missingOptional.length > 0) {
  console.warn("WARNING: Missing optional environment variables:");
  for (const name of missingOptional) {
    console.warn(`  - ${name}`);
  }
}

console.log("PASS: All critical environment variables are set.");
if (missingOptional.length === 0) {
  console.log("PASS: All optional environment variables are set.");
}
process.exit(0);
