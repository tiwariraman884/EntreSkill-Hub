import { Redis } from "@upstash/redis";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

let redis: Redis | null = null;
if (url && token) {
  redis = new Redis({ url, token });
}

export async function rateLimit(key: string): Promise<{ allowed: boolean; remaining: number }> {
  if (!redis) {
    return { allowed: true, remaining: MAX_ATTEMPTS };
  }

  try {
    const attempts = await redis.incr(key);
    if (attempts === 1) {
      await redis.expire(key, Math.floor(WINDOW_MS / 1000));
    }
    const remaining = Math.max(MAX_ATTEMPTS - attempts, 0);
    return { allowed: attempts <= MAX_ATTEMPTS, remaining };
  } catch {
    return { allowed: true, remaining: MAX_ATTEMPTS };
  }
}
