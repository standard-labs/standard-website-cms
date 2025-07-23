import type { Core } from '@strapi/strapi';

const landing = ({ strapi }: { strapi: Core.Strapi }) => ({
  test(ctx) {
    ctx.body = strapi
      .plugin('standard-strapi-toolkit')
      // the name of the service file & the method.
      .service('landing')
      .getWelcomeMessage();
  },
});

export default landing;
