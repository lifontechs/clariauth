export interface Service {
  slug: string
  /** Short label for nav, cards and breadcrumbs */
  name: string
  /** Full H1 / page title form */
  title: string
  icon: string
  /** One sentence for cards and meta descriptions */
  summary: string
  /** Page-level intro paragraph */
  intro: string
  metaTitle: string
  metaDescription: string
  /** The business problem, in the buyer's words */
  problem: { heading: string; body: string; symptoms: string[] }
  /** What the service actually involves */
  includes: { title: string; body: string }[]
  /** What the provider receives back */
  deliverables: string[]
  /** How it changes the provider's day-to-day */
  workflow: { heading: string; body: string }
}

export const services: Service[] = [
  {
    slug: 'insurance-eligibility-verification',
    name: 'Insurance Eligibility Verification',
    title: 'Insurance Eligibility Verification',
    icon: 'shield',
    summary:
      'Active coverage and payer information confirmed before the visit, so your team is not discovering problems at check-in.',
    intro:
      'Eligibility is the first place a claim goes wrong. We confirm that coverage is active, that the payer and plan on file are the right ones, and that the patient’s information matches what the payer has — before the appointment, not after the denial.',
    metaTitle: 'Insurance Eligibility Verification Services',
    metaDescription:
      'Outsourced insurance eligibility verification for U.S. healthcare providers. We confirm active coverage, payer and plan details before the date of service.',
    problem: {
      heading: 'The problem this solves',
      body: 'Most eligibility failures are not complicated — they are simply caught too late. A plan terminated last month, the patient switched to a Medicare Advantage product, the payer ID on file belongs to a different plan under the same parent company. Each of those is quick to catch in advance and expensive to catch afterwards.',
      symptoms: [
        'Coverage found to be inactive after the service was delivered',
        'Claims rejected for wrong payer ID or wrong plan',
        'Front desk staff verifying eligibility between patients',
        'Secondary and tertiary coverage missed entirely',
        'Patients billed for services their plan never covered',
      ],
    },
    includes: [
      { title: 'Active coverage confirmation', body: 'We verify that the policy is active for the date of service, and flag termination dates and future effective dates that would affect the visit.' },
      { title: 'Payer and plan identification', body: 'We confirm the correct payer, plan type and payer ID — including the managed-care and Advantage products that are routinely mistaken for their parent plan.' },
      { title: 'Patient eligibility research', body: 'We check that the patient is eligible for the specific service or program in question, not just that they hold a card.' },
      { title: 'Demographic and policy matching', body: 'Where applicable, we confirm the demographic and policy details the payer holds, so mismatches are corrected before they cause a rejection.' },
      { title: 'Coordination of benefits', body: 'We identify secondary and tertiary coverage and the order in which plans should be billed.' },
      { title: 'Eligibility requirements research', body: 'Where a plan or program attaches conditions to eligibility, we research and document what those conditions are.' },
    ],
    deliverables: [
      'Confirmation of active coverage with effective and termination dates',
      'Verified payer, plan type and payer ID',
      'Policy and group numbers as held by the payer',
      'Secondary and tertiary coverage where it exists',
      'Source of verification and reference number where available',
      'Clear flags on anything that needs your team’s attention',
    ],
    workflow: {
      heading: 'How it fits your workflow',
      body: 'Eligibility checks run ahead of your schedule on the cadence you set — a day out, a week out, or at the point of referral. Your front desk stops verifying between patients, your billing team stops absorbing avoidable rejections, and your intake queue keeps moving.',
    },
  },
  {
    slug: 'benefits-verification',
    name: 'Benefits Verification & Investigation',
    title: 'Benefits Verification & Investigation',
    icon: 'search',
    summary:
      'Detailed benefit research — deductibles, co-insurance, limitations, exclusions and policy requirements — documented in a form your team can actually use.',
    intro:
      'Knowing a patient has coverage is not the same as knowing what that coverage will pay. Benefits investigation is the slower, more detailed work of establishing what the plan actually covers for the service you are about to deliver, what the patient will owe, and what conditions the policy attaches.',
    metaTitle: 'Benefits Verification & Investigation Services',
    metaDescription:
      'Insurance benefits verification and investigation for healthcare providers — deductibles, co-insurance, visit limits, exclusions and policy requirements.',
    problem: {
      heading: 'The problem this solves',
      body: 'Benefits investigation is the task that gets deferred. It takes real time on the phone or in a portal, it requires knowing which questions to ask for the specific service, and the answer is rarely on the first screen. So it gets skipped — and the cost shows up later as a write-off, a surprised patient, or a service delivered outside a limitation nobody checked.',
      symptoms: [
        'Patients quoted an estimate that turns out to be wrong',
        'Visit or unit limits discovered after they were exceeded',
        'Services delivered that the policy specifically excludes',
        'No reliable deductible or out-of-pocket figure at intake',
        'Benefit details captured inconsistently, or not documented at all',
      ],
    },
    includes: [
      { title: 'Coverage detail research', body: 'We establish what the plan covers for the specific service, place of service and provider type involved — not a generic benefit summary.' },
      { title: 'Deductible and out-of-pocket status', body: 'Individual and family deductible, amount met to date, co-insurance, copay and out-of-pocket maximum status.' },
      { title: 'Limitations and caps', body: 'Visit limits, unit limits, frequency restrictions, annual and lifetime maximums, and how much of each has already been used.' },
      { title: 'Exclusions', body: 'What the policy will not cover, including service-specific and diagnosis-specific exclusions that routinely surprise providers.' },
      { title: 'Policy requirements', body: 'Referral requirements, network status, medical necessity conditions, site-of-service rules and any documentation the plan will expect.' },
      { title: 'Payer-specific detail', body: 'The plan-level quirks that do not appear in a standard benefits response but determine whether a claim pays.' },
    ],
    deliverables: [
      'Service-specific benefit detail, not a generic summary',
      'Deductible, co-insurance, copay and out-of-pocket status',
      'Visit, unit and frequency limits with amounts used to date',
      'Documented exclusions and limitations',
      'Referral, network and medical-necessity requirements',
      'Reference number and source for every benefit quoted',
    ],
    workflow: {
      heading: 'How it fits your workflow',
      body: 'Your intake and financial counselling teams get a consistent, documented benefit picture before the patient is scheduled — so estimates hold up, limitations are known in advance, and nobody is reconstructing what was verified three months after the fact.',
    },
  },
  {
    slug: 'prior-authorization-support',
    name: 'Prior Authorization & Pre-Certification',
    title: 'Prior Authorization & Pre-Certification Support',
    icon: 'check',
    summary:
      'Requirements identified, requests prepared and submitted where applicable, and pending authorizations followed until they reach a decision.',
    intro:
      'Prior authorization is where administrative burden concentrates. It is not one task but a chain of them — determine whether authorization is required, find the current payer requirement, assemble what the payer wants, submit it the way that payer accepts, and then chase it. We handle that chain end to end.',
    metaTitle: 'Prior Authorization & Pre-Certification Support',
    metaDescription:
      'Prior authorization and pre-certification support for U.S. providers — requirement research, request submission, payer follow-up and status tracking.',
    problem: {
      heading: 'The problem this solves',
      body: 'Authorization work is high-volume, interruption-driven and unforgiving. One missed requirement delays a patient; one unchased pending request becomes a denial. It is also the role most exposed to turnover — when an experienced authorization coordinator leaves, the knowledge leaves with them.',
      symptoms: [
        'Services delayed or rescheduled waiting on authorization',
        'Requests submitted, then never followed up',
        'Denials for “no authorization on file” on services that qualified',
        'Peer-to-peer and additional-documentation requests missed',
        'Authorization knowledge concentrated in one person',
        'Staff on hold for an hour to check a single status',
      ],
    },
    includes: [
      { title: 'Requirement determination', body: 'We establish whether the specific service requires prior authorization under that payer, plan and place of service — before the request is prepared.' },
      { title: 'Payer requirement research', body: 'We research what the payer currently requires: clinical criteria, documentation, forms, submission channel and timeframes.' },
      { title: 'Request preparation and submission', body: 'Where applicable, we assemble the request against the payer’s criteria and submit it through the channel that payer accepts — portal, fax or phone.' },
      { title: 'Pending authorization follow-up', body: 'We track every pending request and follow up on a defined cadence until it reaches a decision, rather than waiting for the payer to come back.' },
      { title: 'Status checks', body: 'Authorization status confirmed on demand, with approval numbers, approved units, and effective and expiration dates.' },
      { title: 'Documentation support', body: 'We identify what additional documentation the payer is asking for and coordinate with your clinical team to get it submitted.' },
    ],
    deliverables: [
      'A clear answer on whether authorization is required',
      'Documented payer requirements and clinical criteria',
      'Submission confirmation with date, channel and reference number',
      'Authorization number, approved units and valid date range on approval',
      'Status updates on everything pending, on an agreed cadence',
      'Early warning on expiring authorizations and exhausted units',
    ],
    workflow: {
      heading: 'How it fits your workflow',
      body: 'Authorization stops being the thing that holds up your schedule. Requirements are known before scheduling, submissions go out promptly, pendings are actively worked, and your clinical staff are only pulled in when the payer genuinely needs clinical input.',
    },
  },
  {
    slug: 'payer-portal-follow-up',
    name: 'Payer Portal & Status Follow-Up',
    title: 'Payer Portal & Status Follow-Up',
    icon: 'portal',
    summary:
      'The portal checks, phone queues and follow-up calls that consume your team’s day — handled on a defined cadence, with results documented.',
    intro:
      'A large share of authorization and verification work is not decision-making. It is logging into portals, waiting on hold, checking whether anything changed, and recording what you found. That work still has to happen, it still has to be accurate, and it does not need to be done by your clinical or front-office staff.',
    metaTitle: 'Payer Portal Checks & Insurance Status Follow-Up',
    metaDescription:
      'Payer portal checks and authorization status follow-up for healthcare providers, on a defined cadence, with every result documented.',
    problem: {
      heading: 'The problem this solves',
      body: 'Follow-up is the first thing to slip when a team is busy, and the slip is invisible until it becomes a denial. Meanwhile the staff doing it are expensive, trained for other work, and interrupted constantly by the phone queue.',
      symptoms: [
        'Hold times eating hours of qualified staff time every week',
        'Follow-up that happens when someone remembers, not on a schedule',
        'Portal credentials and payer-specific processes known to one person',
        'Status information living in someone’s notebook or inbox',
        'Requests sitting in a payer queue that nobody is pushing',
      ],
    },
    includes: [
      { title: 'Scheduled portal checks', body: 'Routine checks across the payer portals you work with, on the cadence you set, so nothing sits unexamined.' },
      { title: 'Authorization status tracking', body: 'Every pending request tracked through to a decision, with escalation when a payer misses its own timeframe.' },
      { title: 'Eligibility and benefits research', body: 'Portal-based eligibility and benefit research for the plans that publish it, reducing time spent on the phone.' },
      { title: 'Payer communication', body: 'Phone follow-up, documentation submission and response to payer requests — conducted and documented on your behalf.' },
      { title: 'Consolidated reporting', body: 'One place where the current status of everything outstanding actually lives, updated on an agreed schedule.' },
    ],
    deliverables: [
      'Portal checks completed on the agreed cadence',
      'Current status of every outstanding item',
      'Dates, reference numbers and contacts for each follow-up',
      'Escalation when a payer misses its published timeframe',
      'A documented trail your team can pick up at any point',
    ],
    workflow: {
      heading: 'How it fits your workflow',
      body: 'Your staff stop living in payer portals and phone queues. Follow-up happens on a schedule rather than when someone finds a gap, and the current state of every pending item is visible without anyone reconstructing it.',
    },
  },
  {
    slug: 'authorization-requirements-research',
    name: 'Authorization Requirements Research',
    title: 'Authorization Requirements Research',
    icon: 'book',
    summary:
      'A definitive answer on whether a service needs authorization under a specific payer and plan — with the policy and documentation requirements behind it.',
    intro:
      'Before anything is submitted, someone has to answer a deceptively simple question: does this service, for this patient, under this plan, actually require prior authorization? Payer policies change, plan variants differ, and the answer that was right last quarter may not be right today. We research it properly and document the source.',
    metaTitle: 'Authorization Requirements Research by Payer & CPT',
    metaDescription:
      'Research on whether a service requires prior authorization — by payer, plan and CPT code — with policy guidelines and required documentation.',
    problem: {
      heading: 'The problem this solves',
      body: 'Teams guess, or they rely on a spreadsheet someone built two years ago. Both are expensive. Authorizing something that never needed it wastes time; missing one that did creates a denial that is difficult to appeal and a patient whose care was delayed.',
      symptoms: [
        'Internal payer grids that are out of date and nobody trusts',
        'Authorization obtained for services that never required it',
        'Denials for services the team believed were exempt',
        'No documented source when a payer disputes what was required',
        'New CPT codes or service lines with no requirement guidance',
      ],
    },
    includes: [
      { title: 'Authorization-required determination', body: 'A clear yes or no for the specific service, payer, plan and place of service — not a general rule of thumb.' },
      { title: 'CPT and service-specific research', body: 'Requirements researched at the code and service level, including the modifiers and site-of-service conditions that change the answer.' },
      { title: 'Payer policy and guideline research', body: 'The current medical policy, clinical criteria and coverage guideline that governs the decision.' },
      { title: 'Documentation requirements', body: 'What the payer will expect to see — clinical notes, imaging, conservative-treatment history, forms and letters of medical necessity.' },
      { title: 'Sourced and dated findings', body: 'Every determination recorded with where it came from and when it was checked, so it can be defended and refreshed.' },
    ],
    deliverables: [
      'A documented answer on whether authorization is required',
      'The governing payer policy or guideline, cited',
      'Clinical criteria the request will be measured against',
      'A list of documentation the payer expects',
      'The date the requirement was verified',
      'Requirement references your team can reuse across patients',
    ],
    workflow: {
      heading: 'How it fits your workflow',
      body: 'Scheduling and intake get a reliable answer up front instead of an educated guess. Over time, the research accumulates into current, sourced requirement references for the payers and services you handle most — rather than tribal knowledge held by one coordinator.',
    },
  },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)
