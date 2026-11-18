import { createHash } from 'node:crypto'
import { insertSubmission, markEmailSent } from '../utils/db'
import { sendSubmissionEmail } from '../utils/mail'
import { rateLimit } from '../utils/rate-limit'
import { isHoneypotTripped, validateSubmission } from '../utils/validate'

/** 5 submissions per IP per 10 minutes. Generous for a human, tight for a script. */
const LIMIT = 5
const WINDOW_MS = 10 * 60 * 1000

/**
 * Stores the IP as a salted hash rather than in the clear: it is only ever
 * needed to group repeat submissions and rate-limit, never to identify anyone.
 */
function hashIp(ip: string): string {
  return createHash('sha256').update(`clariauth:${ip}`).digest('hex').slice(0, 32)
}

export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'

  const limit = rateLimit(`contact:${ip}`, LIMIT, WINDOW_MS)
  if (!limit.allowed) {
    setResponseHeader(event, 'Retry-After', String(limit.retryAfterSec))
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests',
      data: { message: 'Too many submissions from this connection. Please try again shortly.' },
    })
  }

  const body = await readBody(event).catch(() => null)

  // Bots fill the hidden field. Answer 200 so they learn nothing, and store nothing.
  if (isHoneypotTripped(body)) {
    return { ok: true, id: null }
  }

  const { ok, errors, value } = validateSubmission(body)
  if (!ok) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation failed',
      data: { errors },
    })
  }

  let id: number
  try {
    id = insertSubmission({
      ...value,
      ipHash: hashIp(ip),
      userAgent: (getRequestHeader(event, 'user-agent') || '').slice(0, 400),
    })
  } catch (err) {
    console.error('[contact] failed to store submission:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not store submission',
      data: { message: 'We could not record your request. Please email us directly.' },
    })
  }

  // The lead is safe in the database by this point, so a mail failure is
  // logged and reported back as `emailed: false` — never as a failed request.
  const emailed = await sendSubmissionEmail(value, id)
  if (emailed) {
    try {
      markEmailSent(id)
    } catch (err) {
      console.error('[contact] failed to flag submission as emailed:', err)
    }
  }

  setResponseStatus(event, 201)
  return { ok: true, id, emailed }
})
