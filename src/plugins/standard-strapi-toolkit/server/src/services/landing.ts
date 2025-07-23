import type { Core } from '@strapi/strapi';

const landing = ({ strapi }: { strapi: Core.Strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Standard-Strapi-Toolkit Landing  🚀';
  },


  async getTeamMembers() {
    const members = await strapi.entityService.findMany('api::team-member.team-member');
    const sortedMembers = members.sort((a, b) => a.displayOrder - b.displayOrder);

    return {
      founders: sortedMembers.filter(member => member.type === 'FOUNDER'),
      humans: sortedMembers.filter(member => member.type === 'HUMAN'),
      aiAgents: sortedMembers.filter(member => member.type === 'AI_AGENT'),
    };
  },
});

export default landing;
