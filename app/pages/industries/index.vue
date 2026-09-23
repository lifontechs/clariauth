<script setup lang="ts">
import { site } from '~/data/site'
import { industries, focusIndustries } from '~/data/industries'

const otherIndustries = industries.filter((i) => !i.focus)

useSeo({
  title: 'Healthcare Specialties We Support',
  description:
    'ClariAuth supports U.S. healthcare providers — with particular experience in home health and radiology, plus practices, therapy and specialty organizations.',
})

useBreadcrumbs([{ label: 'Industries', to: '/industries' }])

useJsonLd({
  '@type': 'ItemList',
  name: 'Healthcare specialties supported by ClariAuth',
  itemListElement: industries.map((i, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: i.name,
    description: i.summary,
    url: `${site.url}/industries/${i.slug}`,
  })),
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Industries"
      title="Specialty support across U.S. healthcare"
      lede="Insurance requirements differ sharply by specialty — the payers, the codes, the documentation and the pace all change. We have particular experience in home health and radiology, and we support healthcare organizations well beyond them."
      current="Industries"
    />

    <!-- Focus specialties -->
    <section class="section">
      <div class="container">
        <SectionHeading
          align="left"
          eyebrow="Areas of particular experience"
          title="Where we’ve gone deepest"
          lede="Two specialties where the authorization pattern is distinctive enough that experience genuinely matters."
        />

        <div class="focus-grid">
          <NuxtLink
            v-for="i in focusIndustries"
            :key="i.slug"
            :to="`/industries/${i.slug}`"
            class="focus"
          >
            <div class="focus__top">
              <span class="focus__icon">
                <AppIcon :name="i.icon" :size="28" />
              </span>
              <span class="pill pill--solid">{{ i.eyebrow }}</span>
            </div>

            <h3>{{ i.name }}</h3>
            <p class="focus__summary">{{ i.summary }}</p>

            <ul class="dashlist focus__challenges">
              <li v-for="c in i.challenges.slice(0, 3)" :key="c.title">{{ c.title }}</li>
            </ul>

            <span class="link-arrow focus__link">
              How we support {{ i.name.toLowerCase() }}
              <AppIcon name="arrowRight" :size="16" />
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Everyone else -->
    <section class="section section--alt">
      <div class="container">
        <SectionHeading
          align="left"
          eyebrow="Also supported"
          title="We are not limited to two specialties"
          lede="Eligibility, benefits and authorization work follows the same underlying logic wherever a payer sits between a provider and the care they deliver. These are specialties we regularly support."
        />

        <div class="grid grid--3" data-reveal-group>
          <NuxtLink
            v-for="i in otherIndustries"
            :key="i.slug"
            :to="`/industries/${i.slug}`"
            class="card card--link other"
          >
            <span class="card__icon">
              <AppIcon :name="i.icon" :size="24" />
            </span>
            <h3>{{ i.name }}</h3>
            <p>{{ i.summary }}</p>
            <span class="link-arrow other__link">
              Learn more <AppIcon name="arrowRight" :size="16" />
            </span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Common thread -->
    <section class="section">
      <div class="container container--narrow center">
        <h2>Don’t see your specialty?</h2>
        <p class="lede mt-3">
          The list above is where we spend most of our time, not a boundary. If your organization
          carries a recurring eligibility, benefits or authorization workload, the process we run
          is broadly the same — and the conversation costs you nothing.
        </p>
        <div class="btn-row mt-4" style="justify-content: center">
          <NuxtLink to="/contact" class="btn btn--primary btn--lg">
            Tell us about your specialty
          </NuxtLink>
          <NuxtLink to="/services" class="btn btn--outline btn--lg">See our services</NuxtLink>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.focus-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.focus {
  display: flex;
  flex-direction: column;
  background: linear-gradient(165deg, #ffffff 0%, var(--blue-50) 100%);
  border: 1px solid var(--blue-100);
  border-radius: var(--radius-lg);
  padding: 32px;
  color: inherit;
  transition: border-color 0.2s var(--ease), box-shadow 0.2s var(--ease),
    transform 0.2s var(--ease);
}

.focus:hover {
  border-color: var(--blue-200);
  box-shadow: var(--shadow);
  transform: translateY(-3px);
}

.focus__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 22px;
}

.focus__icon {
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  border-radius: var(--radius);
  background: var(--navy-800);
  color: #fff;
  flex-shrink: 0;
}

.focus h3 {
  color: var(--navy-800);
  font-size: clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem);
}

.focus__summary {
  margin-top: 10px;
  color: var(--body);
}

.focus__challenges {
  margin-top: 22px;
  padding-top: 20px;
  border-top: 1px solid var(--blue-100);
  flex: 1;
}

.focus__link {
  margin-top: 24px;
}

.other {
  display: flex;
  flex-direction: column;
  color: inherit;
}

.other h3 {
  color: var(--navy-800);
}

.other p {
  flex: 1;
}

.other__link {
  margin-top: 18px;
}

@media (max-width: 820px) {
  .focus-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
