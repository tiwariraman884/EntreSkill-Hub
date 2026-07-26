require("dotenv/config");

beforeAll(async () => {
  process.env.NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "test-secret";
  process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";
  process.env.MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost:27017/entre-skill-hub-test";
});

afterAll(async () => {
  // cleanup if needed
});
