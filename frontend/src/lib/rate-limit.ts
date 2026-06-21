import { parseDuration } from "@/lib/parse-duration";
import { EpochTime, IP } from "@/types";

type RateLimitRecord = {
  count: number;
  resetAt: EpochTime;
};

const MAX_REQUESTS = parseInt(process.env.MAX_EMAILS ?? "3", 10);
const WINDOW_MS = parseDuration(process.env.RATE_LIMIT_WINDOW ?? "24h");

const requestsByIp = new Map<IP | "unknown", RateLimitRecord>();

function pruneExpiredRecords(now: EpochTime) {
  for (const [ip, record] of requestsByIp) {
    if (now >= record.resetAt) {
      requestsByIp.delete(ip);
    }
  }
}

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterMs: number };

export function getRateLimitStatus(ip: IP | "unknown"): RateLimitResult {
  const now = Date.now() as EpochTime;
  const record = requestsByIp.get(ip);

  if (!record || now >= record.resetAt) {
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfterMs: record.resetAt - now };
  }

  return { allowed: true };
}

export function checkRateLimit(ip: IP | "unknown"): RateLimitResult {
  const now = Date.now() as EpochTime;
  pruneExpiredRecords(now);

  const record = requestsByIp.get(ip);

  if (!record || now >= record.resetAt) {
    requestsByIp.set(ip, { count: 1, resetAt: now + WINDOW_MS as EpochTime });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfterMs: record.resetAt - now };
  }

  record.count += 1;
  return { allowed: true };
}

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
