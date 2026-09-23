<script setup lang="ts">
useSeo({
  title: 'How Our Verification & Authorization Process Works',
  description:
    'You send the request, we verify eligibility, benefits and authorization requirements, we follow up with payers, and you receive documented results.',
})

useBreadcrumbs([{ label: 'How It Works', to: '/how-it-works' }])

const onboarding = [
  {
    title: 'Consultation',
    body: 'A short conversation about your specialty, payer mix, volumes, current process and where the workload is hurting most. We are direct about whether we are a good fit.',
  },
  {
    title: 'Scope and agreement',
    body: 'We define which services you need, the intake method, turnaround expectations and reporting format — then put a Business Associate Agreement in place before any protected health information moves.',
  },
  {
    title: 'Access and setup',
    body: 'We arrange the access your workflow requires and document payer-specific processes, portal steps and any internal conventions your team uses.',
  },
  {
    title: 'Pilot scope',
    body: 'We typically start with a defined scope — one service line, one payer group or a fixed volume — so both sides can confirm the process works before expanding.',
  },
  {
    title: 'Ongoing operation',
    body: 'Work runs on the agreed cadence, with a regular review of turnaround, accuracy and anything that should change as your volume or payer mix shifts.',
  },
]

const expectations = [
  {
    icon: 'check',
    title: 'What we commit to',
    items: [
      'Working every request against the payer’s current requirements',
      'Following up on pending items rather than waiting for the payer',
      'Documenting the source, date and reference for what we verify',
      'Flagging anything that needs your clinical or administrative decision',
      'Telling you promptly when something is going to be a problem',
    ],
  },
  {
    icon: 'alert',
    title: 'What we can’t control',
    items: [
      'Whether a payer approves a request — that decision is theirs',
      'Payer processing times beyond their published timeframes',
      'Clinical documentation that has to come from your providers',
      'Payer policy changes that take effect without notice',
      'Coverage a patient’s plan simply does not include',
    ],
  },
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="How it works"
      title="A simple, documented process"
      lede="No new software for your staff to learn and no change to how your practice runs. You send the request, we do the insurance work, you get a documented answer back."
      current="How It Works"
    />

    <!-- Four steps -->
    <section class="section">
      <div class="container">
        <div class="hiw">
          <div class="hiw__intro">
            <p class="eyebrow">The process</p>
            <h2 class="mt-2">Four steps, every request</h2>
            <p class="lede mt-3">
              The same sequence applies whether we are checking a single eligibility record or
              carrying an imaging authorization through to approval.
            </p>
            <div class="hiw__card">
              <AppIcon name="workflow" :size="22" />
              <p>
                We work inside the intake method and reporting format you already use — your
                system, a shared worklist, or a simple request form. Whichever suits your team.
              </p>
            </div>
          </div>

          <div class="hiw__steps">
            <ProcessSteps detailed />
          </div>
        </div>
      </div>
    </section>

    <!-- Expectations -->
    <section class="section section--alt">
      <div class="container">
        <SectionHeading
          eyebrow="Setting expectations"
          title="What we will and won’t promise"
          lede="Anyone guaranteeing approvals or revenue outcomes is selling something they don’t control. Here is the honest split."
        />

        <div class="grid grid--2" data-reveal-group>
          <div
            v-for="e in expectations"
            :key="e.title"
            class="card exp"
            :class="{ 'exp--limits': e.icon === 'alert' }"
          >
            <span class="card__icon">
              <AppIcon :name="e.icon" :size="24" />
            </span>
            <h3>{{ e.title }}</h3>
            <ul class="mt-3" :class="e.icon === 'check' ? 'checklist' : 'dashlist'">
              <li v-for="item in e.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Onboarding -->
    <section class="section">
      <div class="container">
        <SectionHeading
          align="left"
          eyebrow="Getting started"
          title="From first call to running workflow"
          lede="What happens between a consultation and work moving off your team’s desk."
        />

        <ol class="onboard">
          <li v-for="(o, i) in onboarding" :key="o.title" class="onboard__item">
            <span class="onboard__num">{{ i + 1 }}</span>
            <div>
              <h3>{{ o.title }}</h3>
              <p>{{ o.body }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- PHI handling -->
    <section class="section section--tight">
      <div class="container container--narrow">
        <div class="phi">
          <span class="phi__icon">
            <AppIcon name="lock" :size="26" />
          </span>
          <div>
            <h2>Handling protected health information</h2>
            <p class="mt-3">
              We operate HIPAA-aware workflows. Access is limited to the minimum information a
              request requires, protected health information stays within approved systems rather
              than personal devices or general-purpose messaging, and our team is trained on
              appropriate handling. We sign a Business Associate Agreement as part of onboarding,
              before any protected health information moves.
            </p>
            <p class="mt-3">
              We are happy to walk through our specific handling practices during the consultation
              — and we would encourage you to ask any vendor to do the same.
            </p>
          </div>
        </div>
      </div>
    </section>

    <CtaBand
      title="See what this would look like for your team"
      body="A short consultation is usually enough to tell whether we can take meaningful work off your desk — and we’ll say so plainly if we can’t."
      secondary-label="Read our FAQs"
      secondary-to="/faq"
    />
  </div>
</template>

<style scoped>
.hiw {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
  gap: 64px;
  align-items: start;
}

.hiw__intro {
  position: sticky;
  top: 104px;
}

.hiw__card {
  display: flex;
  gap: 14px;
  margin-top: 32px;
  padding: 22px;
  background: var(--blue-50);
  border: 1px solid var(--blue-100);
  border-radius: var(--radius-lg);
}

.hiw__card svg {
  color: var(--blue-600);
  flex-shrink: 0;
  margin-top: 2px;
}

.hiw__card p {
  font-size: 0.95rem;
  line-height: 1.6;
}

.exp h3 {
  color: var(--navy-800);
}

.exp--limits .card__icon {
  background: #fdf3e9;
  color: #b3691a;
}

/* Onboarding */
.onboard {
  display: grid;
  gap: 18px;
  counter-reset: onboard;
}

.onboard__item {
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr);
  gap: 22px;
  align-items: start;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 26px 28px;
}

.onboard__num {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--navy-800);
  color: #fff;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.02rem;
}

.onboard__item h3 {
  color: var(--navy-800);
  margin-bottom: 6px;
}

.onboard__item p {
  max-width: 78ch;
  font-size: 0.98rem;
}

/* PHI */
.phi {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr);
  gap: 26px;
  background: var(--surface-alt);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 34px;
}

.phi__icon {
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  border-radius: var(--radius);
  background: var(--navy-800);
  color: #fff;
}

.phi h2 {
  font-size: 1.4rem;
}

.phi p {
  font-size: 0.99rem;
}

@media (max-width: 940px) {
  .hiw {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
  }
  .hiw__intro {
    position: static;
  }
}

@media (max-width: 620px) {
  .onboard__item,
  .phi {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
    padding: 24px;
  }
}
</style>
