<script setup lang="ts">
import { site } from '~/data/site'

useSeo({
  title: 'Privacy Policy',
  description:
    'How ClariAuth collects, uses and protects information submitted through clariauth.com, and how protected health information is handled under our client agreements.',
})

useBreadcrumbs([{ label: 'Privacy Policy', to: '/privacy-policy' }])

const updated = 'September 2026'
</script>

<template>
  <div>
    <PageHero title="Privacy Policy" current="Privacy Policy">
      <p class="text-muted mt-3">Last updated: {{ updated }}</p>
    </PageHero>

    <section class="section">
      <div class="container container--narrow prose">
        <div class="notice">
          <AppIcon name="alert" :size="20" />
          <p>
            This page is a starting template. Have it reviewed by counsel familiar with HIPAA and
            applicable state privacy law before the site goes live, and update it to match your
            actual data practices, hosting arrangements and analytics setup.
          </p>
        </div>

        <h2>Who we are</h2>
        <p>
          {{ site.legalName }} (“ClariAuth”, “we”, “us”) provides insurance-related administrative
          support services to healthcare providers in the United States. This policy explains how
          we handle information collected through {{ site.url }}.
        </p>

        <h2>Information we collect through this website</h2>
        <p>When you submit our contact form or email us, we collect the information you provide, which may include:</p>
        <ul>
          <li>Your name and job role</li>
          <li>Your organization’s name</li>
          <li>Your work email address and phone number</li>
          <li>Your specialty or industry, and the services you are interested in</li>
          <li>Any other information you choose to include in your message</li>
        </ul>
        <p>
          We also collect limited technical information automatically, such as your IP address,
          browser type and the pages you visit, in order to operate and secure the site.
        </p>

        <h2>Protected health information</h2>
        <p>
          <strong>Do not submit protected health information (PHI) through this website.</strong>
          Our contact form is not an appropriate channel for patient information. Where ClariAuth
          handles PHI in the course of providing services to a client, that handling is governed by
          our services agreement and a Business Associate Agreement, not by this website policy.
        </p>

        <h2>How we use information</h2>
        <ul>
          <li>To respond to your enquiry and arrange a consultation</li>
          <li>To provide information about our services that you have requested</li>
          <li>To operate, secure, maintain and improve this website</li>
          <li>To comply with legal obligations</li>
        </ul>
        <p>
          We do not sell your information. We do not use information submitted through this site
          for unrelated marketing without your consent.
        </p>

        <h2>Sharing</h2>
        <p>We share information only with:</p>
        <ul>
          <li>Service providers who support our website, email and business operations, under appropriate contractual obligations</li>
          <li>Professional advisers, where necessary</li>
          <li>Authorities, where we are legally required to do so</li>
        </ul>

        <h2>Retention</h2>
        <p>
          We retain enquiry information for as long as needed to respond to you and to maintain
          ordinary business records, then delete it or retain it in aggregate form.
        </p>

        <h2>Security</h2>
        <p>
          We apply administrative, technical and physical safeguards appropriate to the
          information we hold. No method of transmission or storage is completely secure, and we
          cannot guarantee absolute security.
        </p>

        <h2>Your choices</h2>
        <p>
          You may ask us to access, correct or delete the information you have submitted, or to
          stop contacting you, by emailing
          <a :href="`mailto:${site.email}`">{{ site.email }}</a>. Depending on where you live, you
          may have additional rights under applicable state privacy law.
        </p>

        <h2>Cookies and analytics</h2>
        <p>
          This site uses only what is necessary for it to function. If analytics or marketing
          cookies are added later, this section — and any consent mechanism required in your
          jurisdiction — must be updated before they are enabled.
        </p>

        <h2>Changes</h2>
        <p>
          We may update this policy from time to time. The “last updated” date above reflects the
          most recent revision.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to
          <a :href="`mailto:${site.email}`">{{ site.email }}</a>.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.notice {
  display: flex;
  gap: 13px;
  padding: 18px 20px;
  background: #fdf7ec;
  border: 1px solid #f0dcb8;
  border-radius: var(--radius);
  margin-bottom: 36px;
}

.notice svg {
  color: #b3691a;
  flex-shrink: 0;
  margin-top: 2px;
}

.notice p {
  font-size: 0.92rem;
  line-height: 1.6;
  margin: 0;
  color: #7a5214;
}

.prose h2:first-of-type {
  margin-top: 0;
}
</style>
