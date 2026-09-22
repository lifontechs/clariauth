export interface Industry {
  slug: string
  name: string
  title: string
  icon: string
  /** true for the two lines we lead with in outreach */
  focus: boolean
  eyebrow: string
  summary: string
  intro: string
  metaTitle: string
  metaDescription: string
  challenges: { title: string; body: string }[]
  /** Service slugs most relevant to this specialty */
  relevantServices: string[]
  support: string[]
}

export const industries: Industry[] = [
  {
    slug: 'home-health',
    name: 'Home Health',
    title: 'Insurance & Authorization Support for Home Health Agencies',
    icon: 'home',
    focus: true,
    eyebrow: 'Area of particular experience',
    summary:
      'Episodic authorizations, visit-limit tracking and managed-care requirements handled so referrals convert to start of care without delay.',
    intro:
      'Home health lives on turnaround. A referral that sits waiting on eligibility or authorization is a referral that may go to another agency — and an episode that starts before the authorization is confirmed is revenue at risk. This is one of the specialties we have focused on most closely, because the authorization pattern is distinctive and unforgiving.',
    metaTitle: 'Home Health Authorization & Verification Support',
    metaDescription:
      'Eligibility verification, benefits investigation and prior authorization support for home health agencies — episodic authorizations and visit limits.',
    challenges: [
      { title: 'Referral-to-start-of-care speed', body: 'Eligibility and authorization have to clear fast enough to admit the patient while the referral is still live. Verification that takes days costs admissions.' },
      { title: 'Episodic and recurring authorizations', body: 'Authorizations are rarely one-and-done. Episodes recertify, visit counts get consumed, and each discipline may carry its own approved units and expiry.' },
      { title: 'Medicare Advantage complexity', body: 'Advantage plans apply their own authorization rules, visit limits and vendor delegations — often quite different from traditional Medicare for the same patient.' },
      { title: 'Multi-discipline coordination', body: 'Skilled nursing, physical therapy, occupational therapy, speech and aide services can each be authorized separately, with different unit counts and date ranges.' },
      { title: 'Expiry and unit exhaustion', body: 'Visits delivered after an authorization expires or after approved units run out are usually not recoverable. Tracking has to be proactive.' },
    ],
    relevantServices: [
      'insurance-eligibility-verification',
      'prior-authorization-support',
      'payer-portal-follow-up',
      'authorization-requirements-research',
    ],
    support: [
      'Eligibility verification at the point of referral',
      'Medicare Advantage and Medicaid managed-care requirement research',
      'Initial and recertification authorization requests',
      'Discipline-level unit and visit-limit tracking',
      'Proactive alerts before authorizations expire or units are exhausted',
      'Ongoing payer portal checks and status follow-up',
    ],
  },
  {
    slug: 'radiology-imaging',
    name: 'Radiology & Imaging',
    title: 'Prior Authorization Support for Radiology & Imaging',
    icon: 'scan',
    focus: true,
    eyebrow: 'Area of particular experience',
    summary:
      'High-volume advanced imaging authorizations, radiology benefit manager pathways and clinical-criteria requirements, handled at schedule speed.',
    intro:
      'Advanced imaging is among the most heavily managed services in U.S. healthcare. Most MRI, CT, PET and nuclear studies require authorization, many run through a radiology benefit manager rather than the plan itself, and the criteria are specific. Volume is high and the window between order and appointment is short — which is exactly why this is a specialty we have concentrated on.',
    metaTitle: 'Radiology & Imaging Prior Authorization Services',
    metaDescription:
      'Prior authorization support for radiology and imaging providers — advanced imaging, radiology benefit manager pathways and CPT-level requirements.',
    challenges: [
      { title: 'Volume against a short window', body: 'Imaging schedules turn over quickly. Authorization has to be resolved in the days between the order and the appointment, at a volume that is difficult to staff for.' },
      { title: 'Radiology benefit managers', body: 'Many plans delegate imaging authorization to a benefit manager with its own portal, criteria and submission process — a different pathway from the plan’s own authorization channel.' },
      { title: 'CPT-level requirements', body: 'Whether authorization is required often depends on the exact code, contrast, laterality and place of service. Code-level accuracy matters.' },
      { title: 'Clinical criteria and appropriateness', body: 'Approval frequently turns on documented conservative treatment, prior imaging or specific clinical indications that must be present in the submission.' },
      { title: 'Late cancellations and rescheduling', body: 'An unresolved authorization discovered on the day means an empty scanner slot and a patient who has to come back.' },
    ],
    relevantServices: [
      'authorization-requirements-research',
      'prior-authorization-support',
      'insurance-eligibility-verification',
      'payer-portal-follow-up',
    ],
    support: [
      'CPT-level authorization requirement research for advanced imaging',
      'Submissions through plan portals and radiology benefit managers',
      'Clinical criteria and documentation requirement identification',
      'Eligibility and benefits verification ahead of the appointment',
      'Daily status follow-up on pending studies',
      'Escalation on anything at risk of delaying a scheduled scan',
    ],
  },
  {
    slug: 'medical-practices',
    name: 'Medical Practices',
    title: 'Insurance Verification & Authorization Support for Medical Practices',
    icon: 'stethoscope',
    focus: false,
    eyebrow: 'Also supported',
    summary:
      'Primary care, specialty and multi-provider practices — eligibility, benefits and authorization handled alongside a busy front office.',
    intro:
      'In most practices the authorization work is absorbed by staff who are also running the front desk, answering the phone and rooming patients. It gets done between interruptions, which is why it is inconsistent. We take that workload off the desk without changing how your practice runs.',
    metaTitle: 'Prior Authorization Support for Medical Practices',
    metaDescription:
      'Eligibility verification, benefits investigation and prior authorization support for primary care, specialty and multi-provider medical practices.',
    challenges: [
      { title: 'Authorization competing with the front desk', body: 'The same staff handle check-in, phones and verification. Whichever is loudest wins, and verification is rarely the loudest.' },
      { title: 'Specialty-specific requirements', body: 'Procedures, injectables, DME, surgical services and advanced diagnostics each carry their own authorization rules and documentation expectations.' },
      { title: 'Multi-payer, multi-provider complexity', body: 'Different providers, contracts and locations mean requirements vary within the same practice for the same service.' },
      { title: 'Coverage of a single point of failure', body: 'Many practices depend on one person who knows the payers. Leave, illness or resignation leaves a gap immediately.' },
    ],
    relevantServices: [
      'insurance-eligibility-verification',
      'benefits-verification',
      'prior-authorization-support',
      'payer-portal-follow-up',
    ],
    support: [
      'Eligibility verification ahead of the schedule',
      'Benefits investigation for procedures and higher-cost services',
      'Authorization requirement research and submission',
      'Payer portal checks and pending follow-up',
      'Coverage during vacancies, leave and seasonal peaks',
      'Support across multiple providers and locations',
    ],
  },
  {
    slug: 'therapy-rehabilitation',
    name: 'Therapy & Rehabilitation',
    title: 'Authorization Support for Therapy & Rehabilitation Providers',
    icon: 'activity',
    focus: false,
    eyebrow: 'Also supported',
    summary:
      'Visit-limit tracking, recurring authorization renewals and progress-documentation requirements for PT, OT and speech providers.',
    intro:
      'Therapy is authorized in increments. Plans approve a set number of visits over a set period, expect progress documentation to extend them, and apply annual caps that are easy to overrun. The administrative pattern is continuous rather than one-off, which makes consistent tracking the whole game.',
    metaTitle: 'Therapy & Rehabilitation Prior Authorization Support',
    metaDescription:
      'Prior authorization and benefits verification for physical, occupational and speech therapy providers — visit limits, renewals and documentation.',
    challenges: [
      { title: 'Visit limits and annual caps', body: 'Benefits are capped by visit count, dollar amount or both. Knowing how much has already been used — including by another provider — determines what you can deliver.' },
      { title: 'Recurring re-authorization', body: 'Approvals cover a window. Extending care means a new request, on time, with current documentation, before the existing authorization runs out.' },
      { title: 'Progress documentation requirements', body: 'Continued approval usually depends on objective progress measures presented the way the payer expects.' },
      { title: 'Multi-discipline plans of care', body: 'PT, OT and speech are frequently authorized separately, each with its own units, dates and renewal cycle.' },
    ],
    relevantServices: [
      'benefits-verification',
      'prior-authorization-support',
      'payer-portal-follow-up',
      'insurance-eligibility-verification',
    ],
    support: [
      'Visit and unit limit verification, including amounts already used',
      'Initial authorization requests and timely renewals',
      'Documentation requirement identification for continued care',
      'Discipline-level tracking across PT, OT and speech',
      'Alerts ahead of expiry and cap exhaustion',
      'Ongoing payer follow-up on pending requests',
    ],
  },
  {
    slug: 'other-healthcare-organizations',
    name: 'Other Healthcare Organizations',
    title: 'Insurance Operations Support for Other Healthcare Organizations',
    icon: 'building',
    focus: false,
    eyebrow: 'Also supported',
    summary:
      'Behavioral health, infusion, DME, surgical and other specialty organizations with recurring eligibility, benefits or authorization workload.',
    intro:
      'The specialties above are where we have spent the most time, but the underlying work is the same wherever insurance sits between a provider and the care they deliver. If your organization carries a recurring eligibility, benefits or authorization workload, it is worth a conversation.',
    metaTitle: 'Support for Other Healthcare Organizations',
    metaDescription:
      'Eligibility, benefits and prior authorization support for behavioral health, infusion, DME, surgical and other specialty healthcare organizations.',
    challenges: [
      { title: 'Specialty-specific payer rules', body: 'Behavioral health, infusion and DME each carry distinctive authorization pathways, units of measure and documentation expectations.' },
      { title: 'High-cost services under scrutiny', body: 'Infusion therapy, specialty drugs and surgical services attract detailed clinical review and benefit investigation before approval.' },
      { title: 'Recurring and concurrent review', body: 'Ongoing treatment often requires continued authorization at intervals, with clinical updates at each point.' },
      { title: 'Growth outpacing administrative capacity', body: 'Volume rises faster than you can recruit and train experienced authorization staff.' },
    ],
    relevantServices: [
      'insurance-eligibility-verification',
      'benefits-verification',
      'prior-authorization-support',
      'authorization-requirements-research',
    ],
    support: [
      'Eligibility and benefits verification for specialty services',
      'Authorization requirement research for your service lines',
      'Request preparation, submission and follow-up',
      'Concurrent and continued-authorization support',
      'Payer portal checks on a defined cadence',
      'Capacity that scales with volume rather than headcount',
    ],
  },
]

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug)
export const focusIndustries = industries.filter((i) => i.focus)
