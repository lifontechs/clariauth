/**
 * Builds a single self-contained HTML preview of the whole site.
 *
 *   npm run build:preview        →  .preview/clariauth-preview.html
 *
 * WHY
 * A normal static build references its assets absolutely (`/_nuxt/app.js`,
 * `/fonts/inter.woff2`, `/brand/logo.png`). That is correct for a real deploy,
 * but in a sandbox that serves the page from somewhere other than the origin
 * root every one of those 404s and the site renders as unstyled HTML. Rather
 * than guess the host's base path, this produces one file with no external
 * references, which therefore works at any path.
 *
 * HOW
 * It stitches the *prerendered* markup of every route into one document, one
 * <div data-route> per page, and swaps them with a ~20-line hash router. The
 * Nuxt client bundle is deliberately left out: the prerendered HTML is already
 * complete and styled, so the preview needs no framework runtime, cannot hit
 * module-resolution problems, and stays small. The handful of genuinely
 * interactive bits are re-implemented in plain JS below (the FAQ accordions
 * are native <details> and need nothing).
 *
 * This is a preview artifact only. Production deploys use `npm run generate`
 * and ship the real Nuxt app — see the README.
 */
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, extname, resolve as resolvePath } from 'node:path'

const DIST = '.output/public'
const OUT_DIR = '.preview'
const OUT_FILE = join(OUT_DIR, 'clariauth-preview.html')

const ROUTES = [
  '/', '/services', '/services/insurance-eligibility-verification',
  '/services/benefits-verification', '/services/prior-authorization-support',
  '/services/payer-portal-follow-up', '/services/authorization-requirements-research',
  '/industries', '/industries/home-health', '/industries/radiology-imaging',
  '/industries/medical-practices', '/industries/therapy-rehabilitation',
  '/industries/other-healthcare-organizations',
  '/how-it-works', '/about', '/faq', '/contact', '/thank-you',
  '/privacy-policy', '/terms',
]

const MIME = {
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
}

if (!existsSync(DIST)) {
  console.error(`No build at ${DIST}. Run: npm run generate`)
  process.exit(1)
}

const report = { pages: 0, css: 0, fonts: 0, images: 0 }
const dataUriFor = async (file) =>
  `data:${MIME[extname(file)] ?? 'application/octet-stream'};base64,` +
  (await readFile(file)).toString('base64')

