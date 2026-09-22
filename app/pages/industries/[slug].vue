<script setup lang="ts">
import { site } from '~/data/site'
import { industries, getIndustry } from '~/data/industries'
import { getService } from '~/data/services'

const route = useRoute()
const slug = route.params.slug as string
const industry = getIndustry(slug)

if (!industry) {
  throw createError({ statusCode: 404, statusMessage: 'Industry not found', fatal: true })
}

const ind = industry!

const relatedServices = ind.relevantServices
  .map((sl) => getService(sl))
  .filter((s): s is NonNullable<typeof s> => Boolean(s))

const otherIndustries = industries.filter((i) => i.slug !== ind.slug)

useSeo({ title: ind.metaTitle, description: ind.metaDescription })

useBreadcrumbs([
  { label: 'Industries', to: '/industries' },
  { label: ind.name, to: `/industries/${ind.slug}` },
])

useJsonLd({
  '@type': 'Service',
  name: ind.title,
  description: ind.summary,
  url: `${site.url}/industries/${ind.slug}`,
  provider: { '@id': `${site.url}/#organization` },
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: { '@type': 'Audience', audienceType: ind.name },
})
</script>

<template>
  <div>
    <PageHero
      :eyebrow="ind.eyebrow"
      :title="ind.title"
      :lede="ind.intro"
      :trail="[{ label: 'Industries', to: '/industries' }]"
      :current="ind.name"
    >
      <div class="btn-row mt-4">
        <NuxtLink to="/contact" class="btn btn--primary">Request a Consultation</NuxtLink>
        <NuxtLink to="/services" class="btn btn--outline">Explore our services</NuxtLink>
      </div>
    </PageHero>

    <!-- Challenges -->
    <section class="section">
      <div class="container">
        <SectionHeading
          align="left"
          eyebrow="The challenge"
          :title="`What makes ${ind.name.toLowerCase()} different`"
          lede="The specific pressures that shape insurance and authorization work in this specialty."
        />

        <div class="grid grid--2">
          <div v-for="c in ind.challenges" :key="c.title" class="card chal">
            <h3>{{ c.title }}</h3>
            <p>{{ c.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How we support -->
    <section class="section section--alt">
      <div class="container">
        <div class="support">
          <div>
            <p class="eyebrow">How we support you</p>
            <h2 class="mt-2">What ClariAuth handles</h2>
            <p class="lede mt-3">
              The work we take on for {{ ind.name.toLowerCase() }} providers, adapted to your
              payers, volumes and intake process.
            </p>
            <NuxtLink to="/how-it-works" class="btn btn--outline mt-4">
              See our process
            </NuxtLink>
          </div>

          <ul class="checklist support__list">
            <li v-for="item in ind.support" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Relevant services -->
    <section class="section">
      <div class="container">
        <SectionHeading
          align="left"
          eyebrow="Services that fit"
          :title="`Most used by ${ind.name.toLowerCase()} providers`"
          lede="Start with one, or combine them — most providers in this specialty use two or three together."
        />

        <div class="grid grid--4">
          <ServiceCard v-for="s in relatedServices" :key="s.slug" :service="s" compact />
        </div>
      </div>
    </section>

    <!-- Other industries -->
    <section class="section section--tight section--alt">
      <div class="container">
        <h2 class="center">Other specialties we support</h2>
        <div class="others mt-5">
          <NuxtLink
            v-for="i in otherIndustries"
            :key="i.slug"
            :to="`/industries/${i.slug}`"
            class="other-chip"
          >
            <AppIcon :name="i.icon" :size="20" />
            <span>{{ i.name }}</span>
            <AppIcon name="arrowRight" :size="16" class="other-chip__arrow" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand
      :title="`Let’s talk about your ${ind.name.toLowerCase()} workload`"
      body="Tell us your payer mix, volumes and where the bottleneck is. We’ll tell you honestly whether we’re the right fit."
      secondary-label="All industries"
      secondary-to="/industries"
    />
  </div>
</template>

<style scoped>
.chal h3 {
  color: var(--navy-800);
  font-size: 1.08rem;
}

.support {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 56px;
  align-items: start;
}

.support__list {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 30px;
  box-shadow: var(--shadow-sm);
  gap: 15px;
}

.others {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.other-chip {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 12px 20px;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.93rem;
  color: var(--navy-800);
  transition: border-color 0.16s var(--ease), color 0.16s var(--ease),
    box-shadow 0.16s var(--ease);
}

.other-chip:hover {
  border-color: var(--blue-200);
  color: var(--blue-700);
  box-shadow: var(--shadow-sm);
}

.other-chip svg:first-child {
  color: var(--blue-600);
}

.other-chip__arrow {
  opacity: 0.4;
}

@media (max-width: 940px) {
  .support {
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
  }
}
</style>
