const bootstrap = ({ strapi }) => {
};
const destroy = ({ strapi }) => {
};
const PLUGIN_ID = "standard-strapi-toolkit";
const CUSTOM_FIELDS_IDS_MAP = {
  simple_tags: "simple-tags",
  multi_tags: "multi-tags"
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
const landing = ({ strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Standard-Strapi-Toolkit Landing  🚀";
  },
  async getTeamMembers(ctx) {
    const members = await strapi.entityService.findMany("api::team-member.team-member", {
      populate: ["avatar"]
    });
    const sortedMembers = members.sort((a, b) => a.displayOrder - b.displayOrder);
    const serverUrl = `${ctx.request.protocol}://${ctx.request.host}`;
    const formattedMember = sortedMembers.map((member) => {
      const thumbnailUrl = member.avatar?.formats?.thumbnail?.url || member.avatar?.url || null;
      return {
        ...member,
        avatar: void 0,
        avatarUrl: thumbnailUrl ? thumbnailUrl : null
      };
    });
    return {
      statusCode: 200,
      success: true,
      serverUrl,
      message: "All team members fetched successfully.",
      founders: formattedMember.filter((member) => member.type === "FOUNDER"),
      humans: formattedMember.filter((member) => member.type === "HUMAN"),
      aiAgents: formattedMember.filter((member) => member.type === "AI_AGENT")
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
export {
  index as default
};
//# sourceMappingURL=index.mjs.map
