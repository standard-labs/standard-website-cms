import type { Core } from '@strapi/strapi';

const landing = ({ strapi }: { strapi: Core.Strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Standard-Strapi-Toolkit Landing  🚀';
  },


  async getTeamMembers(ctx: any) {
    const members = await strapi.entityService.findMany('api::team-member.team-member', {
      populate: ['avatar'],
    });
    const sortedMembers = members.sort((a, b) => a.displayOrder - b.displayOrder);

    const serverUrl = `${ctx.request.protocol}://${ctx.request.host}`;
    const formattedMember = sortedMembers.map((member) => {
      const thumbnailUrl = member.avatar?.formats?.thumbnail?.url || member.avatar?.url || null;

      return {
        ...member,
        avatar: undefined,
        avatarUrl: thumbnailUrl ? (serverUrl + thumbnailUrl) : null,
      };
    });

    return {
      statusCode: 200,
      success: true,
      serverUrl,
      message: "All team members fetched successfully.",
      founders: formattedMember.filter(member => member.type === 'FOUNDER'),
      humans: formattedMember.filter(member => member.type === 'HUMAN'),
      aiAgents: formattedMember.filter(member => member.type === 'AI_AGENT'),
    };
  },
});

export default landing;
