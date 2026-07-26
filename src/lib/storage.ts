export interface StorageConfig {
  endpoint: string;
  accessKey: string;
  secretKey: string;
  bucket: string;
}

export async function uploadBuffer(_key: string, _buffer: Buffer, _contentType: string): Promise<string> {
  throw new Error("Storage provider not configured");
}

export async function getSignedUrl(_key: string): Promise<string> {
  throw new Error("Storage provider not configured");
}

export async function deleteObject(_key: string): Promise<void> {
  throw new Error("Storage provider not configured");
}

let config: StorageConfig | null = null;

export function configureStorage(cfg: StorageConfig) {
  config = cfg;
}

export function getStorageConfig(): StorageConfig {
  if (!config) {
    const endpoint = process.env.STORAGE_ENDPOINT;
    const accessKey = process.env.STORAGE_ACCESS_KEY;
    const secretKey = process.env.STORAGE_SECRET_KEY;
    const bucket = process.env.STORAGE_BUCKET;

    if (endpoint && accessKey && secretKey && bucket) {
      config = { endpoint, accessKey, secretKey, bucket };
    }
  }

  if (!config) {
    throw new Error("Storage is not configured. Set STORAGE_ENDPOINT, STORAGE_ACCESS_KEY, STORAGE_SECRET_KEY, and STORAGE_BUCKET.");
  }

  return config;
}
