<script setup lang="ts">
/**
 * Leads inbox, reached at /inbox/<NUXT_ADMIN_TOKEN>.
 *
 * The secret is the URL itself. The server endpoint re-checks it and answers
 * 404 on anything wrong, so a bad token here is indistinguishable from a page
 * that does not exist. The page is excluded from prerendering, the sitemap and
 * robots, and carries noindex headers from nuxt.config.
 *
 * This is deliberately a thin viewer, not an account system: no cookies, no
 * session, nothing stored in the browser. Treat the URL as a password —
 * anyone who has it can read every submission.
 */
const route = useRoute()
const token = computed(() => String(route.params.token || ''))

const { data, error, pending, refresh } = await useFetch('/api/submissions', {
  query: { token },
  // The token belongs in the request, never in a cache key shared with others.
  key: 'inbox-submissions',
  server: true,
})

// A wrong token answers 404 from the API; mirror that so the page is a 404 too.
if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useHead({
  title: 'Leads inbox',
  meta: [{ name: 'robots', content: 'noindex, nofollow, noarchive' }],
})

const submissions = computed(() => data.value?.submissions ?? [])
const total = computed(() => data.value?.total ?? 0)

const expanded = ref<number | null>(submissions.value[0]?.id ?? null)
const toggle = (id: number) => (expanded.value = expanded.value === id ? null : id)

const fmt = (iso: string) => {
  // SQLite stores UTC without a zone marker; make that explicit before parsing.
  const d = new Date(iso.includes('T') ? iso : iso.replace(' ', 'T') + 'Z')
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
}
</script>

<template>
  <div class="inbox">
    <header class="inbox__bar">
      <div class="container inbox__bar-inner">
        <div>
          <p class="inbox__kicker">ClariAuth</p>
          <h1 class="inbox__title">Leads inbox</h1>
        </div>
        <div class="inbox__meta">
          <span class="inbox__count">{{ total }} {{ total === 1 ? 'submission' : 'submissions' }}</span>
          <button class="inbox__refresh" type="button" :disabled="pending" @click="refresh()">
            {{ pending ? 'Refreshing…' : 'Refresh' }}
          </button>
        </div>
      </div>
    </header>

    <main class="container inbox__main">
      <p v-if="!submissions.length" class="inbox__empty">
        No submissions yet. They will appear here as soon as the contact form is used.
      </p>

      <ol v-else class="inbox__list">
        <li v-for="s in submissions" :key="s.id" class="lead">
          <button class="lead__head" type="button" @click="toggle(s.id)">
            <span class="lead__who">
              <strong>{{ s.organization || s.name }}</strong>
              <span class="lead__name">{{ s.name }}</span>
            </span>
            <span class="lead__tags">
              <span v-if="s.industry" class="chip">{{ s.industry }}</span>
              <span v-if="s.volume" class="chip chip--quiet">{{ s.volume }}</span>
              <span v-if="!s.emailSent" class="chip chip--warn" title="Stored, but no notification email was sent">
                not emailed
              </span>
            </span>
            <span class="lead__when">{{ fmt(s.createdAt) }}</span>
          </button>

          <div v-if="expanded === s.id" class="lead__body">
            <dl class="lead__fields">
              <div>
                <dt>Email</dt>
                <dd><a :href="`mailto:${s.email}`">{{ s.email }}</a></dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{{ s.phone || '—' }}</dd>
              </div>
              <div>
                <dt>Services needed</dt>
                <dd>{{ s.services.length ? s.services.join(', ') : '—' }}</dd>
              </div>
              <div>
                <dt>Source</dt>
                <dd>{{ s.source || '—' }}</dd>
              </div>
            </dl>

            <p class="lead__label">Message</p>
            <p class="lead__message">{{ s.message }}</p>

            <a :href="`mailto:${s.email}?subject=${encodeURIComponent('Re: your ClariAuth enquiry')}`" class="lead__reply">
              Reply to {{ s.name }}
            </a>
          </div>
        </li>
      </ol>

      <p class="inbox__note">
        This page is reachable by its URL alone — treat it like a password. It is excluded from
        search engines, but anyone holding the link can read every submission.
      </p>
    </main>
  </div>
