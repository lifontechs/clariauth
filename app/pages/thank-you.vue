<script setup lang="ts">
import { site } from '~/data/site'
import { services } from '~/data/services'

useSeo({
  title: 'Thank You — We’ve Received Your Request',
  description: 'Thanks for contacting ClariAuth. We’ve received your request and will be in touch shortly.',
  noindex: true,
})
</script>

<template>
  <div>
    <section class="ty">
      <div class="container container--narrow center">
        <span class="ty__mark">
          <AppIcon name="check" :size="34" />
        </span>

        <h1 class="mt-4">Thank you — your request is in</h1>

        <p class="lede mt-3">
          A member of the ClariAuth team will review what you’ve sent and reply directly, usually
          within one business day. If your request is time-sensitive, email us at
          <a :href="`mailto:${site.email}`">{{ site.email }}</a> and mention that in the subject
          line.
        </p>

        <div class="ty__next">
          <h2>While you’re here</h2>
          <div class="ty__links mt-3">
            <NuxtLink to="/how-it-works" class="ty__link">
              <AppIcon name="workflow" :size="20" />
              <span>
                <strong>How our process works</strong>
                <span>The four steps behind every request</span>
              </span>
              <AppIcon name="arrowRight" :size="16" class="ty__arrow" />
            </NuxtLink>

            <NuxtLink to="/faq" class="ty__link">
              <AppIcon name="book" :size="20" />
              <span>
                <strong>Frequently asked questions</strong>
                <span>Pricing, turnaround, PHI handling and more</span>
              </span>
              <AppIcon name="arrowRight" :size="16" class="ty__arrow" />
            </NuxtLink>

            <NuxtLink :to="`/services/${services[0].slug}`" class="ty__link">
              <AppIcon name="shield" :size="20" />
              <span>
                <strong>Our services in detail</strong>
                <span>What’s involved and what you receive back</span>
              </span>
              <AppIcon name="arrowRight" :size="16" class="ty__arrow" />
            </NuxtLink>
          </div>
        </div>

        <NuxtLink to="/" class="btn btn--outline mt-5">Back to home</NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ty {
  padding-block: clamp(56px, 5vw + 30px, 100px);
  background: linear-gradient(180deg, var(--surface-tint) 0%, #ffffff 70%);
}

.ty__mark {
  display: inline-grid;
  place-items: center;
  width: 78px;
  height: 78px;
  border-radius: 50%;
  background: #e9f7f1;
  border: 2px solid #c2e6d6;
  color: var(--success);
}

.ty__next {
  margin-top: 56px;
  text-align: left;
}

.ty__next h2 {
  font-size: 1.2rem;
  text-align: center;
}

.ty__links {
  display: grid;
  gap: 12px;
}

.ty__link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 22px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  color: inherit;
  transition: border-color 0.18s var(--ease), box-shadow 0.18s var(--ease);
}

.ty__link:hover {
  border-color: var(--blue-200);
  box-shadow: var(--shadow-sm);
}

.ty__link > svg:first-child {
  color: var(--blue-600);
  flex-shrink: 0;
}

.ty__link > span {
  display: grid;
  gap: 2px;
  flex: 1;
}

.ty__link strong {
  font-family: var(--font-display);
  font-size: 0.98rem;
  color: var(--navy-800);
}

.ty__link span span {
  font-size: 0.88rem;
  color: var(--muted);
}

.ty__arrow {
  color: var(--muted);
  flex-shrink: 0;
}
</style>
