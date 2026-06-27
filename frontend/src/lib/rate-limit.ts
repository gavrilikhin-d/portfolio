import { Duration, Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const MAX_REQUESTS = parseInt(process.env.MAX_EMAILS ?? "3", 10);
const WINDOW_DURATION = (process.env.RATE_LIMIT_WINDOW ?? "24h") as Duration;

export const contactIpLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(MAX_REQUESTS, WINDOW_DURATION),
  prefix: "contact:ip",
  analytics: true
})

export function formatRetryAfter(ms: number): string {
  const minutes = Math.ceil(ms / 60_000);

  if (minutes >= 24 * 60) {
    const days = Math.ceil(ms / 86_400_000);
    return days === 1 ? "1 day" : `${days} days`;
  }

  if (minutes >= 60) {
    const hours = Math.ceil(ms / 3_600_000);
    return hours === 1 ? "1 hour" : `${hours} hours`;
  }

  return minutes === 1 ? "1 minute" : `${minutes} minutes`;
}
