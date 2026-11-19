# ClariAuth — clariauth.com

Marketing and lead-generation site for ClariAuth, a healthcare insurance
operations support company serving U.S. providers with eligibility
verification, benefits investigation, prior authorization support, payer
portal follow-up and authorization requirements research.

Built with **Nuxt 4**. Marketing pages are prerendered to real HTML at build
time, so crawlers and cold-outreach visitors get fully-formed markup with no
JavaScript execution required. Alongside them runs a small Nitro server that
handles the contact form API and the leads inbox.

---

## Quick start

```bash
npm install
cp .env.example .env     # then fill in at least NUXT_ADMIN_TOKEN
npm run dev              # http://localhost:3000
```

## Build and deploy

```bash
npm run build            # prerenders pages + bundles the server
npm run start            # runs it at http://localhost:3000
```

**This is no longer a static-only site.** It needs a Node runtime, because the
contact form posts to its own API and submissions are stored server-side.
`nuxt generate` has been removed on purpose — a static build would ship a form
posting to an endpoint that does not exist.

**Host settings**

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Start command | `npm run start` |
| Node version | 20 or newer |
| Persistent disk | **Required** — see Database below |

Suits Railway, Render, Fly.io, a VPS, or any Node host. Deploying to a
serverless platform needs the database swap described below, because the
filesystem there is wiped between invocations.

### Environment variables

Everything is in `.env.example`. The essentials:

| Variable | Purpose |
| --- | --- |
| `NUXT_ADMIN_TOKEN` | Secret path segment for the leads inbox. **Required** to enable it. Minimum 24 characters. |
| `NUXT_DATABASE_PATH` | Where the SQLite file lives. Must be on a persistent disk. |
| `NUXT_SMTP_*` | SMTP host, port, credentials, from and to addresses for new-lead notifications. |

Generate a token with `openssl rand -hex 32`.

---

## How a submission flows

1. The form posts to **`POST /api/contact`**.
2. The server re-validates every field, checks the honeypot, and rate-limits
   to 5 submissions per IP per 10 minutes.
3. The submission is written to the database.
4. A notification email is sent — and **if mail fails, the request still
   succeeds**. The lead is already stored, so an SMTP problem never becomes an
   error for the person filling in the form. Those rows show as *not emailed*
   in the inbox.
5. The visitor lands on `/thank-you`, which is where to fire a conversion event.

Client-side validation is for user experience only. The server re-checks
everything, because anything can post to the endpoint.

## Leads inbox

Visit **`/inbox/<NUXT_ADMIN_TOKEN>`**.

The URL is the password. There is no login, no cookie and no session — anyone
holding the link can read every submission, so share it like a credential.

Protections in place:

- Wrong, missing or short token returns **404, never 403**, so the page is
  indistinguishable from one that does not exist and the token cannot be
  probed for.
- Token comparison is timing-safe.
- Unset or under-24-character token disables the inbox entirely and logs why.
- Excluded from prerendering, the sitemap and `robots.txt`, and served with
  `noindex, nofollow`.

If the token ever leaks, change `NUXT_ADMIN_TOKEN` and restart — the old URL
dies immediately.

## Database

Submissions live in SQLite at `NUXT_DATABASE_PATH`. Low volume, no extra
vendor holding your lead data, and trivially backed up by copying the file.

**It needs a persistent disk.** On an ephemeral or serverless filesystem the
file is wiped on every deploy and submissions are silently lost. If you deploy
somewhere ephemeral, point `server/utils/db.ts` at hosted Postgres instead —
it is a single, self-contained module and the table schema is right at the top.

Back up by copying the `.sqlite` file (and its `-wal` sidecar) while the
server is stopped, or with `sqlite3 db.sqlite ".backup out.sqlite"` while it
runs.

### Shareable preview file

```bash
npm run build:preview     # → .preview/clariauth-preview.html
```

Produces the whole site as **one self-contained HTML file** — every page,
stylesheet, font and image inlined, with no external references. Useful for
emailing a review copy, opening from disk, or hosting anywhere that serves a
page from a path other than the origin root (where a normal build's absolute
`/_nuxt/…` references would 404 and the site would render unstyled).

It stitches the prerendered markup of all 20 routes into one document and swaps
them with a small hash router, so navigation works offline. The Nuxt client
bundle is left out — meaning the contact form does not submit in the preview.
Everything else is the real prerendered output.

This is a review artifact only; production deploys use `npm run generate`.

---

## Using an external form service instead

The built-in API is the default. To send submissions to a third party instead
— Formspree, HubSpot, your CRM — set an absolute URL:

