const DURATION_UNITS: Record<string, number> = {
  s: 1_000,
  sec: 1_000,
  m: 60_000,
  min: 60_000,
  h: 3_600_000,
  hr: 3_600_000,
  d: 86_400_000,
  day: 86_400_000,
};

export function parseDuration(value: string): number {
  const match = value.trim().match(/^(\d+(?:\.\d+)?)(s|sec|m|min|h|hr|d|day)$/i);

  if (!match) {
    throw new Error(
      `Invalid duration "${value}". Use formats like "24h", "12min", "30s", or "1d".`,
    );
  }

  const amount = Number(match[1]);
  const unit = match[2].toLowerCase();
  const multiplier = DURATION_UNITS[unit];

  if (!multiplier) {
    throw new Error(`Unknown duration unit in "${value}".`);
  }

  return amount * multiplier;
}
