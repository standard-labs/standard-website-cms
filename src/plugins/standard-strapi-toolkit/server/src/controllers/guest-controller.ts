import type { Core } from '@strapi/strapi';

const guest = ({ strapi }: { strapi: Core.Strapi }) => ({
  test(ctx) {
    ctx.body = strapi
      .plugin('standard-strapi-toolkit')
      // the name of the service file & the method.
      .service('guest')
      .getWelcomeMessage();
  },
});

export default guest;
