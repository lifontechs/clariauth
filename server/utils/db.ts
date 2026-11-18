import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import Database from 'better-sqlite3'

export interface SubmissionRow {
  id: number
  created_at: string
  name: string
  organization: string
  email: string
  phone: string
  industry: string
  services: string
  volume: string
  message: string
  source: string
  ip_hash: string
  user_agent: string
  email_sent: number
}

export interface SubmissionInput {
  name: string
  organization: string
  email: string
  phone?: string
  industry?: string
  services?: string[]
  volume?: string
  message: string
  source?: string
  ipHash?: string
  userAgent?: string
}

let db: Database.Database | null = null

/**
 * Opens (and on first use creates) the submissions database.
 *
 * SQLite on a local file is the right shape here: submissions are low volume,
 * write-rarely/read-rarely, and keeping them on the same host avoids handing
 * lead data to another third party. It does require a persistent disk — see
 * the README for the Postgres swap needed on ephemeral/serverless hosting.
 */
export function useDb(): Database.Database {
  if (db) return db

  const path = resolve(useRuntimeConfig().databasePath)
  mkdirSync(dirname(path), { recursive: true })

  db = new Database(path)
  // WAL survives an unclean shutdown better and lets reads proceed during a write.
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')

  db.exec(`
    CREATE TABLE IF NOT EXISTS submissions (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at   TEXT    NOT NULL DEFAULT (datetime('now')),
      name         TEXT    NOT NULL,
      organization TEXT    NOT NULL,
      email        TEXT    NOT NULL,
      phone        TEXT    NOT NULL DEFAULT '',
      industry     TEXT    NOT NULL DEFAULT '',
      services     TEXT    NOT NULL DEFAULT '',
      volume       TEXT    NOT NULL DEFAULT '',
      message      TEXT    NOT NULL,
      source       TEXT    NOT NULL DEFAULT '',
      ip_hash      TEXT    NOT NULL DEFAULT '',
      user_agent   TEXT    NOT NULL DEFAULT '',
      email_sent   INTEGER NOT NULL DEFAULT 0
    );
    CREATE INDEX IF NOT EXISTS idx_submissions_created_at
      ON submissions (created_at DESC);
  `)

  return db
}

export function insertSubmission(input: SubmissionInput): number {
  const stmt = useDb().prepare(`
    INSERT INTO submissions
      (name, organization, email, phone, industry, services, volume, message,
       source, ip_hash, user_agent)
    VALUES
      (@name, @organization, @email, @phone, @industry, @services, @volume,
       @message, @source, @ipHash, @userAgent)
  `)

  const info = stmt.run({
    name: input.name,
    organization: input.organization,
    email: input.email,
    phone: input.phone ?? '',
    industry: input.industry ?? '',
    services: (input.services ?? []).join(', '),
    volume: input.volume ?? '',
    message: input.message,
    source: input.source ?? '',
    ipHash: input.ipHash ?? '',
    userAgent: input.userAgent ?? '',
  })

  return Number(info.lastInsertRowid)
}

export function markEmailSent(id: number) {
  useDb().prepare('UPDATE submissions SET email_sent = 1 WHERE id = ?').run(id)
}

export function listSubmissions(limit = 200, offset = 0): SubmissionRow[] {
  return useDb()
    .prepare('SELECT * FROM submissions ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?')
    .all(limit, offset) as SubmissionRow[]
}

export function countSubmissions(): number {
  const row = useDb().prepare('SELECT COUNT(*) AS n FROM submissions').get() as { n: number }
  return row.n
}
