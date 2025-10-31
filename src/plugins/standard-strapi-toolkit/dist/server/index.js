"use strict";
const bootstrap = ({ strapi }) => {
};
const destroy = ({ strapi }) => {
};
const PLUGIN_ID = "standard-strapi-toolkit";
const CUSTOM_FIELDS_IDS_MAP = {
  simple_tags: "simple-tags",
  multi_tags: "multi-tags",
  color_picker: "color-picker",
  icon_picker: "icon-picker"
};
const register = ({ strapi }) => {
  strapi.customFields.register({
    plugin: PLUGIN_ID,
    name: "multi-select",
    type: "json"
  });
  strapi.customFields.register({
    plugin: PLUGIN_ID,
    name: CUSTOM_FIELDS_IDS_MAP.simple_tags,
    type: "json"
  });
  strapi.customFields.register({
    plugin: PLUGIN_ID,
    name: CUSTOM_FIELDS_IDS_MAP.multi_tags,
    type: "json"
  });
  strapi.customFields.register({
    plugin: PLUGIN_ID,
    name: CUSTOM_FIELDS_IDS_MAP.color_picker,
    type: "string"
  });
  strapi.customFields.register({
    plugin: PLUGIN_ID,
    name: CUSTOM_FIELDS_IDS_MAP.icon_picker,
    type: "string"
  });
};
const config = {
  default: {},
  validator() {
  }
};
const contentTypes = {};
const controller = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi.plugin("standard-strapi-toolkit").service("service").getWelcomeMessage();
  }
});
const service$1 = "landing";
const landing$1 = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi.plugin(PLUGIN_ID).service(service$1).getWelcomeMessage();
  },
  async teamMembers(ctx) {
    ctx.body = await strapi.plugin(PLUGIN_ID).service(service$1).getTeamMembers(ctx);
  },
  async articles(ctx) {
    ctx.body = await strapi.plugin(PLUGIN_ID).service(service$1).getArticles(ctx);
  },
  async articleDetail(ctx) {
    ctx.body = await strapi.plugin(PLUGIN_ID).service(service$1).getArticleDetail(ctx);
  },
  async books(ctx) {
    ctx.body = await strapi.plugin(PLUGIN_ID).service(service$1).getBooks(ctx);
  },
  async bookDetail(ctx) {
    ctx.body = await strapi.plugin(PLUGIN_ID).service(service$1).getBookDetail(ctx);
  },
  async jobs(ctx) {
    ctx.body = await strapi.plugin(PLUGIN_ID).service(service$1).getJobs(ctx);
  }
});
const controllers = {
  controller,
  landing: landing$1
};
const middlewares = {};
const policies = {};
const contentAPIRoutes = [
  {
    method: "GET",
    path: "/",
    // name of the controller file & the method.
    handler: "controller.index",
    config: {
      auth: false
      // policies: [],
    }
  }
];
const landingAPIRoutes = [
  {
    method: "GET",
    path: "/landing",
    handler: "landing.index",
    config: {
      auth: false
    }
  },
  {
    method: "GET",
    path: "/landing/team-members",
    handler: "landing.teamMembers",
    config: {
      auth: false
    }
  },
  {
    method: "GET",
    path: "/landing/articles",
    handler: "landing.articles",
    config: {
      auth: false
    }
  },
  {
    method: "GET",
    path: "/landing/articles/:slug",
    handler: "landing.articleDetail",
    config: {
      auth: false
    }
  },
  {
    method: "GET",
    path: "/landing/books",
    handler: "landing.books",
    config: {
      auth: false
    }
  },
  {
    method: "GET",
    path: "/landing/books/:slug",
    handler: "landing.bookDetail",
    config: {
      auth: false
    }
  },
  {
    method: "GET",
    path: "/landing/jobs",
    handler: "landing.jobs",
    config: {
      auth: false
    }
  }
];
const routes = {
  "content-api": {
    type: "content-api",
    routes: contentAPIRoutes
  },
  "landing": {
    type: "content-api",
    routes: landingAPIRoutes
  }
};
function getServerUrl(ctx, strapi) {
  const { request } = ctx;
  const isDevelopment = strapi.config.get("environment") === "development";
  return isDevelopment ? `${request.protocol}://${request.host}` : "";
}
const landing = ({ strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Standard-Strapi-Toolkit Landing  🚀";
  },
  async getTeamMembers(ctx) {
    const members = await strapi.entityService.findMany("api::team-member.team-member", {
      filters: { isVisible: true },
      populate: ["avatar"],
      sort: [{ displayOrder: "asc" }]
    });
    const serverUrl = getServerUrl(ctx, strapi);
    const membersWithAvatarUrl = members.map((member) => {
      const thumbnailUrl = member.avatar?.formats?.thumbnail?.url || member.avatar?.url || null;
      return {
        ...member,
        avatar: void 0,
        avatarUrl: thumbnailUrl ? serverUrl + thumbnailUrl : null
      };
    });
    return {
      statusCode: 200,
      success: true,
      message: "All team members fetched successfully.",
      founders: membersWithAvatarUrl.filter((member) => member.type === "FOUNDER"),
      humans: membersWithAvatarUrl.filter((member) => member.type === "HUMAN"),
      aiAgents: membersWithAvatarUrl.filter((member) => member.type === "AI_AGENT"),
      orbitCentralAgent: membersWithAvatarUrl.find((member) => member.type === "ORBIT_CENTRAL_AGENT"),
      orbitPeripheralAgents: membersWithAvatarUrl.filter((member) => member.type === "ORBIT_PERIPHERAL_AGENT")
    };
  },
  async getArticles(ctx) {
    const articles = await strapi.entityService.findMany("api::article.article", {
      populate: {
        cover: true,
        category: true,
        author: {
          populate: {
            avatar: true
          }
        }
      },
      sort: [{ publishedOn: "desc" }]
    });
    const serverUrl = getServerUrl(ctx, strapi);
    const articlesWithCoverAndAvatarUrl = articles.map((article) => {
      const coverThumbUrl = article.cover?.formats?.thumbnail?.url || article.cover?.url;
      const avatarThumbUrl = article.author?.avatar?.formats?.thumbnail?.url || article.author?.avatar?.url;
      return {
        ...article,
        cover: void 0,
        coverUrl: coverThumbUrl ? serverUrl + coverThumbUrl : null,
        author: {
          ...article.author,
          avatar: void 0,
          avatarUrl: avatarThumbUrl ? serverUrl + avatarThumbUrl : null
        }
      };
    });
    return {
      statusCode: 200,
      success: true,
      message: "All articles fetched successfully.",
      articles: articlesWithCoverAndAvatarUrl
    };
  },
  async getArticleDetail(ctx) {
    const { slug } = ctx.params;
    const articles = await strapi.entityService.findMany("api::article.article", {
      filters: { slug },
      populate: {
        cover: true,
        category: true,
        blocks: true,
        author: {
          populate: {
            avatar: true
          }
        }
      },
      limit: 1
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
      cover: void 0,
      coverUrl: coverThumbUrl ? serverUrl + coverThumbUrl : null,
      author: {
        ...article.author,
        avatar: void 0,
        avatarUrl: avatarThumbUrl ? serverUrl + avatarThumbUrl : null
      }
    };
    return {
      statusCode: 200,
      success: true,
      message: "Article detail fetched successfully.",
      article: formattedArticle
    };
  },
  async getBooks(ctx) {
    const books = await strapi.entityService.findMany("api::book.book", {
      filters: { isVisible: true },
      sort: [{ displayOrder: "asc" }]
    });
    return {
      statusCode: 200,
      success: true,
      message: "All books fetched successfully.",
      books
    };
  },
  async getBookDetail(ctx) {
    const { slug } = ctx.params;
    const books = await strapi.entityService.findMany("api::book.book", {
      filters: { slug },
      limit: 1
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
      book
    };
  },
  async getJobs(ctx) {
    const jobs = await strapi.entityService.findMany("api::job.job", {
      filters: { isVisible: true },
      sort: [{ displayOrder: "asc" }]
    });
    return {
      statusCode: 200,
      success: true,
      message: "All jobs fetched successfully.",
      jobs
    };
  }
});
const service = ({ strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Standard-Strapi-Toolkit 🚀";
  }
});
const services = {
  service,
  landing
};
const index = {
  register,
  bootstrap,
  destroy,
  config,
  controllers,
  routes,
  services,
  contentTypes,
  policies,
  middlewares
};
module.exports = index;
//# sourceMappingURL=index.js.map
