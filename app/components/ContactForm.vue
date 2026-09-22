<script setup lang="ts">
import { site } from '~/data/site'
import { services } from '~/data/services'
import { industries } from '~/data/industries'

/**
 * Lead capture form.
 *
 * There is no backend in this static build, so the form posts to a configurable
 * endpoint. Set NUXT_PUBLIC_FORM_ENDPOINT (Formspree, HubSpot, Netlify Forms,
 * your CRM, etc.) at build time. Until one is set the form falls back to a
 * prefilled mailto: so no lead is ever silently dropped.
 */
const config = useRuntimeConfig()
const endpoint = computed(() => config.public.formEndpoint as string)

const form = reactive({
  name: '',
  organization: '',
  email: '',
  phone: '',
  industry: '',
  services: [] as string[],
  volume: '',
  message: '',
  // Honeypot — real users never fill this
  website: '',
})

const errors = reactive<Record<string, string>>({})
const submitting = ref(false)
const submitError = ref('')

const industryOptions = [...industries.map((i) => i.name), 'Behavioral Health', 'Infusion', 'DME', 'Other']

const volumeOptions = [
  'Not sure yet',
  'Under 100 requests / month',
  '100–500 requests / month',
  '500–2,000 requests / month',
  'Over 2,000 requests / month',
]

/** Basic shape check — deliberately permissive, the server should validate too. */
const emailLooksValid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k])

  if (!form.name.trim()) errors.name = 'Please enter your name.'
  if (!form.organization.trim()) errors.organization = 'Please enter your organization.'
  if (!form.email.trim()) errors.email = 'Please enter your work email.'
  else if (!emailLooksValid(form.email)) errors.email = 'Please enter a valid email address.'
  if (!form.message.trim()) errors.message = 'Please tell us briefly what you need help with.'

  return Object.keys(errors).length === 0
}

function mailtoFallback() {
  const lines = [
    `Name: ${form.name}`,
    `Organization: ${form.organization}`,
    `Work email: ${form.email}`,
    `Phone: ${form.phone || '—'}`,
    `Specialty / industry: ${form.industry || '—'}`,
    `Services needed: ${form.services.join(', ') || '—'}`,
    `Approximate volume: ${form.volume || '—'}`,
    '',
    form.message,
  ]
  return `mailto:${site.email}?subject=${encodeURIComponent(
    `Consultation request — ${form.organization || form.name}`,
  )}&body=${encodeURIComponent(lines.join('\n'))}`
}

