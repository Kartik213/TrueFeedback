import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis =
  redisUrl && redisToken
    ? new Redis({
        url: redisUrl,
        token: redisToken
      })
    : null;

const suggestionsLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(10, "10 m"),
      analytics: false,
      prefix: "ratelimit:suggestions"
    })
  : null;

export async function limitSuggestionRequest(identifier: string) {
  if (!suggestionsLimiter) {
    return { success: true, pending: 0, limit: 0, reset: 0 };
  }

  return suggestionsLimiter.limit(identifier);
}
