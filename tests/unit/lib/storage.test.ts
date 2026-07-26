import { getStorageConfig, configureStorage } from "@/lib/storage";

describe("storage", () => {
  it("throws when storage is not configured", () => {
    delete process.env.STORAGE_ENDPOINT;
    delete process.env.STORAGE_ACCESS_KEY;
    delete process.env.STORAGE_SECRET_KEY;
    delete process.env.STORAGE_BUCKET;

    expect(() => getStorageConfig()).toThrow("Storage is not configured");
  });

  it("returns config when environment variables are set", () => {
    process.env.STORAGE_ENDPOINT = "http://localhost:9000";
    process.env.STORAGE_ACCESS_KEY = "key";
    process.env.STORAGE_SECRET_KEY = "secret";
    process.env.STORAGE_BUCKET = "bucket";

    const config = getStorageConfig();
    expect(config.endpoint).toBe("http://localhost:9000");
    expect(config.bucket).toBe("bucket");
  });
});
