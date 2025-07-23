import type { Core } from '@strapi/strapi';

const guest = ({ strapi }: { strapi: Core.Strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Strapi guest 🚀';
  },
});

export default guest;
