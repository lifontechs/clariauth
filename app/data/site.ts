export const site = {
  name: 'ClariAuth',
  legalName: 'ClariAuth',
  tagline: 'Clearer Processes. Healthier Outcomes.',
  url: 'https://clariauth.com',
  email: 'info@clariauth.com',
  linkedin: 'https://www.linkedin.com/company/clariauth',
  /**
   * One-line description used for meta descriptions, JSON-LD and cold-outreach
   * landing context. Deliberately names the niche rather than "medical billing".
   */
  description:
    'ClariAuth provides insurance eligibility verification, benefits investigation, prior authorization support and payer follow-up for healthcare providers across the United States.',
  serviceArea: 'United States',
}

export const primaryNav = [
  { label: 'Services', to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

/**
 * Hero photograph.
 *
 * Drop a landscape image into `public/img/` and set `src` to its path — the
 * hero switches from the branded gradient panel to the photo automatically.
 * Aim for roughly 1400x1200 or larger; it is cropped with object-fit: cover
 * and anchored by `focus`, so keep the subject away from the left edge where
 * the copy column overlaps on smaller screens.
 */
export const heroImage = {
  src: '' as string,
  alt: 'A clinician reviewing patient insurance information on a laptop',
  /** object-position for the crop, e.g. 'center', '60% 40%' */
  focus: '58% 30%',
}

/** Handwritten accent line sitting over the hero image. */
export const heroScript = 'Behind Every Approval is a Healthier Tomorrow'

/**
 * The four benefit points running under the hero buttons. These are outcome
 * statements rather than guarantees — no approval rates, no revenue promises.
 */
export const heroProofPoints = [
  { icon: 'shield', title: 'Accurate Insurance\nInformation' },
  { icon: 'clock', title: 'Faster\nApprovals' },
  { icon: 'team', title: 'Fewer\nDenials' },
  { icon: 'chart', title: 'A More Efficient\nRevenue Cycle' },
]

export const differentiators = [
  {
    icon: 'focus',
    title: 'A specialist, not a generalist',
    body: 'We do not do everything. We do eligibility, benefits, authorizations and payer follow-up — which means our process, our checklists and our people are built around that one workflow.',
  },
  {
    icon: 'team',
    title: 'Experienced with U.S. payers',
    body: 'Commercial plans, Medicare Advantage and Medicaid managed care each behave differently. Our team works to payer-specific requirements rather than a single generic script.',
  },
  {
    icon: 'workflow',
    title: 'We adapt to your workflow',
    body: 'We work inside the systems and intake process you already use, and report back in the format your team actually reads — not a tool you have to learn.',
  },
  {
    icon: 'comms',
    title: 'Clear, documented communication',
    body: 'Every request comes back with what we confirmed, who we spoke to, reference numbers where available, and what happens next.',
  },
  {
    icon: 'lock',
    title: 'HIPAA-aware workflows',
    body: 'Access is limited to what a request requires, protected health information stays inside approved systems, and our team is trained on handling it appropriately.',
  },
  {
    icon: 'scale',
    title: 'Support that scales with volume',
    body: 'Cover a vacancy, absorb a seasonal spike, or add ongoing capacity as referral volume grows — without adding headcount.',
  },
]

/**
 * The operational problems our buyers recognise. Written as symptoms a Practice
 * Administrator would say out loud, not as service names.
 */
export const painPoints = [
  'Staff spending hours on hold with payers instead of on patients',
  'Authorizations discovered late — sometimes on the date of service',
  'Benefits quoted to patients that turn out to be wrong',
  'Pending authorizations that nobody has time to chase',
  'Referrals sitting in the queue waiting on eligibility checks',
  'Turnover in the authorization role leaving a gap nobody can fill',
  'Payer portal requirements that change without warning',
  'No clear record of what was verified, when, or by whom',
]

export const processSteps = [
  {
    number: '01',
    title: 'Send the request',
    body: 'You send patient, payer and service details through the intake method that suits your team — your system, a secure shared worklist, or a simple request form.',
    detail: ['Agreed intake method', 'Defined turnaround expectations', 'No new software for your staff to learn'],
  },
  {
    number: '02',
    title: 'We verify',
    body: 'We confirm eligibility and coverage, investigate benefits, and research whether the service requires authorization under that payer’s current policy.',
    detail: ['Coverage and eligibility confirmed', 'Benefit details investigated', 'Authorization requirements researched'],
  },
  {
    number: '03',
    title: 'We follow up',
    body: 'We prepare and submit authorization requests where applicable, then work payer portals, phone queues and fax follow-ups until the request reaches a decision.',
    detail: ['Submission where applicable', 'Portal and phone follow-up', 'Documentation requests handled'],
  },
  {
    number: '04',
    title: 'Results and updates',
    body: 'You receive a clear, documented result — status, authorization numbers, effective dates, units approved, and anything still outstanding.',
    detail: ['Documented outcome', 'Reference numbers where available', 'Clear next steps on anything pending'],
  },
]
