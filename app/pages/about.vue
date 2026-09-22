<script setup lang="ts">
import { site } from '~/data/site'

useSeo({
  title: 'About Our Healthcare Insurance Operations Company',
  description:
    'ClariAuth is a specialized healthcare insurance operations company supporting U.S. providers with eligibility, benefits and prior authorization work.',
})

useBreadcrumbs([{ label: 'About', to: '/about' }])

useJsonLd({
  '@type': 'AboutPage',
  name: 'About ClariAuth',
  url: `${site.url}/about`,
  mainEntity: { '@id': `${site.url}/#organization` },
})

const principles = [
  {
    icon: 'shield',
    title: 'Accuracy over speed',
    body: 'A fast answer that turns out to be wrong costs more than a careful one. We verify at the source, and we record where the answer came from so it can be checked.',
  },
  {
    icon: 'clock',
    title: 'Follow-up as a discipline',
    body: 'Most authorization value is lost in the gap between submission and decision. We work pending items on a defined cadence rather than waiting for the payer to come back.',
  },
  {
    icon: 'comms',
    title: 'Communication without chasing',
    body: 'You should never have to ask us where something stands. Status, outcomes and blockers come to you in the format and rhythm we agree up front.',
  },
  {
    icon: 'focus',
    title: 'Honest about limits',
    body: 'We don’t promise approvals, and we say plainly when something is outside what we can affect. That is more useful to you than optimism.',
  },
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="About ClariAuth"
      title="A specialist partner for insurance operations"
      lede="ClariAuth exists for one reason: the administrative work required to get insurance approvals has outgrown the teams expected to absorb it."
      current="About"
    />

    <!-- Why we exist -->
    <section class="section">
      <div class="container">
        <div class="about-split">
          <div>
            <p class="eyebrow">Why we exist</p>
            <h2 class="mt-2">The work grew. The staffing model didn’t.</h2>

            <div class="stack mt-3 prose-body">
              <p class="lede">
                Verifying coverage, investigating benefits and obtaining prior authorization used
                to be a small part of someone’s day. It is now a function in its own right —
                except that in most organizations it still isn’t staffed like one.
              </p>
              <p>
                The work falls to people who are also running the front desk, managing intake or
                supervising billing. It happens between interruptions, which is precisely why it
                becomes inconsistent. A benefit gets quoted from memory. A pending authorization
                sits for a week because nobody had a spare hour. A requirement changes and nobody
                notices until a denial arrives.
              </p>
              <p>
                None of that reflects badly on the people doing it. It reflects a workload that
                needs dedicated attention and rarely gets it.
              </p>
              <p>
                ClariAuth was built to be that dedicated attention — a specialist function you can
                attach to your operation without recruiting, training and retaining for it
                yourself.
              </p>
            </div>
          </div>

          <aside class="about-card">
            <h3 class="about-card__h">What ClariAuth is</h3>
            <ul class="checklist mt-3">
              <li>A healthcare insurance operations support company</li>
              <li>Focused on eligibility, benefits, authorization and payer follow-up</li>
              <li>Serving healthcare providers across the United States</li>
              <li>Built around payer-specific knowledge and documented process</li>
            </ul>

            <h3 class="about-card__h mt-4">What it isn’t</h3>
            <ul class="dashlist mt-3">
              <li>A general medical billing company</li>
              <li>A virtual assistant service</li>
              <li>A software product you have to implement</li>
              <li>A clinical provider of any kind</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>

    <!-- Approach -->
    <section class="section section--alt">
      <div class="container">
        <SectionHeading
          eyebrow="Our approach"
          title="Specialists, not generalists"
          lede="We deliberately do one kind of work. That focus is what lets us build real depth in payer behaviour rather than shallow familiarity across a dozen unrelated services."
        />

        <div class="grid grid--2">
          <div v-for="p in principles" :key="p.title" class="card principle">
            <span class="card__icon">
              <AppIcon :name="p.icon" :size="24" />
            </span>
            <h3>{{ p.title }}</h3>
            <p>{{ p.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Commitments -->
    <section class="section">
      <div class="container">
        <div class="commit">
          <div class="commit__text">
            <p class="eyebrow">Our commitment</p>
            <h2 class="mt-2">Accuracy, reliability, responsiveness</h2>
            <p class="lede mt-3">
              These are the three things a provider actually needs from an insurance operations
              partner, and they are the three things we hold ourselves to.
            </p>
          </div>

          <div class="commit__items">
            <div class="commit__item">
              <h3>Accuracy</h3>
              <p>
                Verified at the source, documented with its origin and date, and specific to the
                service in question rather than a generic summary.
              </p>
            </div>
            <div class="commit__item">
              <h3>Reliability</h3>
              <p>
                The same process on every request, on an agreed cadence, whether it is a routine
                eligibility check or a complex imaging authorization.
              </p>
            </div>
            <div class="commit__item">
              <h3>Responsiveness</h3>
              <p>
                Prompt answers on what we control, honest updates on what we don’t, and early
                warning when something is at risk of delaying care.
              </p>
            </div>
            <div class="commit__item">
              <h3>Timely communication</h3>
              <p>
                You should never have to ask where something stands. Status reaches you before
                you go looking for it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Working with us -->
    <section class="section section--tight section--alt">
      <div class="container container--narrow center">
        <span class="pill">Serving providers nationwide</span>
        <h2 class="mt-3">Built for U.S. healthcare providers</h2>
        <p class="lede mt-3">
          We work with commercial plans, Medicare Advantage and Medicaid managed care across the
          United States, and with healthcare organizations of many kinds — from home health
          agencies and imaging centers to medical practices, therapy providers and specialty
          organizations.
        </p>
        <div class="btn-row mt-4" style="justify-content: center">
          <NuxtLink to="/industries" class="btn btn--outline">See the specialties we support</NuxtLink>
          <a :href="`mailto:${site.email}`" class="btn btn--outline">{{ site.email }}</a>
        </div>
      </div>
    </section>

    <CtaBand
      title="Let’s find out if we’re a fit"
      body="A short consultation, no obligation, and a straight answer about whether ClariAuth would genuinely help your operation."
      secondary-label="How we work"
      secondary-to="/how-it-works"
    />
  </div>
</template>

<style scoped>
.about-split {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: 60px;
  align-items: start;
}

.prose-body p {
  max-width: 68ch;
}

.about-card {
  background: var(--surface-alt);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 30px;
  position: sticky;
  top: 104px;
}

.about-card__h {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.principle h3 {
  color: var(--navy-800);
}

/* Commitment */
.commit {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: 56px;
  align-items: start;
}

.commit__items {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px 36px;
}

.commit__item h3 {
  color: var(--navy-800);
  font-size: 1.05rem;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 2px solid var(--blue-100);
}

.commit__item p {
  font-size: 0.96rem;
}

@media (max-width: 960px) {
  .about-split,
  .commit {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
  }
  .about-card {
    position: static;
  }
}

@media (max-width: 560px) {
  .commit__items {
    grid-template-columns: minmax(0, 1fr);
    gap: 24px;
  }
}
</style>
