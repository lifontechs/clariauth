import type { SubmissionInput } from './db'

const MAX = {
  name: 120,
  organization: 160,
  email: 254,
  phone: 40,
  industry: 80,
  volume: 80,
  message: 5000,
  source: 200,
  userAgent: 400,
  services: 20,
} as const

/** Deliberately permissive: the goal is to reject nonsense, not police addresses. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const str = (v: unknown, max: number) =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

export interface ValidationResult {
  ok: boolean
  errors: Record<string, string>
  value: SubmissionInput
}

/**
 * Validates a contact submission on the server.
 *
 * The browser does its own check for usability, but that is not a control —
 * anything can post to this endpoint, so every field is re-checked and
 * length-capped here before it reaches the database.
 */
export function validateSubmission(body: unknown): ValidationResult {
  const b = (body ?? {}) as Record<string, unknown>
  const errors: Record<string, string> = {}

  const name = str(b.name, MAX.name)
  const organization = str(b.organization, MAX.organization)
  const email = str(b.email, MAX.email)
  const message = str(b.message, MAX.message)

  if (!name) errors.name = 'Please enter your name.'
  if (!organization) errors.organization = 'Please enter your organization.'
  if (!email) errors.email = 'Please enter your work email.'
  else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.'
  if (!message) errors.message = 'Please tell us what you need help with.'

  const services = Array.isArray(b.services)
    ? b.services
        .filter((s): s is string => typeof s === 'string')
        .slice(0, MAX.services)
        .map((s) => s.trim().slice(0, 120))
        .filter(Boolean)
    : []

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    value: {
      name,
      organization,
      email,
      phone: str(b.phone, MAX.phone),
      industry: str(b.industry, MAX.industry),
      volume: str(b.volume, MAX.volume),
      message,
      services,
      source: str(b.source, MAX.source),
    },
  }
}

/** True when the hidden honeypot field was filled, which only a bot does. */
export function isHoneypotTripped(body: unknown): boolean {
  const v = (body as Record<string, unknown> | null)?.website
  return typeof v === 'string' && v.trim().length > 0
}
