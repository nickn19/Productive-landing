import type { Core } from '@strapi/strapi';

const homepage = {
  audienceLabel: 'Built for specialist teams',
  headline: 'Knowledge,',
  headlineEmphasis: 'put to work.',
  description: 'Turn your organization’s knowledge, systems, and SOPs into a governed AI workforce that gets work done.',
  primaryCtaLabel: 'Get started',
  primaryCtaUrl: '/get-started',
  secondaryCtaLabel: 'Explore agents',
  secondaryCtaUrl: '#agents',
  domainHeading: 'Built for work where judgment matters',
  domains: ['Finance', 'Tax', 'Legal', 'Operations', 'Research', 'Reporting'],
};

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const existing = await strapi.documents('api::homepage.homepage').findFirst();
    if (!existing) await strapi.documents('api::homepage.homepage').create({ data: homepage, status: 'published' });
  },
};
