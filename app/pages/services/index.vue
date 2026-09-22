<script setup lang="ts">
import { site } from '~/data/site'
import { services } from '~/data/services'

useSeo({
  title: 'Insurance Verification & Prior Authorization Services',
  description:
    'Eligibility verification, benefits investigation, prior authorization support, payer portal follow-up and requirements research for U.S. providers.',
})

useBreadcrumbs([{ label: 'Services', to: '/services' }])

useJsonLd({
  '@type': 'ItemList',
  name: 'ClariAuth services',
  itemListElement: services.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: s.name,
    description: s.summary,
    url: `${site.url}/services/${s.slug}`,
  })),
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="Services"
      title="Insurance operations, handled end to end"
      lede="Five connected services covering the insurance-side work between a referral and delivered care. Take one, take all five, or start with the piece that hurts most."
      current="Services"
    />

    <section class="section">
      <div class="container">
        <ol class="svc-list">
          <li v-for="(s, i) in services" :key="s.slug" class="svc-row">
            <div class="svc-row__num">
              <span>{{ String(i + 1).padStart(2, '0') }}</span>
            </div>

            <div class="svc-row__main">
              <div class="svc-row__head">
                <span class="svc-row__icon">
                  <AppIcon :name="s.icon" :size="24" />
                </span>
                <h2>
                  <NuxtLink :to="`/services/${s.slug}`">{{ s.name }}</NuxtLink>
                </h2>
              </div>

              <p class="lede svc-row__summary">{{ s.summary }}</p>

              <div class="svc-row__cols">
                <div>
                  <h3 class="svc-row__label">What it involves</h3>
                  <ul class="dashlist mt-2">
                    <li v-for="inc in s.includes.slice(0, 4)" :key="inc.title">{{ inc.title }}</li>
                  </ul>
                </div>
                <div>
                  <h3 class="svc-row__label">What you receive</h3>
                  <ul class="checklist mt-2">
                    <li v-for="d in s.deliverables.slice(0, 4)" :key="d">{{ d }}</li>
                  </ul>
                </div>
              </div>

              <NuxtLink :to="`/services/${s.slug}`" class="link-arrow mt-3">
                Full details on {{ s.name }}
                <AppIcon name="arrowRight" :size="16" />
              </NuxtLink>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="section section--alt">
      <div class="container">
        <SectionHeading
          eyebrow="How we’re different"
          title="Why this isn’t medical billing"
          lede="Billing works the claim after care is delivered. We work the insurance requirements before and around it — which is what determines whether that claim was ever going to pay."
        />

        <div class="compare">
          <div class="compare__col">
            <h3 class="compare__h">A billing company handles</h3>
            <ul class="dashlist mt-3">
              <li>Claim creation and submission</li>
              <li>Payment posting and reconciliation</li>
              <li>Accounts receivable follow-up</li>
              <li>Denial appeals after the fact</li>
              <li>Patient statements and collections</li>
            </ul>
          </div>

          <div class="compare__col compare__col--ours">
            <h3 class="compare__h">ClariAuth handles</h3>
            <ul class="checklist mt-3">
              <li>Eligibility and coverage confirmed before the visit</li>
              <li>Benefits investigated in service-specific detail</li>
              <li>Authorization requirements researched by payer and code</li>
              <li>Authorization requests prepared, submitted and chased</li>
              <li>Payer portal checks and status follow-up on a cadence</li>
            </ul>
            <p class="compare__note">
              Many of our clients keep their billing partner and add us in front of it. Cleaner
              front-end information generally makes a billing team more effective, not less.
            </p>
          </div>
        </div>
      </div>
    </section>

    <CtaBand
      title="Not sure which service you need?"
      body="Most providers start with the one causing the most disruption, then expand. Tell us where your team is losing time and we’ll tell you honestly whether we can help."
      secondary-label="See how it works"
      secondary-to="/how-it-works"
    />
  </div>
</template>

<style scoped>
.svc-list {
  display: grid;
  gap: 0;
}

.svc-row {
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr);
  gap: 28px;
  padding-block: 44px;
  border-top: 1px solid var(--line);
}

.svc-row:first-child {
  border-top: 0;
  padding-top: 0;
}

.svc-row__num span {
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--blue-100);
  line-height: 1;
}

.svc-row__head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
}

.svc-row__icon {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: var(--radius);
  background: var(--blue-50);
  color: var(--blue-600);
  flex-shrink: 0;
}

.svc-row h2 {
  font-size: clamp(1.3rem, 1.1rem + 0.8vw, 1.72rem);
}

.svc-row h2 a {
  color: var(--navy-800);
}

.svc-row h2 a:hover {
  color: var(--blue-700);
}

.svc-row__summary {
  max-width: 70ch;
  margin-bottom: 26px;
}

.svc-row__cols {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;
  padding: 24px;
  background: var(--surface-alt);
  border-radius: var(--radius-lg);
}

.svc-row__label {
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

@media (max-width: 800px) {
  .svc-row {
    grid-template-columns: minmax(0, 1fr);
    gap: 14px;
  }
  .svc-row__num span {
    font-size: 1.6rem;
  }
  .svc-row__cols {
    grid-template-columns: minmax(0, 1fr);
    gap: 26px;
  }
}

/* Comparison */
.compare {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.compare__col {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 30px;
}

.compare__col--ours {
  border-color: var(--blue-200);
  box-shadow: var(--shadow);
}

.compare__h {
  font-size: 1.05rem;
  color: var(--navy-800);
  padding-bottom: 14px;
  border-bottom: 1px solid var(--line);
}

.compare__col--ours .compare__h {
  color: var(--blue-700);
}

.compare__note {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  font-size: 0.93rem;
  color: var(--muted);
}

@media (max-width: 800px) {
  .compare {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
