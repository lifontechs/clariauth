import { site } from '~/data/site'

interface SeoInput {
  title: string
  description: string
  /** Path of the page, e.g. '/services'. Defaults to the current route. */
  path?: string
  /** Absolute or root-relative image for social cards */
  image?: string
  noindex?: boolean
}

/**
 * Sets the title, meta description and Open Graph / Twitter tags for a page.
 * Canonical links are handled globally in app.vue.
 */
export function useSeo(input: SeoInput) {
  const route = useRoute()
  const path = input.path ?? route.path
  const url = site.url + (path === '/' ? '/' : path)
  const image = input.image
    ? input.image.startsWith('http')
      ? input.image
      : site.url + input.image
    : `${site.url}/og-image.png`

  const fullTitle = `${input.title} | ${site.name}`

  useSeoMeta({
    title: input.title,
    description: input.description,
    ogType: 'website',
    ogSiteName: site.name,
    ogTitle: fullTitle,
    ogDescription: input.description,
    ogUrl: url,
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: `${site.name} — ${site.tagline}`,
    ogLocale: 'en_US',
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: input.description,
    twitterImage: image,
    robots: input.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
  })
}

/**
 * Emits a BreadcrumbList. `trail` excludes Home, which is prepended here.
 */
export function useBreadcrumbs(trail: { label: string; to: string }[]) {
  const items = [{ label: 'Home', to: '/' }, ...trail]

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.label,
            item: site.url + (item.to === '/' ? '/' : item.to),
          })),
        }),
      },
    ],
  })
}

/** Emits arbitrary JSON-LD for a page (Service, FAQPage, ContactPage, …). */
export function useJsonLd(data: Record<string, unknown>) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({ '@context': 'https://schema.org', ...data }),
      },
    ],
  })
}
