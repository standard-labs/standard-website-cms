import type { Core } from '@strapi/strapi';
import { PLUGIN_ID } from '../../admin/src/pluginId';
import { CUSTOM_FIELDS_IDS_MAP } from '../../lib/custom-fields';


const register = ({ strapi }: { strapi: Core.Strapi }) => {
  // register phase
  strapi.customFields.register({
    plugin: PLUGIN_ID,
    name: 'multi-select',
    type: 'json'
  });

  strapi.customFields.register({
    plugin: PLUGIN_ID,
    name: CUSTOM_FIELDS_IDS_MAP.simple_tags,
    type: 'json'
  });

  strapi.customFields.register({
    plugin: PLUGIN_ID,
    name: CUSTOM_FIELDS_IDS_MAP.multi_tags,
    type: 'json'
  });

  strapi.customFields.register({
    plugin: PLUGIN_ID,
    name: CUSTOM_FIELDS_IDS_MAP.color_picker,
    type: 'string'
  });

  strapi.customFields.register({
    plugin: PLUGIN_ID,
    name: CUSTOM_FIELDS_IDS_MAP.icon_picker,
    type: 'string'
  });
};

export default register;
