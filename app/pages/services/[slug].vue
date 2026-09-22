<script setup lang="ts">
import { site } from '~/data/site'
import { services, getService } from '~/data/services'
import { industries } from '~/data/industries'

const route = useRoute()
const slug = route.params.slug as string
const service = getService(slug)

if (!service) {
  throw createError({ statusCode: 404, statusMessage: 'Service not found', fatal: true })
}

const s = service!

const otherServices = services.filter((x) => x.slug !== s.slug)
const relatedIndustries = industries.filter((i) => i.relevantServices.includes(s.slug))

useSeo({ title: s.metaTitle, description: s.metaDescription })

useBreadcrumbs([
  { label: 'Services', to: '/services' },
  { label: s.name, to: `/services/${s.slug}` },
])

useJsonLd({
  '@type': 'Service',
  name: s.name,
  description: s.summary,
  url: `${site.url}/services/${s.slug}`,
  serviceType: s.name,
  provider: { '@id': `${site.url}/#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: { '@type': 'Audience', audienceType: 'Healthcare providers' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${s.name} — what's included`,
    itemListElement: s.includes.map((inc) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: inc.title, description: inc.body },
    })),
  },
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Service"
      :title="s.title"
      :lede="s.intro"
      :trail="[{ label: 'Services', to: '/services' }]"
      :current="s.name"
    >
      <div class="btn-row mt-4">
        <NuxtLink to="/contact" class="btn btn--primary">Request a Consultation</NuxtLink>
        <NuxtLink to="/how-it-works" class="btn btn--outline">See how it works</NuxtLink>
      </div>
    </PageHero>

    <!-- The problem -->
    <section class="section">
      <div class="container">
        <div class="split">
          <div>
            <p class="eyebrow">The problem</p>
            <h2 class="mt-2">{{ s.problem.heading }}</h2>
            <p class="lede mt-3">{{ s.problem.body }}</p>
          </div>

          <div class="symptoms">
            <h3 class="symptoms__h">What it looks like day to day</h3>
            <ul class="dashlist mt-3">
              <li v-for="sym in s.problem.symptoms" :key="sym">{{ sym }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- What's involved -->
    <section class="section section--alt">
      <div class="container">
        <SectionHeading
          align="left"
          eyebrow="What’s involved"
          :title="`Inside ${s.name.toLowerCase()}`"
          lede="The specific work we carry out on each request."
        />

        <div class="grid grid--2">
          <div v-for="inc in s.includes" :key="inc.title" class="card inc">
            <h3>{{ inc.title }}</h3>
            <p>{{ inc.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Deliverables + workflow -->
    <section class="section">
      <div class="container">
        <div class="split split--even">
          <div class="deliver">
            <p class="eyebrow">What you receive</p>
            <h2 class="mt-2">Documented results, every time</h2>
            <ul class="checklist mt-3">
              <li v-for="d in s.deliverables" :key="d">{{ d }}</li>
            </ul>
          </div>

          <div class="workflow">
            <p class="eyebrow">In practice</p>
            <h2 class="mt-2">{{ s.workflow.heading }}</h2>
            <p class="lede mt-3">{{ s.workflow.body }}</p>

            <div v-if="relatedIndustries.length" class="workflow__ind">
              <h3>Commonly used by</h3>
              <div class="workflow__tags mt-2">
                <NuxtLink
                  v-for="i in relatedIndustries"
                  :key="i.slug"
                  :to="`/industries/${i.slug}`"
                  class="tag"
                >
                  <AppIcon :name="i.icon" :size="16" />
                  {{ i.name }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Other services -->
    <section class="section section--tight section--alt">
      <div class="container">
        <h2 class="center">Our other services</h2>
        <p class="center lede mt-2 measure-narrow" style="margin-inline: auto">
          These services work well together — most providers combine two or three.
        </p>
        <div class="grid grid--4 mt-5">
          <ServiceCard v-for="o in otherServices" :key="o.slug" :service="o" compact />
        </div>
      </div>
    </section>

    <CtaBand
      :title="`Ready to hand off ${s.name.toLowerCase()}?`"
      body="Tell us your volumes, payers and current process. We’ll show you exactly what we’d take on and how results would come back to your team."
      secondary-label="See all services"
      secondary-to="/services"
    />
  </div>
</template>

<style scoped>
.split {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: 56px;
  align-items: start;
}

.split--even {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.symptoms {
  background: var(--surface-alt);
  border-left: 4px solid var(--blue-600);
  border-radius: var(--radius-lg);
  padding: 28px;
}

.symptoms__h {
  color: var(--navy-800);
  font-size: 1.02rem;
}

.inc h3 {
  color: var(--navy-800);
  font-size: 1.08rem;
}

.deliver {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: var(--shadow-sm);
}

.workflow__ind {
  margin-top: 32px;
  padding-top: 26px;
  border-top: 1px solid var(--line);
}

.workflow__ind h3 {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.workflow__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--font-display);
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--navy-800);
  background: #fff;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  padding: 8px 15px;
  transition: border-color 0.16s var(--ease), color 0.16s var(--ease);
}

.tag:hover {
  border-color: var(--blue-600);
  color: var(--blue-700);
}

.tag svg {
  color: var(--blue-600);
}

@media (max-width: 940px) {
  .split,
  .split--even {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
  }
}
</style>
