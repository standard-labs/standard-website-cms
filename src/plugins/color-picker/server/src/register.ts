import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  // register phase
  strapi.customFields.register({
    name: "color",
    plugin: "color-picker",
    type: "string",
    inputSize: {
      // optional
      default: 4,
      isResizable: true,
    },
  });
};

export default register;
