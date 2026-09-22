<script setup lang="ts">
import { processSteps } from '~/data/site'

withDefaults(defineProps<{ detailed?: boolean }>(), { detailed: false })
</script>

<template>
  <ol class="steps" :class="{ 'steps--detailed': detailed }">
    <li v-for="step in processSteps" :key="step.number" class="step">
      <div class="step__rail" aria-hidden="true">
        <span class="step__num">{{ step.number }}</span>
      </div>
      <div class="step__body">
        <h3>{{ step.title }}</h3>
        <p>{{ step.body }}</p>
        <ul v-if="detailed" class="checklist step__detail">
          <li v-for="d in step.detail" :key="d">{{ d }}</li>
        </ul>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.steps {
  display: grid;
  gap: 0;
}

.step {
  display: grid;
  grid-template-columns: 76px minmax(0, 1fr);
  gap: 24px;
}

.step__rail {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step__num {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.02rem;
  letter-spacing: 0.02em;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #fff;
  color: var(--blue-600);
  border: 1.5px solid var(--blue-100);
  box-shadow: var(--shadow-xs);
  flex-shrink: 0;
}

/* Connector line between steps */
.step:not(:last-child) .step__rail::after {
  content: '';
  flex: 1;
  width: 2px;
  background: linear-gradient(180deg, var(--blue-100), var(--line));
  margin-block: 8px;
  border-radius: 2px;
}

.step__body {
  padding-bottom: 38px;
}

.step:last-child .step__body {
  padding-bottom: 0;
}

.step__body h3 {
  color: var(--navy-800);
  margin-bottom: 8px;
  padding-top: 12px;
}

.step__body p {
  max-width: 62ch;
}

.step__detail {
  margin-top: 16px;
}

@media (max-width: 560px) {
  .step {
    grid-template-columns: 58px minmax(0, 1fr);
    gap: 16px;
  }
  .step__num {
    width: 46px;
    height: 46px;
    font-size: 0.92rem;
  }
}
</style>
