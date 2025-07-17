import type { Core } from '@strapi/strapi';
import { PLUGIN_ID } from '../../admin/src/pluginId';
import multiSelectRegisterServer from '../../lib/fields/multi-select/register-server';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  // register phase
  strapi.customFields.register({
    plugin: PLUGIN_ID,
    ...multiSelectRegisterServer as any,
  });
};

export default register;
