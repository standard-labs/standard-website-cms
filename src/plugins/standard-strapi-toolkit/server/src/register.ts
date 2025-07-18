import type { Core } from '@strapi/strapi';
import { PLUGIN_ID } from '../../admin/src/pluginId';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  // register phase
  strapi.customFields.register({
    plugin: PLUGIN_ID,
    name: 'multi-select',
    type: 'json'
  });

  strapi.customFields.register({
    plugin: PLUGIN_ID,
    name: 'multi-text',
    type: 'json'
  });

  strapi.customFields.register({
    plugin: PLUGIN_ID,
    name: 'text-matrix',
    type: 'json'
  });
};

export default register;
