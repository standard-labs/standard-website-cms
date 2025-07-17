import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import multiText from './fields/multi-text';
import { Alien } from '@strapi/icons';

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
      name: 'multi-text',
      type: 'json',
      intlLabel: {
        id: 'multi-text.label',
        defaultMessage: 'Multi Text',
      },
      intlDescription: {
        id: 'multi-text.description',
        defaultMessage: 'Enter multiple tags or string items',
      },
      icon: Alien,
      components: {
        Input: async () => import('./fields/multi-text/multi-text'),
      },
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
