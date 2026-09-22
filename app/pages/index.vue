<script setup lang="ts">
import { site, heroProofPoints, differentiators, painPoints } from '~/data/site'
import { services } from '~/data/services'
import { industries, focusIndustries } from '~/data/industries'
import { featuredFaqs } from '~/data/faqs'

const decisionMakers = [
  'Practice Administrators',
  'Office Managers',
  'Operations Managers',
  'Revenue Cycle Managers',
  'Billing Managers',
  'Authorization Managers',
  'Intake Managers',
  'Home Health Administrators',
  'Radiology & Imaging Administrators',
  'Healthcare business owners',
]

useSeo({
  title: 'Prior Authorization & Insurance Verification Support',
  description:
    'Insurance eligibility verification, benefits investigation, prior authorization and payer follow-up for U.S. healthcare providers. Request a consultation.',
  path: '/',
})

useJsonLd({
  '@type': 'ProfessionalService',
  '@id': `${site.url}/#service`,
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  areaServed: { '@type': 'Country', name: 'United States' },
  serviceType: 'Healthcare insurance operations support',
  provider: { '@id': `${site.url}/#organization` },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Insurance operations services',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.name,
        description: s.summary,
        url: `${site.url}/services/${s.slug}`,
      },
    })),
  },
})

useJsonLd({
  '@type': 'FAQPage',
  mainEntity: featuredFaqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
})
</script>

