<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    lede?: string
    align?: 'center' | 'left'
    light?: boolean
    /** Render as h1 on pages where this heading is the page title */
    level?: 1 | 2
  }>(),
  { align: 'center', light: false, level: 2 },
)
</script>

<template>
  <div class="sh" :class="[`sh--${align}`, { 'sh--light': light }]">
    <p v-if="eyebrow" class="eyebrow" :class="{ 'eyebrow--light': light }">{{ eyebrow }}</p>
    <component :is="level === 1 ? 'h1' : 'h2'" class="sh__title">{{ title }}</component>
    <p v-if="lede" class="lede sh__lede">{{ lede }}</p>
  </div>
</template>

<style scoped>
.sh {
  max-width: 760px;
  margin-bottom: 44px;
}

.sh--center {
  margin-inline: auto;
  text-align: center;
}

.sh__title {
  margin-top: 12px;
}

.sh__lede {
  margin-top: 16px;
}

.sh--light .sh__title {
  color: #fff;
}

.sh--light .sh__lede {
  color: #c6d6ef;
}
</style>
