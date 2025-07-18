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
const controllers = {
  controller
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
      policies: []
    }
  }
];
const routes = {
  "content-api": {
    type: "content-api",
    routes: contentAPIRoutes
  }
};
const service = ({ strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  }
});
const services = {
  service
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