async function onSubmit() {
  submitError.value = ''
  if (form.website) return // honeypot tripped
  if (!validate()) {
    // Move focus to the first field with an error for keyboard/screen-reader users
    await nextTick()
    document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
    return
  }

  submitting.value = true
  try {
    if (endpoint.value) {
      const res = await $fetch.raw(endpoint.value, {
        method: 'POST',
        body: { ...form, website: undefined, source: 'clariauth.com/contact' },
      })
      if (res.status >= 400) throw new Error(`Request failed (${res.status})`)
      await navigateTo('/thank-you')
    } else {
      // No endpoint configured — hand off to the visitor's mail client.
      window.location.href = mailtoFallback()
    }
  } catch {
    submitError.value =
      'We could not submit the form just now. Please email us directly at ' + site.email + '.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <form class="cform" novalidate @submit.prevent="onSubmit">
    <div class="cform__grid">
      <div class="field">
        <label for="cf-name">Name <span class="req" aria-hidden="true">*</span></label>
        <input
          id="cf-name"
          v-model="form.name"
          type="text"
          autocomplete="name"
          :aria-invalid="!!errors.name"
          :aria-describedby="errors.name ? 'err-name' : undefined"
          required
        >
        <p v-if="errors.name" id="err-name" class="field__err">{{ errors.name }}</p>
      </div>

      <div class="field">
        <label for="cf-org">Organization <span class="req" aria-hidden="true">*</span></label>
        <input
          id="cf-org"
          v-model="form.organization"
          type="text"
          autocomplete="organization"
          :aria-invalid="!!errors.organization"
          :aria-describedby="errors.organization ? 'err-org' : undefined"
          required
        >
        <p v-if="errors.organization" id="err-org" class="field__err">{{ errors.organization }}</p>
      </div>

      <div class="field">
        <label for="cf-email">Work email <span class="req" aria-hidden="true">*</span></label>
        <input
          id="cf-email"
          v-model="form.email"
          type="email"
          autocomplete="email"
          inputmode="email"
          :aria-invalid="!!errors.email"
          :aria-describedby="errors.email ? 'err-email' : undefined"
          required
        >
        <p v-if="errors.email" id="err-email" class="field__err">{{ errors.email }}</p>
      </div>

      <div class="field">
        <label for="cf-phone">Phone</label>
        <input id="cf-phone" v-model="form.phone" type="tel" autocomplete="tel" inputmode="tel">
      </div>

      <div class="field">
        <label for="cf-industry">Specialty / industry</label>
        <select id="cf-industry" v-model="form.industry">
          <option value="">Select one</option>
          <option v-for="o in industryOptions" :key="o" :value="o">{{ o }}</option>
        </select>
      </div>

      <div class="field">
        <label for="cf-volume">Approximate monthly volume</label>
        <select id="cf-volume" v-model="form.volume">
          <option value="">Select one</option>
          <option v-for="o in volumeOptions" :key="o" :value="o">{{ o }}</option>
        </select>
      </div>
    </div>

    <fieldset class="field field--full fieldset">
      <legend>Services needed</legend>
      <div class="checks">
        <label v-for="s in services" :key="s.slug" class="check">
          <input v-model="form.services" type="checkbox" :value="s.name">
          <span>{{ s.name }}</span>
        </label>
      </div>
    </fieldset>

    <div class="field field--full">
      <label for="cf-message">
        How can we help? <span class="req" aria-hidden="true">*</span>
      </label>
      <textarea
        id="cf-message"
        v-model="form.message"
        rows="5"
        placeholder="Tell us about your current process, the payers you work with, and where your team is spending the most time."
        :aria-invalid="!!errors.message"
        :aria-describedby="errors.message ? 'err-message' : undefined"
        required
      />
      <p v-if="errors.message" id="err-message" class="field__err">{{ errors.message }}</p>
    </div>

    <!-- Honeypot: visually and programmatically hidden from real users -->
    <div class="hp" aria-hidden="true">
      <label for="cf-website">Website</label>
      <input id="cf-website" v-model="form.website" type="text" tabindex="-1" autocomplete="off">
    </div>

    <p v-if="submitError" class="cform__error" role="alert">
      <AppIcon name="alert" :size="18" />
      <span>{{ submitError }}</span>
    </p>

    <div class="cform__actions">
      <button type="submit" class="btn btn--primary btn--lg" :disabled="submitting">
        {{ submitting ? 'Sending…' : 'Request a Consultation' }}
      </button>
      <p class="cform__note">
        No obligation. We’ll reply with next steps, not a sales sequence.
      </p>
    </div>

    <p class="cform__privacy">
      Please do not include protected health information in this form. We’ll set up an appropriate
      channel for that once we’re working together.
    </p>
  </form>
</template>

<style scoped>
.cform__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.field {
  display: grid;
  gap: 7px;
}

.field--full {
  margin-top: 18px;
}

.field label,
.fieldset legend {
  font-family: var(--font-display);
  font-size: 0.87rem;
  font-weight: 600;
  color: var(--navy-800);
}

/* Required-field asterisk only — must not colour checkbox label text. */
.req {
  color: var(--blue-600);
}

input[type='text'],
input[type='email'],
input[type='tel'],
select,
textarea {
  width: 100%;
  padding: 13px 15px;
  border: 1.5px solid var(--line-strong);
  border-radius: var(--radius);
  background: #fff;
  font-size: 0.97rem;
  font-family: var(--font-body);
  color: var(--ink);
  transition: border-color 0.16s var(--ease), box-shadow 0.16s var(--ease);
}

textarea {
  resize: vertical;
  min-height: 130px;
  line-height: 1.55;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%236b7c94' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6.5 9.5 12 15l5.5-5.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 13px center;
  padding-right: 42px;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--blue-600);
  box-shadow: 0 0 0 4px rgba(11, 79, 216, 0.12);
}

[aria-invalid='true'] {
  border-color: #c0392b;
}

.field__err {
  font-size: 0.83rem;
  color: #c0392b;
}

.fieldset {
  border: 0;
  padding: 0;
  margin-inline: 0;
}

.fieldset legend {
  padding: 0;
  margin-bottom: 11px;
}

.checks {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 18px;
}

/* Scoped as `.checks .check` so it outranks the `.field label` rule above —
   these are option labels, not field labels, and must not inherit its
   display-font/navy/600 treatment. */
.checks .check {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-family: var(--font-body);
  font-size: 0.93rem;
  font-weight: 400;
  color: var(--body);
  cursor: pointer;
  line-height: 1.4;
}

.checks .check input {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  accent-color: var(--blue-600);
  flex-shrink: 0;
  cursor: pointer;
}

.hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.cform__error {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 20px;
  padding: 14px 16px;
  border-radius: var(--radius);
  background: #fdf1ef;
  border: 1px solid #f3c9c2;
  color: #a5301f;
  font-size: 0.93rem;
}

.cform__error svg {
  flex-shrink: 0;
  margin-top: 2px;
}

.cform__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 26px;
}

.cform__note {
  font-size: 0.88rem;
  color: var(--muted);
}

.cform__privacy {
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  font-size: 0.84rem;
  color: var(--muted);
  max-width: 62ch;
}

button[disabled] {
  opacity: 0.65;
  cursor: progress;
}

@media (max-width: 620px) {
  .cform__grid,
  .checks {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
