import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import MultiSelectIcon from './components/MultiSelectIcon';

export default {
  register(app: any) {
    // app.addMenuLink({
    //   to: `plugins/${PLUGIN_ID}`,
    //   icon: PluginIcon,
    //   intlLabel: {
    //     id: `${PLUGIN_ID}.plugin.name`,
    //     defaultMessage: PLUGIN_ID,
    //   },
    //   Component: async () => {
    //     const { App } = await import('./pages/App');

    //     return App;
    //   },
    // });

    app.customFields.register({
      name: PLUGIN_ID,
      pluginId: PLUGIN_ID,
      type: 'json',
      icon: MultiSelectIcon,
      intlLabel: {
        id: getTranslation('multi-select.label'),
        defaultMessage: 'Multi Select',
      },
      intlDescription: {
        id: getTranslation('multi-select.description'),
        defaultMessage: 'Select multiple options from a list',
      },
      components: {
        Input: async () => import('./components/MultiSelect'),
      },
      options: {
        base: [
          {
            sectionTitle: null,
            items: [
              {
                name: 'options',
                type: 'textarea-enum',
                intlLabel: {
                  id: getTranslation('multi-select.enum.label'),
                  defaultMessage: 'Options (one per line)',
                },
                description: {
                  id: getTranslation('multi-select.enum.description'),
                  defaultMessage:
                    'Enter one option per line. You can also add a value and a label separated by a colon (e.g. "label:value").\nIf no value is provided, the label will be used as the value',
                },
                placeholder: {
                  id: getTranslation('multi-select.enum.placeholder'),
                  defaultMessage: 'Ex:\nOption 1\nOption 2\nOption 3:option-3',
                },
              },
              {
                name: 'default',
                type: 'json',
                intlLabel: {
                  id: getTranslation('multi-select.default.label'),
                  defaultMessage: 'Default value',
                },
                description: {
                  id: getTranslation('multi-select.default.description'),
                  defaultMessage:
                    'Set the default value of the field in JSON format, be careful with the syntax, ex: ["value-1", "value-2"]',
                },
                defaultValue: '[]',
              },
            ],
          },
        ],
        advanced: [
          {
            sectionTitle: {
              id: 'global.settings',
              defaultMessage: 'Settings',
            },
            items: [
              {
                name: 'required',
                type: 'checkbox',
                intlLabel: {
                  id: 'multi-select.settings.requiredField',
                  defaultMessage: 'Required field',
                },
                description: {
                  id: 'multi-select.settings.requiredField.description',
                  defaultMessage: "You won't be able to create an entry if this field is empty",
                },
              },
              {
                name: 'private',
                type: 'checkbox',
                intlLabel: {
                  id: 'multi-select.settings.private',
                  defaultMessage: 'Private field',
                },
                description: {
                  id: 'multi-select.settings.private.description',
                  defaultMessage: 'This field will not show up in the API response',
                },
              },
              {
                name: 'min',
                type: 'number',
                intlLabel: {
                  id: 'multi-select.settings.minLength',
                  defaultMessage: 'Minimum items',
                },
                description: {
                  id: 'multi-select.settings.minLength.description',
                  defaultMessage: 'The minimum number of items allowed (visual feedback only, cannot be enforced)',
                },
              },
              {
                name: 'max',
                type: 'number',
                intlLabel: {
                  id: 'multi-select.settings.maxLength',
                  defaultMessage: 'Maximum items',
                },
                description: {
                  id: 'multi-select.settings.maxLength.description',
                  defaultMessage: 'The maximum number of items allowed (client-side enforcement only)',
                },
              },
            ],
          },
        ],
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
