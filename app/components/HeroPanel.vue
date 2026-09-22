<script setup lang="ts">
/**
 * Visual anchor for the homepage hero.
 *
 * Deliberately rendered as a *returned verification result* rather than a
 * product dashboard: ClariAuth is a service, not software, and the thing a
 * provider actually receives is a documented answer. Built in markup rather
 * than as a photo so it stays crisp, weighs nothing, and shows the substance
 * of the work.
 *
 * The values below are illustrative sample content, not a real record.
 */
const fields = [
  { label: 'Payer', value: 'Commercial PPO' },
  { label: 'Plan type', value: 'Medicare Advantage' },
  { label: 'Service', value: 'MRI lumbar spine w/o contrast' },
]

const results = [
  { label: 'Coverage', value: 'Active', state: 'ok' as const },
  { label: 'Prior authorization', value: 'Required', state: 'flag' as const },
  { label: 'Authorization #', value: 'A-4471982', state: 'plain' as const },
  { label: 'Units approved', value: '1 study', state: 'plain' as const },
  { label: 'Valid through', value: '90 days from approval', state: 'plain' as const },
]
</script>

<template>
  <div class="panel-wrap">
    <div class="panel">
      <div class="panel__head">
        <div>
          <p class="panel__kicker">Verification result</p>
          <p class="panel__title">Returned to your team</p>
        </div>
        <span class="panel__stamp">
          <AppIcon name="check" :size="15" />
          Complete
        </span>
      </div>

      <dl class="panel__meta">
        <div v-for="f in fields" :key="f.label">
          <dt>{{ f.label }}</dt>
          <dd>{{ f.value }}</dd>
        </div>
      </dl>

      <hr class="panel__rule">

      <ul class="panel__results">
        <li v-for="r in results" :key="r.label">
          <span class="panel__label">{{ r.label }}</span>
          <span class="panel__value" :class="`is-${r.state}`">
            <span v-if="r.state === 'ok'" class="dot dot--ok" aria-hidden="true" />
            <span v-else-if="r.state === 'flag'" class="dot dot--flag" aria-hidden="true" />
            {{ r.value }}
          </span>
        </li>
      </ul>

      <p class="panel__foot">
        <AppIcon name="lock" :size="14" />
        Source and reference number documented · HIPAA-aware workflow
      </p>
    </div>
  </div>
</template>

<style scoped>
.panel-wrap {
  position: relative;
  max-width: 470px;
  margin-inline: auto;
}

/* soft brand glow behind the card */
.panel-wrap::before {
  content: '';
  position: absolute;
  inset: -14% -10% -8%;
  background: radial-gradient(60% 55% at 62% 38%, rgba(11, 79, 216, 0.16), transparent 70%);
  filter: blur(6px);
  z-index: 0;
}

.panel {
  position: relative;
  z-index: 1;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  padding: 26px 26px 22px;
}

.panel__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.panel__kicker {
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--blue-600);
}

.panel__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.08rem;
  color: var(--navy-800);
  margin-top: 3px;
}

.panel__stamp {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-display);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--success);
  background: #e9f7f1;
  border: 1px solid #c2e6d6;
  padding: 6px 11px;
  border-radius: 999px;
  white-space: nowrap;
}

.panel__meta {
  display: grid;
  gap: 11px;
}

.panel__meta div {
  display: grid;
  grid-template-columns: 104px minmax(0, 1fr);
  gap: 12px;
  align-items: baseline;
}

.panel__meta dt {
  font-size: 0.8rem;
  color: var(--muted);
}

.panel__meta dd {
  font-size: 0.89rem;
  font-weight: 500;
  color: var(--ink);
}

.panel__rule {
  height: 1px;
  background: var(--line);
  border: 0;
  margin-block: 18px;
}

.panel__results {
  display: grid;
  gap: 10px;
}

.panel__results li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.panel__label {
  font-size: 0.85rem;
  color: var(--body);
}

.panel__value {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--navy-800);
  text-align: right;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.dot--ok {
  background: var(--success);
  box-shadow: 0 0 0 3px rgba(15, 123, 82, 0.14);
}

.dot--flag {
  background: var(--blue-600);
  box-shadow: 0 0 0 3px rgba(11, 79, 216, 0.14);
}

.panel__foot {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid var(--line);
  font-size: 0.76rem;
  color: var(--muted);
}

.panel__foot svg {
  color: var(--blue-600);
  flex-shrink: 0;
}

@media (max-width: 620px) {
  .panel {
    padding: 22px 20px 18px;
  }
  .panel__meta div {
    grid-template-columns: 92px minmax(0, 1fr);
    gap: 10px;
  }
}
</style>
