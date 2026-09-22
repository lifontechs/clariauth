<script setup lang="ts">
import type { NuxtError } from '#app'
import { services } from '~/data/services'
import { industries } from '~/data/industries'

const props = defineProps<{ error: NuxtError }>()

const is404 = computed(() => props.error?.statusCode === 404)

useHead({
  title: is404.value ? 'Page not found' : 'Something went wrong',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})
</script>

<template>
  <div class="err-shell">
    <AppHeader />

    <main class="err">
      <div class="container container--narrow center">
        <p class="eyebrow">{{ error?.statusCode || 500 }}</p>
        <h1 class="mt-2">
          {{ is404 ? 'We couldn’t find that page' : 'Something went wrong' }}
        </h1>
        <p class="lede mt-3">
          {{
            is404
              ? 'The page may have moved or the link may be out of date. Here’s where most people are heading.'
              : 'An unexpected error occurred. Please try again, or get in touch and we’ll help directly.'
          }}
        </p>

        <div class="btn-row err__actions">
          <NuxtLink to="/" class="btn btn--primary btn--lg">Back to home</NuxtLink>
          <NuxtLink to="/contact" class="btn btn--outline btn--lg">Contact us</NuxtLink>
        </div>

        <div v-if="is404" class="err__links">
          <div class="err__col">
            <h2>Services</h2>
            <ul>
              <li v-for="s in services" :key="s.slug">
                <NuxtLink :to="`/services/${s.slug}`">{{ s.name }}</NuxtLink>
              </li>
            </ul>
          </div>
          <div class="err__col">
            <h2>Industries</h2>
            <ul>
              <li v-for="i in industries" :key="i.slug">
                <NuxtLink :to="`/industries/${i.slug}`">{{ i.name }}</NuxtLink>
              </li>
            </ul>
          </div>
          <div class="err__col">
            <h2>Company</h2>
            <ul>
              <li><NuxtLink to="/about">About</NuxtLink></li>
              <li><NuxtLink to="/how-it-works">How It Works</NuxtLink></li>
              <li><NuxtLink to="/faq">FAQ</NuxtLink></li>
              <li><NuxtLink to="/contact">Contact</NuxtLink></li>
            </ul>
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.err-shell {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.err {
  flex: 1;
  padding-block: clamp(56px, 5vw + 30px, 96px);
  background: linear-gradient(180deg, var(--surface-tint) 0%, #ffffff 60%);
}

.err__actions {
  justify-content: center;
  margin-top: 32px;
}

.err__links {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid var(--line);
  text-align: left;
}

.err__col h2 {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 14px;
}

.err__col ul {
  display: grid;
  gap: 9px;
}

.err__col a {
  font-size: 0.93rem;
  color: var(--body);
  line-height: 1.4;
}

.err__col a:hover {
  color: var(--blue-600);
}

@media (max-width: 700px) {
  .err__links {
    grid-template-columns: minmax(0, 1fr);
    gap: 26px;
  }
}
</style>
