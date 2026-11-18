import { assertAdminToken } from '../utils/admin-auth'
import { countSubmissions, listSubmissions } from '../utils/db'

const MAX_LIMIT = 500

/**
 * Submissions for the leads inbox.
 *
 * The token is re-checked here rather than trusted from the page: the page and
 * this endpoint are separately reachable, so the data must be guarded at the
 * point it is served.
 */
export default defineEventHandler((event) => {
  const query = getQuery(event)
  assertAdminToken(event, typeof query.token === 'string' ? query.token : undefined)

  const limit = Math.min(Math.max(Number(query.limit) || 200, 1), MAX_LIMIT)
  const offset = Math.max(Number(query.offset) || 0, 0)

  // The inbox is never cached or indexed, wherever it is reached from.
  setResponseHeader(event, 'cache-control', 'no-store')
  setResponseHeader(event, 'x-robots-tag', 'noindex, nofollow, noarchive')

  const rows = listSubmissions(limit, offset)

  return {
    total: countSubmissions(),
    limit,
    offset,
    submissions: rows.map((r) => ({
      id: r.id,
      createdAt: r.created_at,
      name: r.name,
      organization: r.organization,
      email: r.email,
      phone: r.phone,
      industry: r.industry,
      services: r.services ? r.services.split(', ').filter(Boolean) : [],
      volume: r.volume,
      message: r.message,
      source: r.source,
      emailSent: Boolean(r.email_sent),
    })),
  }
})
