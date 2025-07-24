import type { Core } from '@strapi/strapi';
import { PLUGIN_ID } from '../../../admin/src/pluginId';

const service = 'landing';

const landing = ({ strapi }: { strapi: Core.Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin(PLUGIN_ID)
      // the name of the service file & the method.
      .service(service)
      .getWelcomeMessage();
  },

  async teamMembers(ctx) {
    ctx.body = await strapi
      .plugin(PLUGIN_ID)
      .service(service)
      .getTeamMembers(ctx);
  },

  async articles(ctx) {
    ctx.body = await strapi
      .plugin(PLUGIN_ID)
      .service(service)
      .getArticles(ctx);
  },

  async articleDetail(ctx) {
    ctx.body = await strapi
      .plugin(PLUGIN_ID)
      .service(service)
      .getArticleDetail(ctx);
  },

  async books(ctx) {
    ctx.body = await strapi
      .plugin(PLUGIN_ID)
      .service(service)
      .getBooks(ctx);
  },
});

export default landing;
