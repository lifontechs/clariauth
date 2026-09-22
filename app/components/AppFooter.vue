<script setup lang="ts">
import { site } from '~/data/site'
import { services } from '~/data/services'
import { industries } from '~/data/industries'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="ftr">
    <div class="container">
      <div class="ftr__top">
        <div class="ftr__brand">
          <img
            src="/brand/clariauth-logo-white.png"
            alt="ClariAuth"
            width="291"
            height="200"
            loading="lazy"
          >
          <p class="ftr__tagline">{{ site.tagline }}</p>
          <p class="ftr__blurb">
            Insurance eligibility verification, benefits investigation, prior authorization
            support and payer follow-up for healthcare providers across the United States.
          </p>
          <a :href="`mailto:${site.email}`" class="ftr__mail">
            <AppIcon name="mail" :size="18" />
            {{ site.email }}
          </a>
        </div>

        <div class="ftr__cols">
          <div class="ftr__col">
            <h2 class="ftr__h">Services</h2>
            <ul>
              <li v-for="s in services" :key="s.slug">
                <NuxtLink :to="`/services/${s.slug}`">{{ s.name }}</NuxtLink>
              </li>
            </ul>
          </div>

          <div class="ftr__col">
            <h2 class="ftr__h">Industries</h2>
            <ul>
              <li v-for="i in industries" :key="i.slug">
                <NuxtLink :to="`/industries/${i.slug}`">{{ i.name }}</NuxtLink>
              </li>
            </ul>
          </div>

          <div class="ftr__col">
            <h2 class="ftr__h">Company</h2>
            <ul>
              <li><NuxtLink to="/about">About ClariAuth</NuxtLink></li>
              <li><NuxtLink to="/how-it-works">How It Works</NuxtLink></li>
              <li><NuxtLink to="/faq">FAQ</NuxtLink></li>
              <li><NuxtLink to="/contact">Contact</NuxtLink></li>
              <li><NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink></li>
              <li><NuxtLink to="/terms">Terms of Use</NuxtLink></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="ftr__bottom">
        <p>© {{ year }} {{ site.legalName }}. All rights reserved.</p>
        <p class="ftr__note">
          ClariAuth provides administrative support services to healthcare providers. We do not
          provide medical advice, and authorization decisions rest with the payer.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.ftr {
  background: var(--navy-800);
  color: #a9bedd;
  padding-block: 64px 32px;
  font-size: 0.95rem;
}

.ftr__top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
  gap: 56px;
  padding-bottom: 44px;
}

.ftr__brand img {
  width: auto;
  height: 54px;
  margin-bottom: 16px;
}

.ftr__tagline {
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--blue-200);
  font-size: 0.9rem;
  letter-spacing: 0.01em;
  margin-bottom: 14px;
}

.ftr__blurb {
  max-width: 42ch;
  line-height: 1.6;
  margin-bottom: 20px;
}

.ftr__mail {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #fff;
  font-weight: 600;
  font-family: var(--font-display);
}

.ftr__mail:hover {
  color: var(--blue-200);
}

.ftr__cols {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
}

.ftr__h {
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 16px;
}

.ftr__col ul {
  display: grid;
  gap: 10px;
}

.ftr__col a {
  color: #a9bedd;
  font-size: 0.93rem;
  line-height: 1.45;
}

.ftr__col a:hover {
  color: #fff;
}

.ftr__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 14px;
  font-size: 0.86rem;
  color: #8ba4c8;
}

.ftr__note {
  max-width: 62ch;
}

@media (max-width: 900px) {
  .ftr__top {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
  }
}

@media (max-width: 560px) {
  .ftr__cols {
    grid-template-columns: minmax(0, 1fr);
    gap: 28px;
  }
}
</style>
