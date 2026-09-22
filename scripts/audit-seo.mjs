/**
 * SEO + accessibility smoke test for the generated static site.
 *
 * Checks every route for: HTTP 200, exactly one <h1>, title length, meta
 * description presence and length, canonical, og:image, JSON-LD, img alt
 * text, accessible link text, heading-level jumps, duplicate titles or
 * descriptions, and broken internal links.
 *
 *   npm run generate
 *   npm run serve          # in another terminal
 *   npm run audit:seo
 *
 * Env: BASE (default http://localhost:4173), CHROME_PATH (to use an existing
 * Chromium instead of the one Playwright downloads).
 *
 * Exits non-zero when any problem is found, so it can gate a deploy.
 */
import { chromium } from 'playwright'
const B = process.env.BASE || 'http://localhost:4173'
const routes = ['/', '/services', '/services/insurance-eligibility-verification', '/services/benefits-verification',
  '/services/prior-authorization-support', '/services/payer-portal-follow-up', '/services/authorization-requirements-research',
  '/industries', '/industries/home-health', '/industries/radiology-imaging', '/industries/medical-practices',
  '/industries/therapy-rehabilitation', '/industries/other-healthcare-organizations',
  '/how-it-works', '/about', '/faq', '/contact', '/thank-you', '/privacy-policy', '/terms']

const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
)
const p = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage()

const problems = []
const seenTitles = new Map(), seenDescs = new Map()
const allLinks = new Set()

console.log('route'.padEnd(52), 'title'.padEnd(6), 'desc', ' h1 canonical')
for (const r of routes) {
  const res = await p.goto(B + r, { waitUntil: 'domcontentloaded' })
  const d = await p.evaluate(() => ({
    title: document.title,
    desc: document.querySelector('meta[name="description"]')?.content || '',
    canonical: document.querySelector('link[rel="canonical"]')?.href || '',
    robots: document.querySelector('meta[name="robots"]')?.content || '',
    og: !!document.querySelector('meta[property="og:image"]'),
    h1s: [...document.querySelectorAll('h1')].map(h => h.textContent.trim()),
    headings: [...document.querySelectorAll('h1,h2,h3,h4')].map(h => +h.tagName[1]),
    imgsNoAlt: [...document.querySelectorAll('img')].filter(i => !i.hasAttribute('alt')).length,
    links: [...document.querySelectorAll('a[href^="/"]')].map(a => a.getAttribute('href')),
    emptyLinks: [...document.querySelectorAll('a')].filter(a => !a.textContent.trim() && !a.getAttribute('aria-label')).length,
    lang: document.documentElement.lang,
    jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].length,
  }))
  d.links.forEach(l => allLinks.add(l.split('#')[0]))

  console.log(r.padEnd(52), String(d.title.length).padEnd(6), String(d.desc.length).padEnd(4), d.h1s.length, d.canonical.replace('https://clariauth.com',''))

  if (res.status() !== 200) problems.push(`${r}: HTTP ${res.status()}`)
  if (d.h1s.length !== 1) problems.push(`${r}: ${d.h1s.length} h1 tags`)
  if (!d.title) problems.push(`${r}: no title`)
  if (d.title.length > 65) problems.push(`${r}: title ${d.title.length} chars (>65) "${d.title}"`)
  if (!d.desc) problems.push(`${r}: no meta description`)
  if (d.desc.length > 165) problems.push(`${r}: desc ${d.desc.length} chars (>165)`)
  if (d.desc.length < 70 && d.desc) problems.push(`${r}: desc only ${d.desc.length} chars`)
  if (!d.canonical) problems.push(`${r}: no canonical`)
  if (!d.og && r !== '/thank-you') problems.push(`${r}: no og:image`)
  if (d.imgsNoAlt) problems.push(`${r}: ${d.imgsNoAlt} img(s) without alt`)
  if (d.emptyLinks) problems.push(`${r}: ${d.emptyLinks} link(s) with no accessible text`)
  if (d.lang !== 'en-US') problems.push(`${r}: lang="${d.lang}"`)
  if (!d.jsonld) problems.push(`${r}: no JSON-LD`)
  if (r === '/thank-you' && !d.robots.includes('noindex')) problems.push(`${r}: should be noindex`)

  // heading order
  for (let i = 1; i < d.headings.length; i++) {
    if (d.headings[i] - d.headings[i-1] > 1) { problems.push(`${r}: heading jump h${d.headings[i-1]}→h${d.headings[i]}`); break }
  }
  // duplicates
  if (seenTitles.has(d.title)) problems.push(`${r}: duplicate title with ${seenTitles.get(d.title)}`)
  seenTitles.set(d.title, r)
  if (d.desc && seenDescs.has(d.desc)) problems.push(`${r}: duplicate description with ${seenDescs.get(d.desc)}`)
  seenDescs.set(d.desc, r)
}

// internal link integrity
console.log('\nChecking', allLinks.size, 'unique internal links…')
for (const l of allLinks) {
  const r = await p.goto(B + l, { waitUntil: 'commit' }).catch(() => null)
  if (!r || r.status() >= 400) problems.push(`BROKEN LINK: ${l} (${r ? r.status() : 'failed'})`)
}

console.log('\n' + '='.repeat(60))
console.log(problems.length ? 'PROBLEMS:\n' + problems.map(x => ' - ' + x).join('\n') : 'No problems found.')
await browser.close()
process.exit(problems.length ? 1 : 0)
