type Entry = {
  count: number;
  time: number;
};

const requests = new Map<string, Entry>();

export function rateLimit(ip: string, limit = 5, windowMs = 60000) {
  const now = Date.now();
  const entry = requests.get(ip);

  if (!entry) {
    requests.set(ip, { count: 1, time: now });
    return true;
  }

  if (now - entry.time > windowMs) {
    requests.set(ip, { count: 1, time: now });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count++;
  return true;
}