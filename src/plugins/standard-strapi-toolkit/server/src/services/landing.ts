import type { Core } from '@strapi/strapi';

const landing = ({ strapi }: { strapi: Core.Strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Standard-Strapi-Toolkit Landing  🚀';
  },

  getTeamMembers() {
    return 'These are team members: John Doe, Jane Smith, and Alice Johnson.';
  },
});

export default landing;
