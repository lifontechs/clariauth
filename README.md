# ClariAuth — clariauth.com

Marketing and lead-generation site for ClariAuth, a healthcare insurance
operations support company serving U.S. providers with eligibility
verification, benefits investigation, prior authorization support, payer
portal follow-up and authorization requirements research.

Built with **Nuxt 4** and statically generated — every route is prerendered to
real HTML, so crawlers and cold-outreach visitors get fully-formed markup with
no JavaScript execution required.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build and deploy

```bash
npm run generate     # outputs a fully static site to .output/public
npm run serve        # preview the static build at http://localhost:4173
```

`.output/public` is a plain folder of HTML, CSS, JS and assets. Deploy it to
any static host — Netlify, Vercel, Cloudflare Pages, S3 + CloudFront, or plain
nginx. No server runtime is required.

**Host settings**

| Setting | Value |
| --- | --- |
| Build command | `npm run generate` |
| Publish directory | `.output/public` |
| Node version | 20 or newer |

---

## Wiring up the contact form

The contact form has no backend. It reads an endpoint from runtime config and
**falls back to a prefilled `mailto:` link when none is set**, so a lead is
never silently dropped.

To send submissions to a real destination, set the environment variable at
build time:

```bash
NUXT_PUBLIC_FORM_ENDPOINT="https://formspree.io/f/xxxxxxxx" npm run generate
```

Any endpoint accepting a JSON `POST` works — Formspree, Netlify Forms, HubSpot,
Zapier, or your own CRM. On success the visitor is redirected to `/thank-you`,
which is the page to fire a conversion event from.

The form includes a honeypot field and client-side validation. **Validate
again server-side** — client-side checks are for user experience, not security.

---

## Before go-live

- [ ] Point `site.url` in `nuxt.config.ts` at the production domain if it is not `clariauth.com`
- [ ] Set `NUXT_PUBLIC_FORM_ENDPOINT` in the host's build environment
- [ ] Update `linkedin` in `app/data/site.ts` to the real company page URL
- [ ] **Have `/privacy-policy` and `/terms` reviewed by counsel** — both ship as marked templates
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
