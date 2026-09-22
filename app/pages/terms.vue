<script setup lang="ts">
import { site } from '~/data/site'

useSeo({
  title: 'Terms of Use',
  description:
    'Terms governing use of the ClariAuth website, the nature of our services, and the limits of the information published here.',
})

useBreadcrumbs([{ label: 'Terms of Use', to: '/terms' }])

const updated = 'September 2026'
</script>

<template>
  <div>
    <PageHero title="Terms of Use" current="Terms of Use">
      <p class="text-muted mt-3">Last updated: {{ updated }}</p>
    </PageHero>

    <section class="section">
      <div class="container container--narrow prose">
        <div class="notice">
          <AppIcon name="alert" :size="20" />
          <p>
            This page is a starting template. Have it reviewed by counsel before the site goes
            live and align it with your actual client services agreement.
          </p>
        </div>

        <h2>Acceptance</h2>
        <p>
          By accessing {{ site.url }} you agree to these terms. If you do not agree, please do not
          use the site.
        </p>

        <h2>Nature of our services</h2>
        <p>
          {{ site.legalName }} provides insurance-related administrative support services to
          healthcare providers. We are not a healthcare provider, we do not provide medical advice
          or clinical services, and nothing on this website constitutes medical, legal, financial
          or compliance advice.
        </p>
        <p>
          Coverage, benefit and authorization determinations are made by payers. ClariAuth does not
          control and cannot guarantee any payer decision, approval, reimbursement or timeframe.
        </p>

        <h2>Website content</h2>
        <p>
          Content on this site is provided for general information about our services. Payer rules,
          plan requirements and regulations change frequently, and information here may not reflect
          current requirements for a specific payer, plan or service. Nothing on this site creates a
          service relationship; services are governed solely by a signed agreement between
          ClariAuth and a client.
        </p>

        <h2>No confidential or patient information</h2>
        <p>
          Do not submit protected health information or other confidential information through this
          website. Information sent through the contact form is not treated as confidential and is
          not covered by a Business Associate Agreement.
        </p>

        <h2>Intellectual property</h2>
        <p>
          The ClariAuth name, logo, and the content and design of this site are owned by
          {{ site.legalName }} and may not be reproduced without permission.
        </p>

        <h2>Third-party links</h2>
        <p>
          This site may link to third-party websites. We are not responsible for their content,
          practices or availability.
        </p>

        <h2>Disclaimer and limitation of liability</h2>
        <p>
          This website is provided “as is”, without warranties of any kind to the fullest extent
          permitted by law. To the extent permitted by law, ClariAuth is not liable for any
          indirect, incidental or consequential damages arising from use of this website.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms at any time. Continued use of the site after changes are posted
          constitutes acceptance of the revised terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to
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
