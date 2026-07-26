import { Redis } from "@upstash/redis";

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

export const redis = url && token ? new Redis({ url, token }) : null;

export async function getCached<T>(key: string): Promise<T | null> {
  if (!redis) return null;
  const value = await redis.get<T>(key);
  return value;
}

export async function setCached(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
  if (!redis) return;
  if (ttlSeconds) {
    await redis.setex(key, ttlSeconds, JSON.stringify(value));
  } else {
    await redis.set(key, JSON.stringify(value));
  }
}

export async function deleteCached(key: string): Promise<void> {
  if (!redis) return;
  await redis.del(key);
}

export async function invalidatePattern(pattern: string): Promise<void> {
  if (!redis) return;
  const keys = await redis.keys(pattern);
  if (keys.length > 0) {
    await redis.del(...keys);
  }
}
