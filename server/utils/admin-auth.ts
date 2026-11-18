import { timingSafeEqual } from 'node:crypto'
import type { H3Event } from 'h3'

/** Short tokens are guessable; refuse to run the inbox on one. */
const MIN_TOKEN_LENGTH = 24

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  // timingSafeEqual throws on length mismatch, which would itself leak length.
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

/**
 * Gate for the leads inbox.
 *
 * Throws 404 — never 401 or 403 — on every failure, so the inbox is
 * indistinguishable from a page that does not exist. A 403 would confirm the
 * path is real and invite guessing at the token.
 */
export function assertAdminToken(event: H3Event, supplied: string | undefined) {
  const expected = String(useRuntimeConfig().adminToken || '')

  const notFound = () =>
    createError({ statusCode: 404, statusMessage: 'Page not found', fatal: false })

  if (!expected) {
    console.warn(
      '[inbox] NUXT_ADMIN_TOKEN is not set — the leads inbox is disabled. ' +
        'Set it to a random string of at least 24 characters to enable it.',
    )
    throw notFound()
  }

  if (expected.length < MIN_TOKEN_LENGTH) {
    console.warn(
      `[inbox] NUXT_ADMIN_TOKEN is only ${expected.length} characters — the inbox is ` +
        `disabled. Use at least ${MIN_TOKEN_LENGTH}.`,
    )
    throw notFound()
  }

  if (!supplied || !safeEqual(supplied, expected)) {
    throw notFound()
  }
}
