/**
 * Progressive-enhancement motion layer.
 *
 * Nothing here is required for the page to be readable. The reveal styles in
 * main.css are scoped to `html.js-anim`, and this plugin is the only thing
 * that adds that class — so without JavaScript, for a crawler, or in the
 * offline preview, every element renders in its final visible state.
 *
 * It also declines to run entirely when the visitor prefers reduced motion.
 */
export default defineNuxtPlugin(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (reduced.matches) return

  const root = document.documentElement
  root.classList.add('js-anim')

  let observer: IntersectionObserver | null = null

  const observe = () => {
    const targets = document.querySelectorAll('[data-reveal], [data-reveal-group]')
    if (!targets.length) return

    observer ??= new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          // One-shot: nothing re-hides on scroll back up.
          observer?.unobserve(entry.target)
        }
      },
      // Start slightly before the element reaches the fold so the motion has
      // finished by the time it is properly in view.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )

    targets.forEach((el) => {
      if (!el.classList.contains('is-in')) observer!.observe(el)
    })
  }

  // Anything already on screen at load should not wait for a scroll event.
  const header = document.querySelector('.hdr')
  const onScroll = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 8)
  }

  const router = useRouter()
  router.afterEach(() => nextTick(observe))

  onNuxtReady(() => {
    observe()
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  // If the visitor turns reduced motion on mid-session, stop revealing and
  // make sure nothing is left stuck at opacity 0.
  reduced.addEventListener?.('change', (e) => {
    if (!e.matches) return
    observer?.disconnect()
    root.classList.remove('js-anim')
  })
})
