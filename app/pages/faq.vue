<script setup lang="ts">
import { faqs } from '~/data/faqs'
import { site } from '~/data/site'

useSeo({
  title: 'Frequently Asked Questions',
  description:
    'Common questions about ClariAuth — what we do, how we differ from medical billing companies, pricing, turnaround, HIPAA-aware workflows and how to get started.',
})

useBreadcrumbs([{ label: 'FAQ', to: '/faq' }])

useJsonLd({
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="FAQ"
      title="Frequently asked questions"
      lede="Straight answers to what providers ask us before they get in touch. If your question isn’t here, email us and we’ll answer it plainly."
      current="FAQ"
    />

    <section class="section">
      <div class="container container--narrow">
        <FaqAccordion :items="faqs" />

        <div class="faq-foot">
          <div>
            <h2>Still have a question?</h2>
            <p class="mt-2">
              Email us directly or request a consultation — either way you’ll get a real answer,
              not a sales sequence.
            </p>
          </div>
          <div class="btn-row">
            <NuxtLink to="/contact" class="btn btn--primary">Request a Consultation</NuxtLink>
            <a :href="`mailto:${site.email}`" class="btn btn--outline">{{ site.email }}</a>
          </div>
        </div>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
.faq-foot {
  margin-top: 48px;
  padding: 32px;
  background: var(--surface-alt);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 26px;
}

.faq-foot h2 {
  font-size: 1.35rem;
}

.faq-foot p {
  font-size: 0.97rem;
  max-width: 44ch;
}
</style>
