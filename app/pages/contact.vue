<script setup lang="ts">
import { site } from '~/data/site'

useSeo({
  title: 'Contact ClariAuth — Request a Consultation',
  description:
    'Request a free consultation with ClariAuth. Tell us your payers, volumes and current process, and we’ll show you where we can help.',
})

useBreadcrumbs([{ label: 'Contact', to: '/contact' }])

useJsonLd({
  '@type': 'ContactPage',
  name: 'Contact ClariAuth',
  url: `${site.url}/contact`,
  mainEntity: { '@id': `${site.url}/#organization` },
})

const whatHappens = [
  {
    title: 'We read it properly',
    body: 'A person reads your message — not an autoresponder sorting you into a sequence.',
  },
  {
    title: 'We reply with next steps',
    body: 'Usually a short note proposing a time to talk, plus anything we need to know first.',
  },
  {
    title: 'A short consultation',
    body: 'We ask about your specialty, payer mix, volumes and current process, and tell you plainly whether we can help.',
  },
  {
    title: 'A scoped proposal',
    body: 'If it’s a fit, we propose a defined scope and pricing built around your actual workflow.',
  },
]
</script>

<template>
  <div>
    <PageHero
      eyebrow="Contact"
      title="Request a consultation"
      lede="Tell us about your payers, your volumes and where your team is losing time. We’ll come back with a straight answer about whether ClariAuth can help — and what that would look like."
      current="Contact"
    />

    <section class="section">
      <div class="container">
        <div class="contact">
          <div class="contact__form">
            <h2 class="contact__h">Send us a message</h2>
            <p class="mt-2 mb-4 measure">
              Fields marked <span class="text-blue">*</span> are required. Everything else helps us
              come back with something useful rather than generic.
            </p>
            <ContactForm />
          </div>

          <aside class="contact__side">
            <div class="side-card">
              <h3>Prefer email?</h3>
              <p class="mt-2">
                Write to us directly — it reaches the same place as the form.
              </p>
              <a :href="`mailto:${site.email}`" class="side-card__mail">
                <AppIcon name="mail" :size="19" />
                {{ site.email }}
              </a>
              <a
                :href="site.linkedin"
                class="side-card__link"
                rel="noopener"
                target="_blank"
              >
                <AppIcon name="linkedin" :size="19" />
                ClariAuth on LinkedIn
              </a>
            </div>

            <div class="side-card side-card--steps">
              <h3>What happens next</h3>
              <ol class="next mt-3">
                <li v-for="(w, i) in whatHappens" :key="w.title">
                  <span class="next__num">{{ i + 1 }}</span>
                  <span>
                    <strong>{{ w.title }}</strong>
                    <span>{{ w.body }}</span>
                  </span>
                </li>
              </ol>
            </div>

            <div class="side-card side-card--note">
              <AppIcon name="lock" :size="20" />
              <p>
                Please don’t include protected health information in this form. Once we’re working
                together we’ll set up an appropriate channel, covered by a Business Associate
                Agreement.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.65fr);
  gap: 60px;
  align-items: start;
}

.contact__h {
  font-size: 1.5rem;
}

.contact__side {
  display: grid;
  gap: 18px;
  position: sticky;
  top: 104px;
}

.side-card {
  background: var(--surface-alt);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 26px;
}

.side-card h3 {
  color: var(--navy-800);
  font-size: 1.05rem;
}

.side-card p {
  font-size: 0.95rem;
}

.side-card__mail,
.side-card__link {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--navy-800);
  word-break: break-word;
}

.side-card__mail:hover,
.side-card__link:hover {
  color: var(--blue-700);
}

.side-card__mail svg,
.side-card__link svg {
  color: var(--blue-600);
  flex-shrink: 0;
}

.next {
  display: grid;
  gap: 16px;
}

.next li {
  display: flex;
  gap: 13px;
  align-items: flex-start;
}

.next__num {
  display: grid;
  place-items: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: var(--blue-600);
  color: #fff;
  font-family: var(--font-display);
  font-size: 0.76rem;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 2px;
}

.next li > span:last-child {
  display: grid;
  gap: 3px;
}

.next strong {
  font-family: var(--font-display);
  font-size: 0.93rem;
  color: var(--navy-800);
}

.next span span {
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--body);
}

.side-card--note {
  display: flex;
  gap: 13px;
  background: var(--blue-50);
  border-color: var(--blue-100);
}

.side-card--note svg {
  color: var(--blue-600);
  flex-shrink: 0;
  margin-top: 2px;
}

.side-card--note p {
  font-size: 0.89rem;
  line-height: 1.55;
}

@media (max-width: 1000px) {
  .contact {
    grid-template-columns: minmax(0, 1fr);
    gap: 44px;
  }
  .contact__side {
    position: static;
  }
}
</style>
