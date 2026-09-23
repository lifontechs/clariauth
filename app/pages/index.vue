<script setup lang="ts">
import {
  site,
  heroProofPoints,
  heroImage,
  heroScript,
  differentiators,
  painPoints,
} from '~/data/site'
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
          <p class="hero__eyebrow anim-rise">
            Specialized insurance support for healthcare providers
          </p>

          <h1 class="hero__title anim-rise anim-d1">
            We Handle the Authorizations.
            <span class="hero__accent">You Focus on Patient Care.</span>
          </h1>

          <p class="hero__lede anim-rise anim-d2">
            Eligibility verification, benefits investigation, prior authorization and payer
            follow-up — so your practice runs smoother and your team spends more time
            on patients.
          </p>

          <div class="btn-row hero__actions anim-rise anim-d3">
            <NuxtLink to="/contact" class="btn btn--navy btn--lg">
              Request a Consultation
            </NuxtLink>
            <NuxtLink to="/services" class="btn btn--outline btn--lg">
              Our Services
            </NuxtLink>
          </div>

          <ul class="hero__proof anim-rise anim-d4">
            <li v-for="p in heroProofPoints" :key="p.title">
              <AppIcon :name="p.icon" :size="26" class="hero__proof-icon" />
              <span>{{ p.title }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bleeds to the right edge of the viewport on desktop; stacks below
           the copy on narrow screens. With a photograph the script line
           overlays it, as in the design; without one the media column stacks
           the script above the verification card so nothing collides. -->
      <div
        class="hero__media anim-rise anim-d3"
        :class="heroImage.src ? 'hero__media--photo' : 'hero__media--panel'"
      >
        <p class="hero__script" aria-hidden="true">
          {{ heroScript }}
          <svg class="hero__script-rule" viewBox="0 0 120 12" fill="none" aria-hidden="true">
            <path
              d="M2 9C22 3 74 1 118 6"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
            />
          </svg>
        </p>

        <img
          v-if="heroImage.src"
          :src="heroImage.src"
          :alt="heroImage.alt"
          class="hero__photo"
          :style="{ objectPosition: heroImage.focus }"
          fetchpriority="high"
          decoding="async"
        >
        <div v-else class="hero__panel">
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

        <div class="grid grid--3 svc-grid" data-reveal-group>
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
        <div class="who" data-reveal-group>
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

        <div class="grid grid--3" data-reveal-group>
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

        <div class="ind-grid" data-reveal-group>
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
  position: relative;
  background: linear-gradient(115deg, #eef4fb 0%, #e8f0f9 46%, #dfeaf6 100%);
  border-bottom: 1px solid var(--line);
  /* The hero panel's decorative glow deliberately overflows its column.
     `clip` trims it at the hero's edge without creating a scroll container
     (which `hidden` would, and which `visible` would let reach the page). */
  overflow-x: clip;
}

.hero__inner {
  padding-block: clamp(44px, 3.4vw + 26px, 78px);
}

/* Copy sits in the left half; the photo bleeds off the right edge. */
.hero__text {
  position: relative;
  z-index: 2;
  max-width: 560px;
}

.hero__eyebrow {
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #5b708d;
}

.hero__title {
  margin-top: 18px;
  font-size: clamp(2.15rem, 1.2rem + 2.9vw, 3.3rem);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.025em;
  color: var(--navy-800);
}

.hero__accent {
  display: block;
  color: var(--blue-600);
}

.hero__lede {
  margin-top: 20px;
  max-width: 46ch;
  font-size: clamp(1rem, 0.95rem + 0.25vw, 1.1rem);
  line-height: 1.6;
  color: #46566e;
}

.hero__actions {
  margin-top: 30px;
}

/* Four inline benefit points, icon beside a two-line label. */
.hero__proof {
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: start;
  gap: 26px;
  margin-top: 40px;
}

.hero__proof li {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hero__proof-icon {
  color: var(--blue-600);
  flex-shrink: 0;
  stroke-width: 1.5;
}

.hero__proof span {
  /* The labels carry an explicit line break in the data. */
  white-space: pre-line;
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 600;
  line-height: 1.32;
  color: var(--navy-800);
}

/* ------------------------------ Hero media --------------------------- */
.hero__media {
  position: absolute;
  inset: 0 0 0 auto;
  width: 46%;
  z-index: 1;
}

.hero__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Feathers the photo into the copy column so the text stays readable. Only
   needed in photo mode — the panel fallback has nothing to blend. */
.hero__media--photo::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(90deg, #e8f0f9 0%, rgba(232, 240, 249, 0.55) 22%, transparent 52%);
  pointer-events: none;
}

.hero__script {
  font-family: 'Nothing You Could Do', cursive;
  font-size: clamp(1rem, 0.8rem + 0.6vw, 1.35rem);
  line-height: 1.45;
  color: var(--blue-600);
  max-width: 190px;
}

.hero__script-rule {
  display: block;
  width: 86px;
  height: 11px;
  margin-top: 6px;
  margin-left: auto;
  color: var(--blue-500);
}

/* Photo mode: the script sits over the image, as in the design. */
.hero__media--photo .hero__script {
  position: absolute;
  z-index: 2;
  top: 13%;
  right: 5%;
  text-shadow: 0 1px 10px rgba(255, 255, 255, 0.85);
}

/* Panel mode: stacked, so the script never lands on the card. */
.hero__media--panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
  padding: 28px 30px 28px 10px;
}

.hero__media--panel .hero__script {
  align-self: flex-end;
  text-align: right;
  margin-right: 4px;
}

.hero__panel {
  width: 100%;
}

/* Photo narrows before it is dropped below the copy. */
@media (max-width: 1180px) {
  .hero__media {
    width: 42%;
  }
  .hero__text {
    max-width: 500px;
  }
  .hero__proof {
    grid-template-columns: repeat(2, auto);
    gap: 18px 28px;
  }
}

@media (max-width: 900px) {
  .hero__inner {
    padding-bottom: 36px;
  }
  .hero__text {
    max-width: none;
  }
  .hero__media {
    position: relative;
    inset: auto;
    width: 100%;
  }
  .hero__media--photo {
    height: clamp(280px, 52vw, 430px);
  }
  /* The feather runs top-to-bottom once the photo sits under the copy. */
  .hero__media--photo::before {
    background: linear-gradient(180deg, #e8f0f9 0%, rgba(232, 240, 249, 0.4) 18%, transparent 46%);
  }
  .hero__media--photo .hero__script {
    top: 8%;
    right: 6%;
    max-width: 170px;
  }
  .hero__media--panel {
    padding: 0 0 44px;
  }
  .hero__media--panel .hero__script {
    display: none;
  }
}

@media (max-width: 520px) {
  /* Stacked buttons read as a pair only if they share a width. */
  .hero__actions .btn {
    flex: 1 1 100%;
  }
  .hero__proof {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px 14px;
  }
  .hero__proof span {
    font-size: 0.78rem;
  }
  .hero__script {
    max-width: 140px;
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