<template>
  <div>
    <!-- ============================ HERO ============================ -->
    <section class="hero">
      <div class="container hero__inner">
        <div class="hero__text">
          <p class="eyebrow">
            Insurance operations support for U.S. healthcare providers
          </p>

          <h1>
            Simplifying insurance operations.
            <span class="hero__accent">Empowering patient care.</span>
          </h1>

          <p class="lede hero__lede">
            Reliable eligibility verification, benefits investigation and prior authorization
            support for healthcare providers across the United States — so your team spends
            less time on payer portals and more time on patients.
          </p>

          <div class="btn-row hero__actions">
            <NuxtLink to="/contact" class="btn btn--primary btn--lg">
              Request a Consultation
            </NuxtLink>
            <NuxtLink to="/services" class="btn btn--outline btn--lg">
              Explore Our Services
            </NuxtLink>
          </div>

          <ul class="hero__proof">
            <li v-for="p in heroProofPoints" :key="p.title">
              <span class="hero__proof-icon">
                <AppIcon :name="p.icon" :size="20" />
              </span>
              <span>
                <strong>{{ p.title }}</strong>
                <span>{{ p.body }}</span>
              </span>
            </li>
          </ul>
        </div>

        <div class="hero__visual">
          <HeroPanel />
        </div>
      </div>
    </section>

    <!-- ========================= CORE SERVICES ========================= -->
    <section class="section">
      <div class="container">
        <SectionHeading
          eyebrow="What we do"
          title="Five services. One workflow."
          lede="We are not a general billing company and not a virtual assistant service. We do the insurance-side work that sits between a referral and delivered care — and we do it properly."
        />

        <div class="grid grid--3 svc-grid">
          <ServiceCard v-for="s in services" :key="s.slug" :service="s" />

          <NuxtLink to="/services" class="card card--link svc-all">
            <span class="card__icon svc-all__icon">
              <AppIcon name="arrowRight" :size="24" />
            </span>
            <h3>See how each service works</h3>
            <p>
              What’s involved, the problems it solves, and exactly what your team receives back.
            </p>
            <span class="link-arrow">All services <AppIcon name="arrowRight" :size="16" /></span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ========================== WHO WE SUPPORT ======================= -->
    <section class="section section--alt">
      <div class="container">
        <div class="who">
          <div class="who__text">
            <p class="eyebrow">Who we support</p>
            <h2>Built for the people who carry the administrative load</h2>
            <p class="lede mt-2">
              If your day involves payer portals, hold music and authorization deadlines, this is
              built for you.
            </p>

            <ul class="who__roles">
              <li v-for="role in decisionMakers" :key="role">{{ role }}</li>
            </ul>
          </div>

          <div class="who__pains">
            <h3 class="who__pains-h">Sound familiar?</h3>
            <ul class="dashlist">
              <li v-for="p in painPoints" :key="p">{{ p }}</li>
            </ul>
            <p class="who__pains-foot">
              None of this is a failure of your team. It’s a workload that has grown faster than
              the staffing model around it.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================== WHY CLARIAUTH ======================== -->
    <section class="section">
      <div class="container">
        <SectionHeading
          eyebrow="Why ClariAuth"
          title="More than a vendor — an insurance operations partner"
          lede="What separates us is focus: one workflow, done by people who know payer behaviour, reported back in a form your team can actually act on."
        />

        <div class="grid grid--3">
          <div v-for="d in differentiators" :key="d.title" class="card why">
            <span class="card__icon">
              <AppIcon :name="d.icon" :size="24" />
            </span>
            <h3>{{ d.title }}</h3>
            <p>{{ d.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================== HOW IT WORKS ========================= -->
    <section class="section section--tint">
      <div class="container">
        <div class="how">
          <div class="how__intro">
            <p class="eyebrow">How it works</p>
            <h2>A simple, documented process</h2>
            <p class="lede mt-2">
              No new software for your staff to learn. You send the request, we do the work, you
              get a documented answer.
            </p>
            <NuxtLink to="/how-it-works" class="btn btn--outline mt-4">
              See the full process
            </NuxtLink>
          </div>

          <div class="how__steps">
            <ProcessSteps />
          </div>
        </div>
      </div>
    </section>

    <!-- ============================ INDUSTRIES ========================= -->
    <section class="section">
      <div class="container">
        <SectionHeading
          eyebrow="Specialty support"
          title="Particular experience in home health and radiology"
          lede="These are the two lines we know most deeply — but the underlying work is the same wherever insurance sits between a provider and the care they deliver, and we support healthcare organizations of many kinds."
        />

        <div class="ind-grid">
          <NuxtLink
            v-for="i in focusIndustries"
            :key="i.slug"
            :to="`/industries/${i.slug}`"
            class="card card--link ind ind--focus"
          >
            <span class="pill pill--solid">{{ i.eyebrow }}</span>
            <span class="ind__icon">
              <AppIcon :name="i.icon" :size="26" />
            </span>
            <h3>{{ i.name }}</h3>
            <p>{{ i.summary }}</p>
            <span class="link-arrow">Learn more <AppIcon name="arrowRight" :size="16" /></span>
          </NuxtLink>

          <div class="ind-others">
            <h3 class="ind-others__h">We also support</h3>
            <ul class="ind-others__list">
              <li v-for="i in industries.filter((x) => !x.focus)" :key="i.slug">
                <NuxtLink :to="`/industries/${i.slug}`">
                  <AppIcon :name="i.icon" :size="20" />
                  <span>{{ i.name }}</span>
                  <AppIcon name="arrowRight" :size="16" class="ind-others__arrow" />
                </NuxtLink>
              </li>
            </ul>
            <p class="ind-others__note">
              No matter your specialty, if eligibility, benefits or authorizations are a recurring
              workload, we can help.
            </p>
            <NuxtLink to="/industries" class="link-arrow">
              See all industries <AppIcon name="arrowRight" :size="16" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================= PRICING =========================== -->
    <section class="section section--tight section--alt">
      <div class="container">
        <div class="pricing">
          <div>
            <p class="eyebrow">Pricing</p>
            <h2>Flexible support built around your workflow</h2>
            <p class="lede mt-2 measure">
              Pricing depends on volume, which services you need, the number of providers,
              turnaround requirements, and whether you want dedicated or shared support. Rather
              than publish a rate that wouldn’t apply to you, we scope it after a short
              conversation.
            </p>
          </div>
          <div class="pricing__factors">
            <h3>What shapes your scope</h3>
            <ul class="checklist mt-2">
              <li>Monthly request volume</li>
              <li>Which of the five services you need</li>
              <li>Number of providers and locations</li>
              <li>Turnaround requirements</li>
              <li>Dedicated or shared support</li>
              <li>Complexity of your payer mix</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- =============================== FAQ ============================= -->
    <section class="section">
      <div class="container container--narrow">
        <SectionHeading
          eyebrow="Common questions"
          title="Straight answers before you call"
          lede="The questions Practice Administrators ask us first."
        />
        <FaqAccordion :items="featuredFaqs" />
        <p class="center mt-4">
          <NuxtLink to="/faq" class="link-arrow">
            Read all FAQs <AppIcon name="arrowRight" :size="16" />
          </NuxtLink>
        </p>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
/* ------------------------------- Hero ------------------------------- */
.hero {
  background:
    radial-gradient(820px 420px at 78% -6%, rgba(11, 79, 216, 0.1), transparent 62%),
    linear-gradient(180deg, var(--surface-tint) 0%, #ffffff 82%);
  padding-block: clamp(44px, 3.5vw + 26px, 84px) clamp(52px, 4vw + 30px, 96px);
  border-bottom: 1px solid var(--line);
  /* The hero panel's decorative glow and floating chips deliberately sit
     outside their column. `clip` (not `hidden`) trims them at the viewport
     edge without creating a scroll container. */
  overflow-x: clip;
}

.hero__inner {
  display: grid;
  grid-template-columns: minmax(0, 1.06fr) minmax(0, 0.94fr);
  gap: 64px;
  align-items: center;
}

.hero h1 {
  margin-top: 16px;
}

.hero__accent {
  display: block;
  color: var(--blue-600);
}

.hero__lede {
  margin-top: 22px;
  max-width: 56ch;
}

.hero__actions {
  margin-top: 32px;
}

.hero__proof {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 26px;
  margin-top: 44px;
  padding-top: 34px;
  border-top: 1px solid var(--line);
}

.hero__proof li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.hero__proof-icon {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: var(--blue-50);
  color: var(--blue-600);
  flex-shrink: 0;
}

.hero__proof li > span:last-child {
  display: grid;
  gap: 1px;
  line-height: 1.4;
}

.hero__proof strong {
  font-family: var(--font-display);
  font-size: 0.93rem;
  color: var(--navy-800);
}

.hero__proof span span {
  font-size: 0.86rem;
  color: var(--muted);
}

@media (max-width: 1040px) {
  .hero__inner {
    grid-template-columns: minmax(0, 1fr);
    gap: 54px;
  }
  .hero__visual {
    order: 2;
  }
}

@media (max-width: 560px) {
  .hero__proof {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }
}

/* ----------------------------- Services ----------------------------- */
.svc-all {
  display: flex;
  flex-direction: column;
  background: linear-gradient(160deg, var(--blue-50), #fff 65%);
  border-color: var(--blue-100);
  color: inherit;
}

.svc-all h3 {
  color: var(--navy-800);
}

.svc-all p {
  flex: 1;
  color: var(--body);
}

.svc-all__icon {
  background: var(--blue-600);
  color: #fff;
}

.svc-all .link-arrow {
  margin-top: 18px;
}

/* --------------------------- Who we support -------------------------- */
.who {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.92fr);
  gap: 56px;
  align-items: start;
}

.who__roles {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 28px;
}

.who__roles li {
  font-family: var(--font-display);
  font-size: 0.87rem;
  font-weight: 600;
  color: var(--navy-800);
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 8px 15px;
}

.who__pains {
  background: #fff;
  border: 1px solid var(--line);
  border-left: 4px solid var(--blue-600);
  border-radius: var(--radius-lg);
  padding: 30px;
  box-shadow: var(--shadow-sm);
}

.who__pains-h {
  color: var(--navy-800);
  margin-bottom: 18px;
}

.who__pains-foot {
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  font-size: 0.93rem;
  color: var(--muted);
}

@media (max-width: 940px) {
  .who {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
  }
}

/* ----------------------------- Why cards ---------------------------- */
.why h3 {
  color: var(--navy-800);
}

/* ---------------------------- How it works -------------------------- */
.how {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
  gap: 64px;
  align-items: start;
}

.how__intro {
  position: sticky;
  top: 104px;
}

@media (max-width: 940px) {
  .how {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
  }
  .how__intro {
    position: static;
  }
}

/* ----------------------------- Industries --------------------------- */
.ind-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.ind {
  display: flex;
  flex-direction: column;
  color: inherit;
  position: relative;
}

.ind--focus {
  background: linear-gradient(170deg, #fff, var(--blue-50) 220%);
}

.ind__icon {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: var(--radius);
  background: var(--navy-800);
  color: #fff;
  margin-block: 20px 16px;
}

.ind h3 {
  color: var(--navy-800);
}

.ind p {
  flex: 1;
  color: var(--body);
}

.ind .link-arrow {
  margin-top: 18px;
}

.ind-others {
  background: var(--navy-800);
  border-radius: var(--radius-lg);
  padding: 28px;
  color: #a9bedd;
  display: flex;
  flex-direction: column;
}

.ind-others__h {
  color: #fff;
  font-size: 1.05rem;
  margin-bottom: 16px;
}

.ind-others__list {
  display: grid;
  gap: 2px;
  margin-bottom: 18px;
}

.ind-others__list a {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 11px 12px;
  margin-inline: -12px;
  border-radius: var(--radius-sm);
  color: #dbe7fe;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.92rem;
  line-height: 1.3;
  transition: background 0.16s var(--ease);
}

.ind-others__list a:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.ind-others__list a > span {
  flex: 1;
}

.ind-others__arrow {
  opacity: 0.5;
  flex-shrink: 0;
}

.ind-others__note {
  font-size: 0.89rem;
  line-height: 1.55;
  margin-top: auto;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  margin-bottom: 14px;
}

.ind-others .link-arrow {
  color: #fff;
}

@media (max-width: 1000px) {
  .ind-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .ind-others {
    grid-column: 1 / -1;
  }
}

@media (max-width: 620px) {
  .ind-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* ------------------------------ Pricing ----------------------------- */
.pricing {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
  gap: 52px;
  align-items: start;
}

.pricing__factors {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 28px;
}

.pricing__factors h3 {
  color: var(--navy-800);
  font-size: 1.02rem;
}

@media (max-width: 860px) {
  .pricing {
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
  }
}
</style>
