<script setup lang="ts">
import type { Service } from '~/data/services'

defineProps<{ service: Service; compact?: boolean }>()
</script>

<template>
  <NuxtLink :to="`/services/${service.slug}`" class="card card--link svc">
    <span class="card__icon">
      <AppIcon :name="service.icon" :size="24" />
    </span>
    <h3>{{ service.name }}</h3>
    <p v-if="!compact">{{ service.summary }}</p>
    <span class="link-arrow svc__more">
      Learn more
      <AppIcon name="arrowRight" :size="16" />
    </span>
  </NuxtLink>
</template>

<style scoped>
.svc {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: inherit;
}

.svc h3 {
  color: var(--navy-800);
}

.svc p {
  color: var(--body);
  flex: 1;
}

.svc__more {
  margin-top: 18px;
}
</style>