</template>

<style scoped>
.inbox {
  min-height: 100dvh;
  background: #f6f9fd;
  font-family: 'Inter', system-ui, sans-serif;
  color: #46566e;
}

.inbox__bar {
  background: #0a1e46;
  color: #fff;
  padding-block: 22px;
}

.inbox__bar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.inbox__kicker {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #8fb0e4;
  font-weight: 700;
}

.inbox__title {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  font-size: 1.5rem;
  color: #fff;
  margin-top: 2px;
}

.inbox__meta {
  display: flex;
  align-items: center;
  gap: 14px;
}

.inbox__count {
  font-size: 0.9rem;
  color: #c6d6ef;
}

.inbox__refresh {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: #fff;
  border-radius: 8px;
  padding: 8px 15px;
  font-size: 0.87rem;
  font-weight: 600;
  cursor: pointer;
}

.inbox__refresh:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
}

.inbox__refresh:disabled {
  opacity: 0.6;
  cursor: progress;
}

.inbox__main {
  padding-block: 32px 60px;
}

.inbox__empty {
  background: #fff;
  border: 1px solid #e3e9f2;
  border-radius: 14px;
  padding: 40px;
  text-align: center;
  color: #6b7c94;
}

.inbox__list {
  display: grid;
  gap: 10px;
  list-style: none;
  padding: 0;
}

.lead {
  background: #fff;
  border: 1px solid #e3e9f2;
  border-radius: 12px;
  overflow: hidden;
}

.lead__head {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 16px;
  align-items: center;
  padding: 16px 20px;
  background: none;
  border: 0;
  cursor: pointer;
  text-align: left;
  font: inherit;
}

.lead__head:hover {
  background: #f9fbfe;
}

.lead__who {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.lead__who strong {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  color: #0a1e46;
  font-size: 0.99rem;
}

.lead__name {
  font-size: 0.85rem;
  color: #6b7c94;
}

.lead__tags {
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
}

.chip {
  font-size: 0.74rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
  background: #eff5ff;
  color: #0a3fb0;
  border: 1px solid #dde9fe;
  white-space: nowrap;
}

.chip--quiet {
  background: #f3f6fa;
  color: #6b7c94;
  border-color: #e3e9f2;
}

.chip--warn {
  background: #fdf3e9;
  color: #b3691a;
  border-color: #f0dcb8;
}

.lead__when {
  font-size: 0.82rem;
  color: #6b7c94;
  white-space: nowrap;
}

.lead__body {
  padding: 4px 20px 20px;
  border-top: 1px solid #eef2f8;
}

.lead__fields {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 14px 24px;
  margin-block: 18px;
}

.lead__fields dt {
  font-size: 0.74rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6b7c94;
  margin-bottom: 3px;
}

.lead__fields dd {
  margin: 0;
  font-size: 0.93rem;
  color: #0e1a2f;
  overflow-wrap: anywhere;
}

.lead__label {
  font-size: 0.74rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #6b7c94;
  margin-bottom: 6px;
}

.lead__message {
  white-space: pre-wrap;
  background: #f6f9fd;
  border: 1px solid #e3e9f2;
  border-radius: 10px;
  padding: 14px 16px;
  font-size: 0.94rem;
  line-height: 1.6;
  color: #0e1a2f;
}

.lead__reply {
  display: inline-block;
  margin-top: 16px;
  background: #0b4fd8;
  color: #fff;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 10px 18px;
  border-radius: 9px;
  text-decoration: none;
}

.lead__reply:hover {
  background: #0a3fb0;
}

.inbox__note {
  margin-top: 28px;
  font-size: 0.84rem;
  color: #6b7c94;
  max-width: 70ch;
}

.container {
  width: 100%;
  max-width: 1100px;
  margin-inline: auto;
  padding-inline: 24px;
}

@media (max-width: 700px) {
  .lead__head {
    grid-template-columns: minmax(0, 1fr);
    gap: 10px;
  }
  .lead__when {
    font-size: 0.78rem;
  }
}
</style>
