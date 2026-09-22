<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    body?: string
    primaryLabel?: string
    primaryTo?: string
    secondaryLabel?: string
    secondaryTo?: string
  }>(),
  {
    title: 'Let’s make insurance operations easier — together',
    body: 'Tell us about your payers, volumes and current process. We’ll show you exactly where ClariAuth would take work off your team.',
    primaryLabel: 'Request a Consultation',
    primaryTo: '/contact',
    secondaryLabel: 'Explore Our Services',
    secondaryTo: '/services',
  },
)
</script>

<template>
  <section class="cta">
    <div class="container cta__inner">
      <div class="cta__text">
        <h2>{{ title }}</h2>
        <p>{{ body }}</p>
      </div>
      <div class="cta__actions">
        <NuxtLink :to="primaryTo" class="btn btn--white btn--lg">{{ primaryLabel }}</NuxtLink>
        <NuxtLink v-if="secondaryTo" :to="secondaryTo" class="btn btn--ghost-light btn--lg">
          {{ secondaryLabel }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  background:
    radial-gradient(900px 340px at 88% 8%, rgba(47, 110, 240, 0.4), transparent 62%),
    linear-gradient(135deg, var(--navy-800) 0%, var(--navy-900) 100%);
  color: #c6d6ef;
  padding-block: clamp(48px, 4vw + 30px, 76px);
}

.cta__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}

.cta__text {
  max-width: 620px;
}

.cta__text h2 {
  color: #fff;
  font-size: clamp(1.6rem, 1.2rem + 1.5vw, 2.2rem);
}

.cta__text p {
  margin-top: 12px;
  font-size: 1.04rem;
  line-height: 1.6;
}

.cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

@media (max-width: 900px) {
  .cta__actions {
    width: 100%;
  }
  .cta__actions .btn {
    flex: 1 1 220px;
  }
}
</style>
