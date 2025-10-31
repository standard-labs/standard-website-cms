import type { Core } from '@strapi/strapi';
import { getServerUrl } from '../../../lib/utils';

const landing = ({ strapi }: { strapi: Core.Strapi }) => ({
  getWelcomeMessage() {
    return 'Welcome to Standard-Strapi-Toolkit Landing  🚀';
  },


  async getTeamMembers(ctx: any) {
    const members = await strapi.entityService.findMany('api::team-member.team-member', {
      filters: { isVisible: true },
      populate: ['avatar'],
      sort: [{ displayOrder: 'asc' }],
    });
    // members.sort((a, b) => a.displayOrder - b.displayOrder);

    const serverUrl = getServerUrl(ctx, strapi);
    const membersWithAvatarUrl = members.map((member) => {
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
      message: "All team members fetched successfully.",
      founders: membersWithAvatarUrl.filter(member => member.type === 'FOUNDER'),
      humans: membersWithAvatarUrl.filter(member => member.type === 'HUMAN'),
      aiAgents: membersWithAvatarUrl.filter(member => (member.type === 'AI_AGENT')),
      orbitCentralAgent: membersWithAvatarUrl.find(member => member.type === 'ORBIT_CENTRAL_AGENT'),
      orbitPeripheralAgents: membersWithAvatarUrl.filter(member => member.type === 'ORBIT_PERIPHERAL_AGENT'),
    };
  },


  async getArticles(ctx: any) {
    const articles = await strapi.entityService.findMany('api::article.article', {
      populate: {
        cover: true,
        category: true,
        author: {
          populate: {
            avatar: true,
          }
        },
      },
      sort: [{ publishedOn: 'desc' }],
    });

    const serverUrl = getServerUrl(ctx, strapi);
    const articlesWithCoverAndAvatarUrl = articles.map((article) => {
      const coverThumbUrl = article.cover?.formats?.thumbnail?.url || article.cover?.url;
      const avatarThumbUrl = article.author?.avatar?.formats?.thumbnail?.url || article.author?.avatar?.url;

      return {
        ...article,
        cover: undefined,
        coverUrl: coverThumbUrl ? serverUrl + coverThumbUrl : null,

        author: {
          ...article.author,
          avatar: undefined,
          avatarUrl: avatarThumbUrl ? serverUrl + avatarThumbUrl : null,
        },
      };
    });


    return {
      statusCode: 200,
      success: true,
      message: "All articles fetched successfully.",
      articles: articlesWithCoverAndAvatarUrl,
    };
  },


  async getArticleDetail(ctx: any) {
    const { slug } = ctx.params;

    const articles = await strapi.entityService.findMany('api::article.article', {
      filters: { slug },
      populate: {
        cover: true,
        category: true,
        blocks: true,
        author: {
          populate: {
            avatar: true,
          }
        },
      },
      limit: 1,
    });

    const article = articles?.[0];

    if (!article) {
      ctx.notFound("Article not found");
      return;
    }

    const serverUrl = getServerUrl(ctx, strapi);

    const coverThumbUrl = article.cover?.formats?.thumbnail?.url || article.cover?.url;
    const avatarThumbUrl = article.author?.avatar?.formats?.thumbnail?.url || article.author?.avatar?.url;

    const formattedArticle = {
      ...article,
      cover: undefined,
      coverUrl: coverThumbUrl ? serverUrl + coverThumbUrl : null,
      author: {
        ...article.author,
        avatar: undefined,
        avatarUrl: avatarThumbUrl ? serverUrl + avatarThumbUrl : null,
      },
    };

    return {
      statusCode: 200,
      success: true,
      message: "Article detail fetched successfully.",
      article: formattedArticle,
    };
  },


  async getBooks(ctx: any) {
    const books = await strapi.entityService.findMany('api::book.book', {
      filters: { isVisible: true },
      sort: [{ displayOrder: 'asc' }],
    });

    return {
      statusCode: 200,
      success: true,
      message: "All books fetched successfully.",
      books,
    };
  },


  async getBookDetail(ctx: any) {
    const { slug } = ctx.params;

    const books = await strapi.entityService.findMany('api::book.book', {
      filters: { slug },
      limit: 1,
    });

    const book = books?.[0];

    if (!book) {
      ctx.notFound("Book not found");
      return;
    }

    return {
      statusCode: 200,
      success: true,
      message: "Book detail fetched successfully.",
      book,
    };
  },


  async getJobs(ctx: any) {
    const jobs = await strapi.entityService.findMany('api::job.job', {
      filters: { isVisible: true },
      sort: [{ displayOrder: 'asc' }],
    });

    return {
      statusCode: 200,
      success: true,
      message: "All jobs fetched successfully.",
      jobs,
    };
  },
});

export default landing;