const toDistPath = (url, fromDir) => {
  const clean = url.split(/[?#]/)[0]
  return clean.startsWith('/') ? join(DIST, clean.slice(1)) : resolvePath(fromDir, clean)
}

// ------------------------------------------------------------------- CSS
// Every stylesheet the build produced, with its url() assets inlined. Route
// pages each link a subset; collecting all of them once means any page works
// however the user reaches it.
const cssDir = join(DIST, '_nuxt')
let css = ''
const cssFiles = (await readdir(cssDir, { withFileTypes: true }))
  .filter((f) => f.isFile() && extname(f.name) === '.css')
  // entry.css carries the design tokens and resets, so it must come first.
  .sort((a, b) => (a.name.startsWith('entry') ? -1 : b.name.startsWith('entry') ? 1 : 0))

for (const f of cssFiles) {
  let sheet = await readFile(join(cssDir, f.name), 'utf8')
  for (const [, url] of [...sheet.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)]) {
    if (url.startsWith('data:') || url.startsWith('http')) continue
    const file = toDistPath(url, cssDir)
    if (!existsSync(file)) {
      console.warn(`  ! asset missing, left as-is: ${url}`)
      continue
    }
    sheet = sheet.split(url).join(await dataUriFor(file))
    extname(file).startsWith('.woff') ? report.fonts++ : report.images++
  }
  css += sheet + '\n'
  report.css++
}

// ----------------------------------------------------------------- images
const imgCache = new Map()
const inlineImages = async (html) => {
  for (const m of [...html.matchAll(/<img[^>]+src="([^"]+)"[^>]*>/g)]) {
    const src = m[1]
    if (src.startsWith('data:') || src.startsWith('http')) continue
    if (!imgCache.has(src)) {
      const file = toDistPath(src, DIST)
      if (!existsSync(file)) continue
      imgCache.set(src, await dataUriFor(file))
      report.images++
    }
    html = html.split(`src="${src}"`).join(`src="${imgCache.get(src)}"`)
  }
  return html
}

// ------------------------------------------------------------------ pages
const routeFile = (r) => join(DIST, r === '/' ? 'index.html' : `${r.slice(1)}/index.html`)

const sections = []
for (const route of ROUTES) {
  const file = routeFile(route)
  if (!existsSync(file)) {
    console.warn(`  ! no prerendered file for ${route}`)
    continue
  }
  let page = await readFile(file, 'utf8')

  // The app markup only — drop Nuxt's hydration payload and script tags.
  const app = page.match(/<div id="__nuxt">([\s\S]*?)<\/div><div id="teleports">/)
    ?? page.match(/<div id="__nuxt">([\s\S]*)<\/div>\s*<div id="teleports"/)
  if (!app) {
    console.warn(`  ! could not extract app markup for ${route}`)
    continue
  }

  let body = await inlineImages(app[1])
  // Internal links become hash routes; everything else (mailto:, external) stays.
  body = body.replace(/href="(\/[^"#]*)"/g, (m, href) => `href="#${href}"`)

  sections.push(
    `<div class="pv-route" data-route="${route}"${sections.length ? ' hidden' : ''}>${body}</div>`,
  )
  report.pages++
}

// ------------------------------------------------------------------ router
const runtime = `
(function () {
  var routes = document.querySelectorAll('.pv-route');

  // Mirrors app/plugins/motion.client.ts so the preview demonstrates the same
  // restrained motion. Reveal styles are gated behind html.js-anim, so if this
  // block never runs the content simply renders visible.
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var io = null;
  if (!reduced.matches) {
    document.documentElement.classList.add('js-anim');
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
    window.addEventListener('scroll', function () {
      document.querySelectorAll('.pv-route:not([hidden]) .hdr').forEach(function (h) {
        h.classList.toggle('is-scrolled', window.scrollY > 8);
      });
    }, { passive: true });
  }
  function reveal(page) {
    if (!io || !page) return;
    page.querySelectorAll('[data-reveal], [data-reveal-group]').forEach(function (el) {
      if (!el.classList.contains('is-in')) io.observe(el);
    });
  }

  function show(path) {
    var found = false;
    routes.forEach(function (el) {
      var match = el.dataset.route === path;
      el.hidden = !match;
      if (match) found = true;
    });
    if (!found) { routes[0].hidden = false; }
    document.title = (document.querySelector('.pv-route:not([hidden]) h1') || {}).textContent
      ? document.querySelector('.pv-route:not([hidden]) h1').textContent.trim() + ' | ClariAuth'
      : 'ClariAuth';
    window.scrollTo(0, 0);
    closeDrawer();
    reveal(document.querySelector('.pv-route:not([hidden])'));
  }
  function current() {
    var h = location.hash.replace(/^#/, '');
    return h && h.charAt(0) === '/' ? h : '/';
  }
  window.addEventListener('hashchange', function () { show(current()); });

  // Mobile drawer — the only piece of header behaviour that needs script.
  function closeDrawer() {
    document.querySelectorAll('.hdr__drawer').forEach(function (d) { d.style.display = 'none'; });
    document.querySelectorAll('.hdr__toggle').forEach(function (b) {
      b.setAttribute('aria-expanded', 'false');
    });
    document.body.style.overflow = '';
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.hdr__toggle');
    if (!btn) return;
    var page = btn.closest('.pv-route');
    var drawer = page && page.querySelector('.hdr__drawer');
    if (!drawer) return;
    var open = drawer.style.display === 'block';
    drawer.style.display = open ? 'none' : 'block';
    btn.setAttribute('aria-expanded', String(!open));
    document.body.style.overflow = open ? '' : 'hidden';
  });

  show(current());
})();
`

// The drawer is rendered with v-show, which SSR emits as display:none.
const previewCss = `
.pv-route[hidden]{display:none}
.pv-banner{position:fixed;left:50%;transform:translateX(-50%);bottom:14px;z-index:9999;
  background:#0a1e46;color:#fff;font:500 12px/1.4 system-ui,sans-serif;padding:8px 14px;
  border-radius:999px;box-shadow:0 6px 20px rgba(10,30,70,.28);opacity:.92}
@media print{.pv-banner{display:none}}
`

// Inlined so the browser does not fall back to requesting /favicon.ico, which
// would 404 against whatever host the file is opened from.
const favicon = existsSync(join(DIST, 'favicon-32x32.png'))
  ? await dataUriFor(join(DIST, 'favicon-32x32.png'))
  : ''

const html = `<!DOCTYPE html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ClariAuth Site Preview</title>
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#0A1E46">
${favicon ? `<link rel="icon" href="${favicon}">` : ''}
<style>${css}</style>
<style>${previewCss}</style>
</head>
<body>
${sections.join('\n')}
<div class="pv-banner">Preview build — ${report.pages} pages, offline copy</div>
<script>${runtime}</script>
</body>
</html>
`

await mkdir(OUT_DIR, { recursive: true })
await writeFile(OUT_FILE, html, 'utf8')

console.log(
  `Stitched ${report.pages} pages · ${report.css} stylesheets · ` +
  `${report.fonts} fonts · ${report.images} images`,
)
console.log(`Wrote ${OUT_FILE} — ${(Buffer.byteLength(html) / 1024 / 1024).toFixed(2)} MB`)

const leftovers = [...new Set(
  [...html.matchAll(/(?:src|href)="(\/[^"]*)"/g)].map((m) => m[1]),
)]
if (leftovers.length) {
  console.error(`\nFAIL: ${leftovers.length} absolute reference(s) would 404:`)
  leftovers.forEach((l) => console.error(`  ${l}`))
  process.exit(1)
}
console.log('Self-contained: no absolute references remain.')
