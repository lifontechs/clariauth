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
 * Value props shown under the hero. Each one is an operational statement we can
 * stand behind — no guaranteed approval rates or revenue claims.
 */
export const heroProofPoints = [
  { icon: 'shield', title: 'Accurate verification', body: 'Coverage and benefits confirmed at the source.' },
  { icon: 'clock', title: 'Consistent follow-up', body: 'Pending authorizations tracked until they close.' },
  { icon: 'portal', title: 'Payer portal fluency', body: 'We work the portals and phone queues for you.' },
  { icon: 'chart', title: 'Fewer surprises', body: 'Requirements caught before the date of service.' },
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
