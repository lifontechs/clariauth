export interface Faq {
  q: string
  a: string
  /** Shown on the homepage FAQ block as well as /faq */
  featured?: boolean
}

export const faqs: Faq[] = [
  {
    q: 'What exactly does ClariAuth do?',
    a: 'We handle the insurance-side administrative work that sits between a referral and delivered care: verifying eligibility and coverage, investigating benefits, researching whether a service requires prior authorization, preparing and submitting authorization requests where applicable, and following up with payers until each request reaches a decision.',
    featured: true,
  },
  {
    q: 'Are you a medical billing company?',
    a: 'No. Billing companies work primarily after the service — claims, posting, accounts receivable and collections. We work before and around the service, on eligibility, benefits and authorization. Many of our clients already have a billing partner or an internal billing team; we handle the front-end insurance operations that determine whether those claims are clean in the first place.',
    featured: true,
  },
  {
    q: 'Is this the same as hiring a virtual assistant?',
    a: 'No. A general virtual assistant is a flexible pair of hands across whatever tasks you assign. We are a specialist function: our people, checklists and quality process are built around one workflow — eligibility, benefits, authorization and payer follow-up — and around the payer-specific knowledge that workflow requires.',
    featured: true,
  },
  {
    q: 'Which healthcare specialties do you work with?',
    a: 'We support healthcare providers across the United States. We have particular experience in home health and radiology and imaging, and we also work with medical practices, therapy and rehabilitation providers, and other specialty healthcare organizations. If insurance verification or authorization is a recurring workload for you, the underlying process is the same.',
    featured: true,
  },
  {
    q: 'Do we have to change our software or systems?',
    a: 'No. We work inside the intake process and systems you already use, and report back in the format your team actually reads. We will agree how requests reach us and how results come back during onboarding — there is nothing new for your staff to learn.',
    featured: true,
  },
  {
    q: 'How does pricing work?',
    a: 'Pricing depends on volume, which services you need, the number of providers, turnaround requirements, whether you want dedicated or shared support, and the complexity of your workflow. Because those vary widely, we scope pricing after a short consultation rather than publishing a rate that would not apply to you. The consultation itself is free and carries no obligation.',
    featured: true,
  },
  {
    q: 'What is your turnaround time?',
    a: 'Turnaround is agreed with you up front and depends on the service and urgency. Routine eligibility checks are typically fastest; benefits investigation takes longer because it involves direct payer research; authorization timelines are ultimately governed by the payer’s own published timeframes. What we commit to is the speed of our part of the work and consistent follow-up on the part the payer controls.',
    featured: true,
  },
  {
    q: 'How do you handle protected health information?',
    a: 'We operate HIPAA-aware workflows. Access is limited to the minimum information a request requires, protected health information stays within approved systems rather than personal devices or general-purpose messaging, our team is trained on appropriate handling, and we will sign a Business Associate Agreement as part of onboarding. We are happy to walk through our specific handling practices during the consultation.',
    featured: true,
  },
  {
    q: 'Can you guarantee our authorizations will be approved?',
    a: 'No, and you should be cautious of anyone who does. Approval decisions belong to the payer and depend on clinical criteria we do not control. What we can commit to is that the request is complete, submitted against the payer’s current requirements, through the right channel, and actively followed up rather than left pending.',
    featured: true,
  },
  {
    q: 'Do you work with our existing billing company?',
    a: 'Yes, and it is a common arrangement. We handle the front-end insurance operations and pass verified eligibility, benefit detail and authorization information through to whoever bills the claim. Cleaner front-end information generally makes a billing partner more effective, not less.',
  },
  {
    q: 'Can you cover a vacancy or a temporary gap?',
    a: 'Yes. Covering a resignation, a leave of absence or a seasonal volume spike is one of the more common reasons providers contact us. Because the function is what we specialise in, we can usually take on a defined workload without a long ramp-up.',
  },
  {
    q: 'What do you need from us to get started?',
    a: 'A short consultation to understand your volumes, payers, services and current process; agreement on how requests reach us and how results come back; the access your workflow requires; and a Business Associate Agreement. We typically start with a defined scope — one service line, one payer group, or a fixed volume — so both sides can confirm the process works before expanding it.',
  },
  {
    q: 'Do you work with Medicare and Medicaid plans?',
    a: 'Yes. We work across commercial plans, Medicare Advantage and Medicaid managed care. These behave quite differently from one another — Advantage plans in particular apply authorization rules that traditional Medicare does not — which is precisely why requirements need to be researched at the plan level rather than assumed.',
  },
  {
    q: 'How do you report results back to us?',
    a: 'Every request comes back documented: what was verified or submitted, the outcome, reference and authorization numbers where available, approved units and date ranges, the source and date of verification, and clear flags on anything still outstanding or needing your team’s attention. The format and cadence are agreed with you during onboarding.',
  },
  {
    q: 'Where is your team located?',
    a: 'We are a United States–focused insurance operations company and our team works U.S. business hours aligned to your schedule. Specifics about team structure, coverage hours and how your work would be staffed are covered in the consultation.',
  },
]

export const featuredFaqs = faqs.filter((f) => f.featured)
