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

  teamMembers(ctx) {
    ctx.body = strapi
      .plugin(PLUGIN_ID)
      .service(service)
      .getTeamMembers();
  },
});

export default landing;
