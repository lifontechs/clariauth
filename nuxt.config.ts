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

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: ['@nuxtjs/sitemap', '@nuxtjs/robots'],

  // fonts.css first so @font-face is declared before anything uses it.
  css: ['~/assets/css/fonts.css', '~/assets/css/main.css'],

  site: {
    url: 'https://clariauth.com',
    name: 'ClariAuth',
  },

  runtimeConfig: {
    // Server-only. Never exposed to the browser.

    /** Secret path segment for the leads inbox at /inbox/<token>. */
    adminToken: process.env.NUXT_ADMIN_TOKEN || '',

    /** Where submissions are stored. A file path on a persistent disk. */
    databasePath: process.env.NUXT_DATABASE_PATH || '.data/clariauth.sqlite',

    smtp: {
      host: process.env.NUXT_SMTP_HOST || '',
      port: process.env.NUXT_SMTP_PORT || '587',
      user: process.env.NUXT_SMTP_USER || '',
      password: process.env.NUXT_SMTP_PASSWORD || '',
      /** Envelope sender. Must be a domain the SMTP provider lets you send as. */
      from: process.env.NUXT_SMTP_FROM || '',
      /** Where new-lead notifications land. Defaults to the public address. */
      to: process.env.NUXT_SMTP_TO || 'info@clariauth.com',
    },

    public: {
      // The contact form posts here. Left relative so it works on any domain.
      // An external endpoint (Formspree, HubSpot, a CRM) can still be used by
      // setting NUXT_PUBLIC_FORM_ENDPOINT to an absolute URL instead.
      formEndpoint: process.env.NUXT_PUBLIC_FORM_ENDPOINT || '/api/contact',
    },
  },

  nitro: {
    // Marketing pages are still prerendered to real HTML at build time; the
    // API routes and the leads inbox are served dynamically alongside them.
    prerender: {
      crawlLinks: true,
      routes: [...staticRoutes, '/sitemap.xml'],
      failOnError: false,
    },
  },

  routeRules: {
    // Prerender the marketing pages only. Listing them explicitly (rather than
    // '/**') keeps the API and the inbox out of the static output — a
    // prerendered inbox would bake submissions into public HTML.
    ...Object.fromEntries(staticRoutes.map((r) => [r, { prerender: true }])),
    '/api/**': { prerender: false },
    '/inbox/**': {
      prerender: false,
      index: false,
      headers: { 'x-robots-tag': 'noindex, nofollow, noarchive' },
    },
  },

  sitemap: {
    autoLastmod: true,
    exclude: ['/thank-you', '/inbox/**'],
  },

  robots: {
    disallow: ['/thank-you', '/inbox/'],
  },

  app: {
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
