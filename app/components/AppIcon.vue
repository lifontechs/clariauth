<script setup lang="ts">
/**
 * Single inline-SVG icon set. Inlined rather than icon-font/sprite so icons
 * appear in the prerendered HTML with no extra request and no FOUC.
 * All paths are drawn on a 24x24 grid with a 1.7 stroke.
 */
const props = withDefaults(defineProps<{ name: string; size?: number | string }>(), {
  size: 24,
})

const paths: Record<string, string> = {
  // Core services
  shield: 'M12 3l7.5 3v5.4c0 4.5-3.1 8.2-7.5 9.6-4.4-1.4-7.5-5.1-7.5-9.6V6L12 3z M9 11.8l2.1 2.1L15.4 9.6',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M20 20l-4-4 M8.4 11h5.2 M11 8.4v5.2',
  check: 'M4.5 6.2A1.7 1.7 0 0 1 6.2 4.5h11.6a1.7 1.7 0 0 1 1.7 1.7v11.6a1.7 1.7 0 0 1-1.7 1.7H6.2a1.7 1.7 0 0 1-1.7-1.7V6.2z M8.4 12.1l2.5 2.5 4.7-5',
  portal: 'M3.5 6.2A1.7 1.7 0 0 1 5.2 4.5h13.6a1.7 1.7 0 0 1 1.7 1.7v11.6a1.7 1.7 0 0 1-1.7 1.7H5.2a1.7 1.7 0 0 1-1.7-1.7V6.2z M3.5 9h17 M6.4 6.75h.01 M8.9 6.75h.01 M8 12.6l2 2-2 2 M12.4 16.6h3.6',
  book: 'M5 4.5h9.5a2.5 2.5 0 0 1 2.5 2.5v12.5H7.5A2.5 2.5 0 0 1 5 17V4.5z M5 17a2.5 2.5 0 0 1 2.5-2.5H17 M8.6 8.4h5.2 M8.6 11.2h3.4',

  // Differentiators
  focus: 'M12 3.5v3 M12 17.5v3 M20.5 12h-3 M6.5 12h-3 M12 7.8a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4z M12 11.1a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8z',
  team: 'M9 11.2a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2z M2.8 19.2c0-3.1 2.8-5.2 6.2-5.2s6.2 2.1 6.2 5.2 M16.2 5.4a3 3 0 0 1 0 5.6 M17.4 14.4c2.3.6 3.8 2.2 3.8 4.4',
  workflow: 'M4.5 5.6h5.2v4.2H4.5z M14.3 14.2h5.2v4.2h-5.2z M9.7 7.7h3.1a2 2 0 0 1 2 2v4.5 M7.1 9.8v4.6a2 2 0 0 0 2 2h3',
  comms: 'M4.5 6.6a1.8 1.8 0 0 1 1.8-1.8h11.4a1.8 1.8 0 0 1 1.8 1.8v7.2a1.8 1.8 0 0 1-1.8 1.8H10l-4.2 3.4v-3.4h-.5a1.8 1.8 0 0 1-1.8-1.8V6.6z M8.2 9.1h7.6 M8.2 12.1h4.8',
  lock: 'M6.6 10.4h10.8a1.6 1.6 0 0 1 1.6 1.6v6a1.6 1.6 0 0 1-1.6 1.6H6.6A1.6 1.6 0 0 1 5 18v-6a1.6 1.6 0 0 1 1.6-1.6z M8.4 10.4V7.9a3.6 3.6 0 0 1 7.2 0v2.5 M12 14v2.2',
  scale: 'M4 19.5V13 M9.3 19.5V8.8 M14.7 19.5v-6.2 M20 19.5V4.5',
  clock: 'M12 4.2a7.8 7.8 0 1 0 0 15.6 7.8 7.8 0 0 0 0-15.6z M12 8.2V12l2.6 1.7',
  chart: 'M4.5 19.3h15 M7.6 19.3v-5.4 M11.9 19.3V8.6 M16.2 19.3v-8',

  // Industries
  home: 'M4.2 10.6 12 4.4l7.8 6.2v8.1a1.2 1.2 0 0 1-1.2 1.2h-3.9v-5.3H9.3v5.3H5.4a1.2 1.2 0 0 1-1.2-1.2v-8.1z',
  scan: 'M4 8.2V6a2 2 0 0 1 2-2h2.2 M15.8 4H18a2 2 0 0 1 2 2v2.2 M20 15.8V18a2 2 0 0 1-2 2h-2.2 M8.2 20H6a2 2 0 0 1-2-2v-2.2 M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  stethoscope: 'M6.2 4.4v4.3a3.6 3.6 0 0 0 7.2 0V4.4 M6.2 4.4H4.6 M13.4 4.4h1.6 M9.8 12.3v2.4a4.3 4.3 0 0 0 8.6 0v-1.3 M18.4 9.2a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2z',
  activity: 'M3.5 12.4h4l2.4-6.2 3.6 12L16 12.4h4.5',
  building: 'M5 20V5.6a1.2 1.2 0 0 1 1.2-1.2h7a1.2 1.2 0 0 1 1.2 1.2V20 M14.4 9.6h3.4a1.2 1.2 0 0 1 1.2 1.2V20 M3.6 20h16.8 M8 8.2h3.4 M8 12h3.4 M8 15.8h3.4',

  // UI
  arrowRight: 'M4.5 12h14.5 M13.4 6.5 19 12l-5.6 5.5',
  chevronDown: 'M6.5 9.5 12 15l5.5-5.5',
  menu: 'M4 7h16 M4 12h16 M4 17h16',
  close: 'M6 6l12 12 M18 6 6 18',
  mail: 'M3.8 7.2a1.7 1.7 0 0 1 1.7-1.7h13a1.7 1.7 0 0 1 1.7 1.7v9.6a1.7 1.7 0 0 1-1.7 1.7h-13a1.7 1.7 0 0 1-1.7-1.7V7.2z M4.4 7 12 12.6 19.6 7',
  linkedin: 'M6.9 9.6v8.6 M6.9 6.1v.02 M11 18.2V9.6 M11 13.5c0-2.2 1.3-3.4 3-3.4s3 1.2 3 3.4v4.7',
  alert: 'M12 4.6 3.6 19h16.8L12 4.6z M12 10v3.6 M12 16.4v.02',
}

const d = computed(() => paths[props.name] ?? paths.check)
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path v-for="(seg, i) in d.split(' M')" :key="i" :d="i === 0 ? seg : 'M' + seg" />
  </svg>
</template>
