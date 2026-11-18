import nodemailer, { type Transporter } from 'nodemailer'
import type { SubmissionInput } from './db'

let transporter: Transporter | null = null
let warnedUnconfigured = false

function smtpConfig() {
  const { smtp } = useRuntimeConfig()
  return {
    host: String(smtp.host || ''),
    port: Number(smtp.port || 587),
    user: String(smtp.user || ''),
    password: String(smtp.password || ''),
    from: String(smtp.from || ''),
    to: String(smtp.to || ''),
  }
}

export function isMailConfigured(): boolean {
  const c = smtpConfig()
  return Boolean(c.host && c.from && c.to)
}

function getTransporter(): Transporter | null {
  if (transporter) return transporter

  const c = smtpConfig()
  if (!c.host || !c.from || !c.to) {
    if (!warnedUnconfigured) {
      warnedUnconfigured = true
      console.warn(
        '[mail] SMTP is not configured — submissions are still saved to the database, ' +
          'but no notification email is sent. Set NUXT_SMTP_HOST, NUXT_SMTP_FROM and NUXT_SMTP_TO.',
      )
    }
    return null
  }

  transporter = nodemailer.createTransport({
    host: c.host,
    port: c.port,
    // 465 is implicit TLS; everything else upgrades via STARTTLS.
    secure: c.port === 465,
    auth: c.user ? { user: c.user, pass: c.password } : undefined,
  })

  return transporter
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function buildBody(s: SubmissionInput, id: number) {
  const rows: [string, string][] = [
    ['Name', s.name],
    ['Organization', s.organization],
    ['Work email', s.email],
    ['Phone', s.phone || '—'],
    ['Specialty / industry', s.industry || '—'],
    ['Services needed', (s.services ?? []).join(', ') || '—'],
    ['Approximate volume', s.volume || '—'],
  ]

  const text = [
    `New consultation request (#${id})`,
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Message:',
    s.message,
  ].join('\n')

  const html = `
<div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#0e1a2f;line-height:1.5">
  <h2 style="margin:0 0 4px;color:#0a1e46;font-size:18px">New consultation request</h2>
  <p style="margin:0 0 18px;color:#6b7c94;font-size:13px">Submission #${id}</p>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px">
    ${rows
      .map(
        ([k, v]) => `<tr>
      <td style="padding:5px 18px 5px 0;color:#6b7c94;white-space:nowrap;vertical-align:top">${esc(k)}</td>
      <td style="padding:5px 0;font-weight:600">${esc(v)}</td>
    </tr>`,
      )
      .join('')}
  </table>
  <p style="margin:20px 0 6px;color:#6b7c94;font-size:13px">Message</p>
  <div style="white-space:pre-wrap;padding:14px 16px;background:#f6f9fd;border:1px solid #e3e9f2;border-radius:10px;font-size:14px">${esc(
    s.message,
  )}</div>
</div>`.trim()

  return { text, html }
}

/**
 * Sends the new-lead notification.
 *
 * Returns false rather than throwing when mail is unconfigured or the send
 * fails: the submission is already stored by this point, so a mail problem
 * must never turn into an error for the person who filled in the form.
 */
export async function sendSubmissionEmail(s: SubmissionInput, id: number): Promise<boolean> {
  const t = getTransporter()
  if (!t) return false

  const c = smtpConfig()
  const { text, html } = buildBody(s, id)

  try {
    await t.sendMail({
      from: c.from,
      to: c.to,
      // Lets you reply straight to the prospect from the notification.
      replyTo: `${s.name} <${s.email}>`,
      subject: `New consultation request — ${s.organization || s.name}`,
      text,
      html,
    })
    return true
  } catch (err) {
    console.error('[mail] failed to send submission notification:', err)
    return false
  }
}
