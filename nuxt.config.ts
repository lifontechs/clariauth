import { services } from './app/data/services'
import { industries } from './app/data/industries'

/**
 * Every route is listed explicitly as well as crawled, so a broken link in the
 * markup can never silently drop a page out of the static build.
 */
const staticRoutes = [
  '/',
  '/services',
  '/industries',
  '/how-it-works',
  '/about',
  '/faq',
  '/contact',
  '/thank-you',
  '/privacy-policy',
  '/terms',
  ...services.map((s) => `/services/${s.slug}`),
  ...industries.map((i) => `/industries/${i.slug}`),
]

/**
 * Preview build (PREVIEW_BUILD=1) — for hosts that reserve paths beginning
 * with an underscore, such as Claude Artifacts. It moves the build asset
 * directory off `_nuxt/` and drops the two underscore-prefixed extras
 * (`_payload.json`, `__sitemap__/style.xsl`). Production builds are
 * unaffected: leave the variable unset and nothing below changes.
 */
const isPreview = process.env.PREVIEW_BUILD === '1'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  experimental: {
    // Payload files are emitted as `_payload.json`; without them Nuxt
    // re-renders on client navigation instead, which is fine here because all
    // page content is bundled rather than fetched.
    payloadExtraction: !isPreview,
  },

  modules: ['@nuxtjs/sitemap', '@nuxtjs/robots'],

  // fonts.css first so @font-face is declared before anything uses it.
  css: ['~/assets/css/fonts.css', '~/assets/css/main.css'],

  site: {
    url: 'https://clariauth.com',
    name: 'ClariAuth',
  },

  runtimeConfig: {
    public: {
      // Where the contact form POSTs. Set NUXT_PUBLIC_FORM_ENDPOINT at build
      // time (Formspree, HubSpot, Netlify Forms, your CRM endpoint, …).
      // Empty = the form falls back to a prefilled mailto: link.
      formEndpoint: '',
    },
  },

  // Static generation: every route is prerendered to real HTML so crawlers
  // receive fully-formed markup with no JS execution required.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [...staticRoutes, '/sitemap.xml'],
      failOnError: false,
    },
  },

  routeRules: {
    '/**': { prerender: true },
  },

  sitemap: {
    autoLastmod: true,
    exclude: ['/thank-you'],
    // `xsl` takes a stylesheet path or `false` — never `true`. The default
    // stylesheet is emitted to `__sitemap__/style.xsl` and only prettifies the
    // XML for humans, so a preview build drops it and production keeps it.
    ...(isPreview ? { xsl: false as const } : {}),
  },

  robots: {
    disallow: ['/thank-you'],
  },

  app: {
    buildAssetsDir: isPreview ? '/nuxt-assets/' : '/_nuxt/',

    head: {
      htmlAttrs: { lang: 'en-US' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#0A1E46' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        // Preload the latin subsets used above the fold — these are the only
        // two font files a typical U.S. visitor needs.
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/plus-jakarta-sans-latin.woff2',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: '/fonts/inter-latin.woff2',
          crossorigin: 'anonymous',
        },
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
})
