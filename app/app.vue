<script setup lang="ts">
import { site } from '~/data/site'

const route = useRoute()
const canonical = computed(() => site.url + (route.path === '/' ? '/' : route.path))

useHead({
  titleTemplate: (title) => (title ? `${title} | ${site.name}` : `${site.name} — ${site.tagline}`),
  link: [{ rel: 'canonical', href: canonical }],
})

// Organization-level structured data, emitted once for the whole site.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${site.url}/#organization`,
            name: site.name,
            legalName: site.legalName,
            url: site.url,
            slogan: site.tagline,
            description: site.description,
            email: site.email,
            logo: {
              '@type': 'ImageObject',
              url: `${site.url}/brand/clariauth-logo.png`,
            },
            image: `${site.url}/og-image.png`,
            sameAs: [site.linkedin],
            areaServed: {
              '@type': 'Country',
              name: 'United States',
            },
            knowsAbout: [
              'Insurance eligibility verification',
              'Benefits verification and investigation',
              'Prior authorization',
              'Pre-certification',
              'Payer portal follow-up',
              'Authorization requirements research',
            ],
            contactPoint: [
              {
                '@type': 'ContactPoint',
                contactType: 'sales',
                email: site.email,
                areaServed: 'US',
                availableLanguage: ['English'],
              },
            ],
          },
          {
            '@type': 'WebSite',
            '@id': `${site.url}/#website`,
            url: site.url,
            name: site.name,
            description: site.description,
            publisher: { '@id': `${site.url}/#organization` },
            inLanguage: 'en-US',
          },
        ],
      }),
    },
  ],
})
</script>

<template>
  <div class="app">
    <a href="#main" class="skip-link">Skip to main content</a>
    <AppHeader />
    <main id="main">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<style>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.app main {
  flex: 1;
}
</style>
