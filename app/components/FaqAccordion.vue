<script setup lang="ts">
import type { Faq } from '~/data/faqs'

defineProps<{ items: Faq[] }>()
</script>

<template>
  <div class="faqs">
    <details v-for="(item, i) in items" :key="i" class="faq" :open="i === 0">
      <summary class="faq__q">
        <span>{{ item.q }}</span>
        <AppIcon name="chevronDown" :size="20" class="faq__chev" />
      </summary>
      <div class="faq__a">
        <p>{{ item.a }}</p>
      </div>
    </details>
  </div>
</template>

<style scoped>
.faqs {
  display: grid;
  gap: 12px;
}

.faq {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: border-color 0.2s var(--ease), box-shadow 0.2s var(--ease);
}

.faq[open] {
  border-color: var(--blue-200);
  box-shadow: var(--shadow-sm);
}

.faq__q {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  padding: 20px 24px;
  cursor: pointer;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.03rem;
  line-height: 1.4;
  color: var(--navy-800);
  list-style: none;
}

.faq__q::-webkit-details-marker {
  display: none;
}

.faq__q:hover {
  color: var(--blue-700);
}

.faq__chev {
  flex-shrink: 0;
  color: var(--blue-600);
  margin-top: 2px;
  transition: transform 0.22s var(--ease);
}

.faq[open] .faq__chev {
  transform: rotate(180deg);
}

.faq__a {
  padding: 0 24px 22px;
}

.faq__a p {
  max-width: 78ch;
  font-size: 0.99rem;
}

@media (max-width: 560px) {
  .faq__q {
    padding: 17px 18px;
    font-size: 0.99rem;
  }
  .faq__a {
    padding: 0 18px 18px;
  }
}
</style>
