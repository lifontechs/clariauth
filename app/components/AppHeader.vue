<script setup lang="ts">
import { primaryNav } from '~/data/site'

const open = ref(false)
const route = useRoute()

watch(() => route.fullPath, () => (open.value = false))

// Lock scroll behind the mobile drawer
watch(open, (v) => {
  if (import.meta.client) document.body.style.overflow = v ? 'hidden' : ''
})

onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = ''
})

const isActive = (to: string) => route.path === to || route.path.startsWith(to + '/')
</script>

<template>
  <header class="hdr">
    <div class="container hdr__inner">
      <NuxtLink to="/" class="hdr__logo" aria-label="ClariAuth — home">
        <img
          src="/brand/clariauth-logo.png"
          alt="ClariAuth"
          width="290"
          height="200"
          fetchpriority="high"
        >
      </NuxtLink>

      <nav class="hdr__nav" aria-label="Primary">
        <NuxtLink
          v-for="item in primaryNav"
          :key="item.to"
          :to="item.to"
          class="hdr__link"
          :class="{ 'is-active': isActive(item.to) }"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="hdr__cta">
        <NuxtLink to="/contact" class="btn btn--primary">Request a Consultation</NuxtLink>
      </div>

      <button
        class="hdr__toggle"
        type="button"
        :aria-expanded="open"
        aria-controls="mobile-nav"
        @click="open = !open"
      >
        <span class="sr-only">{{ open ? 'Close menu' : 'Open menu' }}</span>
        <AppIcon :name="open ? 'close' : 'menu'" :size="26" />
      </button>
    </div>

    <Transition name="drawer">
      <div v-show="open" id="mobile-nav" class="hdr__drawer">
        <nav class="container" aria-label="Mobile">
          <NuxtLink
            v-for="item in primaryNav"
            :key="item.to"
            :to="item.to"
            class="hdr__drawer-link"
            :class="{ 'is-active': isActive(item.to) }"
          >
            {{ item.label }}
            <AppIcon name="arrowRight" :size="18" />
          </NuxtLink>
          <NuxtLink to="/contact" class="btn btn--primary btn--block mt-3">
            Request a Consultation
          </NuxtLink>
          <a :href="`mailto:info@clariauth.com`" class="hdr__drawer-mail">
            <AppIcon name="mail" :size="18" /> info@clariauth.com
          </a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.hdr {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid var(--line);
}

.hdr__inner {
  display: flex;
  align-items: center;
  gap: 24px;
  min-height: 76px;
}

.hdr__logo {
  flex-shrink: 0;
  display: block;
}

.hdr__logo img {
  width: auto;
  height: 46px;
}

.hdr__nav {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}

.hdr__link {
  font-family: var(--font-display);
  font-size: 0.93rem;
  font-weight: 600;
  color: var(--body);
  padding: 9px 13px;
  border-radius: var(--radius-sm);
  transition: color 0.16s var(--ease), background 0.16s var(--ease);
  white-space: nowrap;
}

.hdr__link:hover {
  color: var(--navy-800);
  background: var(--surface-alt);
}

.hdr__link.is-active {
  color: var(--blue-600);
}

.hdr__cta {
  flex-shrink: 0;
}

.hdr__cta .btn {
  padding: 12px 20px;
  font-size: 0.92rem;
}

.hdr__toggle {
  display: none;
  margin-left: auto;
  background: none;
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  color: var(--navy-800);
  padding: 8px;
  cursor: pointer;
}

/* Drawer */
.hdr__drawer {
  border-top: 1px solid var(--line);
  background: #fff;
  padding-block: 18px 26px;
  max-height: calc(100dvh - 76px);
  overflow-y: auto;
}

.hdr__drawer-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--navy-800);
  padding: 14px 4px;
  border-bottom: 1px solid var(--line);
}

.hdr__drawer-link svg {
  color: var(--muted);
}

.hdr__drawer-link.is-active {
  color: var(--blue-600);
}

.hdr__drawer-mail {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  font-weight: 500;
  color: var(--body);
  font-size: 0.96rem;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.18s var(--ease);
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

@media (max-width: 1060px) {
  .hdr__nav,
  .hdr__cta {
    display: none;
  }
  .hdr__toggle {
    display: block;
  }
}

@media (max-width: 480px) {
  .hdr__inner {
    min-height: 66px;
  }
  .hdr__logo img {
    height: 38px;
  }
}
</style>
