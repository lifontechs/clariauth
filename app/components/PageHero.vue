<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    lede?: string
    /** Breadcrumb trail, excluding Home and the current page */
    trail?: { label: string; to: string }[]
    current?: string
  }>(),
  { trail: () => [] },
)
</script>

<template>
  <section class="phero">
    <div class="container">
      <nav v-if="current" class="crumbs" aria-label="Breadcrumb">
        <ol>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li v-for="c in trail" :key="c.to">
            <AppIcon name="chevronDown" :size="14" class="crumbs__sep" />
            <NuxtLink :to="c.to">{{ c.label }}</NuxtLink>
          </li>
          <li>
            <AppIcon name="chevronDown" :size="14" class="crumbs__sep" />
            <span aria-current="page">{{ current }}</span>
          </li>
        </ol>
      </nav>

      <div class="phero__body">
        <p v-if="eyebrow" class="eyebrow anim-rise">{{ eyebrow }}</p>
        <h1 class="anim-rise anim-d1">{{ title }}</h1>
        <p v-if="lede" class="lede phero__lede anim-rise anim-d2">{{ lede }}</p>
        <div class="anim-rise anim-d3">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.phero {
  background:
    radial-gradient(760px 300px at 82% -10%, rgba(11, 79, 216, 0.09), transparent 60%),
    linear-gradient(180deg, var(--surface-tint) 0%, #ffffff 100%);
  padding-block: 28px clamp(48px, 4vw + 26px, 76px);
  border-bottom: 1px solid var(--line);
}

.crumbs {
  margin-bottom: 26px;
}

.crumbs ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
  color: var(--muted);
}

.crumbs li {
  display: flex;
  align-items: center;
  gap: 4px;
}

.crumbs a {
  color: var(--muted);
}

.crumbs a:hover {
  color: var(--blue-600);
}

.crumbs__sep {
  transform: rotate(-90deg);
  color: var(--line-strong);
}

.phero__body {
  max-width: 820px;
}

.phero__lede {
  margin-top: 18px;
  max-width: 68ch;
}
</style>
