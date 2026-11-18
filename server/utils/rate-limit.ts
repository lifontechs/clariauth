/**
 * Fixed-window rate limiter held in process memory.
 *
 * Enough to stop a single source hammering the form. It is per-instance, so
 * behind several instances the effective limit multiplies — put a real limiter
 * at the edge (Cloudflare, your proxy) if this ever needs to be a hard control.
 */
const hits = new Map<string, { count: number; resetAt: number }>()

/** Stops the map growing without bound on a long-lived process. */
function sweep(now: number) {
  if (hits.size < 5000) return
  for (const [key, entry] of hits) {
    if (entry.resetAt <= now) hits.delete(key)
  }
}

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now()
  sweep(now)

  const entry = hits.get(key)
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, retryAfterSec: 0 }
  }

  entry.count += 1
  if (entry.count > limit) {
    return { allowed: false, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) }
  }
  return { allowed: true, retryAfterSec: 0 }
}
