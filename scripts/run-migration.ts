import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Please define MONGODB_URI environment variable");
  process.exit(1);
}

async function runMigration(filePath: string, direction: "up" | "down") {
  const migration = await import(filePath);
  const fn = direction === "up" ? migration.up : migration.down;
  if (typeof fn !== "function") {
    console.error(`Migration ${filePath} does not export ${direction}()`);
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI as string);
  try {
    await fn();
    console.log(`Migration ${direction} completed: ${filePath}`);
  } catch (error: unknown) {
    console.error(`Migration ${direction} failed:`, error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error("Usage: npm run migrate -- --up|--down <migration-file>");
    process.exit(1);
  }

  const direction = args[0].replace(/^--/, "") as "up" | "down";
  const filePath = args[1];

  await runMigration(filePath, direction);
}

main();