```bash
NUXT_PUBLIC_FORM_ENDPOINT="https://formspree.io/f/xxxxxxxx" npm run build
```

Any endpoint accepting a JSON `POST` works. Note that this bypasses the
database and the leads inbox entirely: submissions go to that service and
nowhere else.

---

## Before go-live

- [ ] Point `site.url` in `nuxt.config.ts` at the production domain if it is not `clariauth.com`
- [ ] Set `NUXT_ADMIN_TOKEN` to a long random value — without it the leads inbox stays disabled
- [ ] Set `NUXT_SMTP_*` so new leads actually notify someone
- [ ] Confirm `NUXT_DATABASE_PATH` sits on a **persistent** disk, then submit a test lead and check it survives a redeploy
- [ ] Put a backup on the SQLite file — it is the only copy of your leads
- [ ] Update `linkedin` in `app/data/site.ts` to the real company page URL
- [ ] **Have `/privacy-policy` and `/terms` reviewed by counsel** — both are starting drafts, and the on-page notice saying so has been removed, so nothing on the live site flags them as unreviewed
- [ ] Update the privacy policy to say submissions are stored on your own server, how long you keep them, and who can read them
- [ ] Add a phone number to `app/data/site.ts` and the contact page if you want inbound calls
- [ ] Verify the domain in Google Search Console and submit `/sitemap.xml`
- [ ] Add analytics if wanted, and update the cookies section of the privacy policy to match

---

## Content lives in data files

Page content is separated from layout, so copy can be edited without touching
Vue templates:

| File | Contains |
| --- | --- |
| `app/data/site.ts` | Company details, nav, value props, differentiators, pain points, process steps |
| `app/data/services.ts` | All five services — each drives its own detail page and the services hub |
| `app/data/industries.ts` | All five specialties — each drives its own detail page and the industries hub |
| `app/data/faqs.ts` | FAQ entries; `featured: true` also surfaces the item on the homepage |

Adding a service or industry to its data file automatically creates the detail
page, the hub entry, the footer link, the sitemap entry and the JSON-LD. Add
the new slug to `staticRoutes` in `nuxt.config.ts` so it is prerendered
explicitly as well as crawled.

---

## SEO

- Static prerendering of all 20 routes, with a payload-free HTML fallback
- Per-page title, meta description and canonical
- Open Graph and Twitter card tags, with a branded 1200×630 social image
- JSON-LD: `Organization`, `WebSite`, `ProfessionalService`, `Service`,
  `FAQPage`, `BreadcrumbList`, `AboutPage`, `ContactPage`, `ItemList`
- `sitemap.xml` and `robots.txt` generated at build time; `/thank-you` excluded
- Self-hosted variable webfonts (188 KB total, latin + latin-ext) preloaded —
  no third-party font request at runtime

### Audit

```bash
npm run generate
npm run serve            # in another terminal
npm run audit:seo
```

Checks every route for HTTP status, single `<h1>`, title and description
length, canonical, `og:image`, JSON-LD, image alt text, accessible link text,
heading-level jumps, duplicate titles or descriptions, and broken internal
links. Exits non-zero on any problem, so it can gate a deploy.

---

## Brand assets

Generated from the supplied logo package into `public/brand` — cropped to the
artwork, background keyed to transparency, and with a stray rule under the
wordmark removed.

| File | Use |
| --- | --- |
| `clariauth-logo.png` | Primary lockup, light backgrounds |
| `clariauth-logo-white.png` | Reversed lockup, dark backgrounds |
| `clariauth-mark.png` / `clariauth-mark-white.png` | CA+ mark alone |
| `public/favicon.*`, `apple-touch-icon.png` | Icons |
| `public/og-image.png` | Social share card |

**Palette** (sampled from the logo artwork):

| Token | Hex | Use |
| --- | --- | --- |
| `--navy-800` | `#0A1E46` | Headings, footer, dark sections |
| `--blue-600` | `#0B4FD8` | Primary actions, accents, links |
| `--blue-50` | `#EFF5FF` | Tinted surfaces, icon wells |
| `--ink` | `#0E1A2F` | Body headings |
| `--body` | `#46566E` | Body copy |

**Type:** Plus Jakarta Sans (headings) and Inter (body).

---

## A note on claims

The copy deliberately avoids guaranteed approval rates, guaranteed revenue
outcomes, invented client counts and unsupported compliance claims. It says
"HIPAA-aware workflows" rather than "HIPAA compliant", and the FAQ and
How It Works pages state plainly what ClariAuth does not control.

Keep it that way. In healthcare B2B the claims a buyer can verify are worth
more than the ones they can't, and unsupported compliance language is a real
liability.
