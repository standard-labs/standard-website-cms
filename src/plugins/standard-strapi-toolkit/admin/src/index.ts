import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import multiSelectRegisterAdmin from './fields/multi-select/register-admin';
import simpleTagsRegisterAdmin from './fields/simple-tags/register-admin';
import multiTagsRegisterAdmin from './fields/multi-tags/register-admin';
import colorPickerRegisterAdmin from './fields/color-picker/register-admin';
import iconPickerRegisterAdmin from './fields/icon-picker/register-admin';

export default {
  register(app: any) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID,
      },
      Component: async () => {
        const { App } = await import('./pages/App');

        return App;
      },
    });

    app.customFields.register({
      pluginId: PLUGIN_ID,
      ...multiSelectRegisterAdmin,
    });

    app.customFields.register({
      pluginId: PLUGIN_ID,
      ...simpleTagsRegisterAdmin,
    });

    app.customFields.register({
      pluginId: PLUGIN_ID,
      ...multiTagsRegisterAdmin,
    });

    app.customFields.register({
      pluginId: PLUGIN_ID,
      ...colorPickerRegisterAdmin,
    });

    app.customFields.register({
      pluginId: PLUGIN_ID,
      ...iconPickerRegisterAdmin,
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
