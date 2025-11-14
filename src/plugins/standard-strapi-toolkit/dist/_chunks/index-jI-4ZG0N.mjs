import { useRef, useEffect } from "react";
import { jsx } from "react/jsx-runtime";
import { PuzzlePiece, Check, BulletList, GridFour, Palette, Feather } from "@strapi/icons";
import styled from "styled-components";
import { Flex } from "@strapi/design-system";
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const PLUGIN_ID = "standard-strapi-toolkit";
const Initializer = ({ setPlugin }) => {
  const ref = useRef(setPlugin);
  useEffect(() => {
    ref.current(PLUGIN_ID);
  }, []);
  return null;
};
const PluginIcon = () => /* @__PURE__ */ jsx(PuzzlePiece, {});
const FIELD_ID$4 = "multi-select";
const IconBox$4 = styled(Flex)`
  background-color: #f0f0ff; /* primary100 */
  border: 1px solid #d9d8ff; /* primary200 */

  svg > path {
    fill: #4945ff; /* primary600 */
  }
`;
const Icon$4 = () => {
  return /* @__PURE__ */ jsx(
    IconBox$4,
    {
      justifyContent: "center",
      alignItems: "center",
      width: 7,
      height: 6,
      hasRadius: true,
      "aria-hidden": true,
      children: /* @__PURE__ */ jsx(Check, {})
    }
  );
};
const getTranslation = (id) => `${PLUGIN_ID}.${id}`;
const multiSelectRegisterAdmin = {
  name: FIELD_ID$4,
  type: "json",
  icon: Icon$4,
  intlLabel: {
    id: getTranslation("multi-select.label"),
    defaultMessage: "Multi Select"
  },
  intlDescription: {
    id: getTranslation("multi-select.description"),
    defaultMessage: "Select multiple options from a list"
  },
  components: {
    Input: async () => import("./input-DQeum8MA.mjs")
  },
  options: {
    base: [
      {
        sectionTitle: null,
        items: [
          {
            name: "options",
            type: "textarea-enum",
            intlLabel: {
              id: getTranslation("multi-select.enum.label"),
              defaultMessage: "Options (one per line)"
            },
            description: {
              id: getTranslation("multi-select.enum.description"),
              defaultMessage: 'Enter one option per line. You can also add a value and a label separated by a colon (e.g. "label:value").\nIf no value is provided, the label will be used as the value'
            },
            placeholder: {
              id: getTranslation("multi-select.enum.placeholder"),
              defaultMessage: "Ex:\nOption 1\nOption 2\nOption 3:option-3"
            }
          },
          {
            name: "default",
            type: "json",
            intlLabel: {
              id: getTranslation("multi-select.default.label"),
              defaultMessage: "Default value"
            },
            description: {
              id: getTranslation("multi-select.default.description"),
              defaultMessage: 'Set the default value of the field in JSON format, be careful with the syntax, ex: ["value-1", "value-2"]'
            },
            defaultValue: "[]"
          }
        ]
      }
    ],
    advanced: [
      {
        sectionTitle: {
          id: "global.settings",
          defaultMessage: "Settings"
        },
        items: [
          {
            name: "required",
            type: "checkbox",
            intlLabel: {
              id: "multi-select.settings.requiredField",
              defaultMessage: "Required field"
            },
            description: {
              id: "multi-select.settings.requiredField.description",
              defaultMessage: "You won't be able to create an entry if this field is empty"
            }
          },
          {
            name: "private",
            type: "checkbox",
            intlLabel: {
              id: "multi-select.settings.private",
              defaultMessage: "Private field"
            },
            description: {
              id: "multi-select.settings.private.description",
              defaultMessage: "This field will not show up in the API response"
            }
          },
          {
            name: "min",
            type: "number",
            intlLabel: {
              id: "multi-select.settings.minLength",
              defaultMessage: "Minimum items"
            },
            description: {
              id: "multi-select.settings.minLength.description",
              defaultMessage: "The minimum number of items allowed (visual feedback only, cannot be enforced)"
            }
          },
          {
            name: "max",
            type: "number",
            intlLabel: {
              id: "multi-select.settings.maxLength",
              defaultMessage: "Maximum items"
            },
            description: {
              id: "multi-select.settings.maxLength.description",
              defaultMessage: "The maximum number of items allowed (client-side enforcement only)"
            }
          }
        ]
      }
    ]
  }
};
const CUSTOM_FIELDS_IDS_MAP = {
  simple_tags: "simple-tags",
  multi_tags: "multi-tags",
  color_picker: "color-picker",
  icon_picker: "icon-picker"
};
const IconBox$3 = styled(Flex)`
  background-color: #f0f0ff; /* primary100 */
  border: 1px solid #d9d8ff; /* primary200 */

  svg > path {
    fill: #4945ff; /* primary600 */
  }
`;
const Icon$3 = () => {
  return /* @__PURE__ */ jsx(IconBox$3, { hasRadius: true, children: /* @__PURE__ */ jsx(BulletList, {}) });
};
const FIELD_ID$3 = CUSTOM_FIELDS_IDS_MAP.simple_tags;
const simpleTagsRegisterAdmin = {
  name: FIELD_ID$3,
  type: "json",
  intlLabel: {
    id: `${PLUGIN_ID}.${FIELD_ID$3}.label`,
    defaultMessage: "Simple Tags"
  },
  intlDescription: {
    id: `${PLUGIN_ID}.${FIELD_ID$3}.description`,
    defaultMessage: 'A flat list of custom text tags. Example: ["summer", "sale"]'
  },
  icon: Icon$3,
  components: {
    Input: async () => import("./input-B1N-tHVV.mjs")
  }
};
const IconBox$2 = styled(Flex)`
  background-color: #f0f0ff; /* primary100 */
  border: 1px solid #d9d8ff; /* primary200 */

  svg > path {
    fill: #4945ff; /* primary600 */
  }
`;
const Icon$2 = () => {
  return /* @__PURE__ */ jsx(IconBox$2, { hasRadius: true, children: /* @__PURE__ */ jsx(GridFour, {}) });
};
const FIELD_ID$2 = CUSTOM_FIELDS_IDS_MAP.multi_tags;
const multiTagsRegisterAdmin = {
  name: FIELD_ID$2,
  type: "json",
  intlLabel: {
    id: `${PLUGIN_ID}.${FIELD_ID$2}.label`,
    defaultMessage: "Text Matrix"
  },
  intlDescription: {
    id: `${PLUGIN_ID}.${FIELD_ID$2}.description`,
    defaultMessage: 'A nested list (2D array) of grouped tags. Example: [["red", "blue"], ["S", "M", "L"]]'
  },
  icon: Icon$2,
  components: {
    Input: async () => import("./input-CmowkH_k.mjs")
  }
};
const IconBox$1 = styled(Flex)`
  background-color: #f0f0ff; /* primary100 */
  border: 1px solid #d9d8ff; /* primary200 */

  svg > path {
    fill: #4945ff; /* primary600 */
  }
`;
const Icon$1 = () => {
  return /* @__PURE__ */ jsx(IconBox$1, { hasRadius: true, children: /* @__PURE__ */ jsx(Palette, {}) });
};
const FIELD_ID$1 = CUSTOM_FIELDS_IDS_MAP.color_picker;
const colorPickerRegisterAdmin = {
  name: FIELD_ID$1,
  type: "string",
  intlLabel: {
    id: `${PLUGIN_ID}.${FIELD_ID$1}.label`,
    defaultMessage: "Color Picker"
  },
  intlDescription: {
    id: `${PLUGIN_ID}.${FIELD_ID$1}.description`,
    defaultMessage: "A custom Strapi field that lets users pick and store a color value (HEX, RGB, or HSL)."
  },
  icon: Icon$1,
  components: {
    Input: async () => import("./input-CZcJcQd2.mjs")
  }
};
const IconBox = styled(Flex)`
  background-color: #f0f0ff; /* primary100 */
  border: 1px solid #d9d8ff; /* primary200 */

  svg > path {
    fill: #4945ff; /* primary600 */
  }
`;
const Icon = () => {
  return /* @__PURE__ */ jsx(IconBox, { hasRadius: true, children: /* @__PURE__ */ jsx(Feather, {}) });
};
const FIELD_ID = CUSTOM_FIELDS_IDS_MAP.icon_picker;
const iconPickerRegisterAdmin = {
  name: FIELD_ID,
  type: "string",
  intlLabel: {
    id: `${PLUGIN_ID}.${FIELD_ID}.label`,
    defaultMessage: "Icon Picker"
  },
  intlDescription: {
    id: `${PLUGIN_ID}.${FIELD_ID}.description`,
    defaultMessage: "A custom Strapi field to pick and store icons from a predefined list."
  },
  icon: Icon,
  components: {
    Input: async () => import("./input-Bk7DWBoO.mjs")
  }
};
const index = {
  register(app) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID
      },
      Component: async () => {
        const { App } = await import("./App-DLFnSJNf.mjs");
        return App;
      }
    });
    app.customFields.register({
      pluginId: PLUGIN_ID,
      ...multiSelectRegisterAdmin
    });
    app.customFields.register({
      pluginId: PLUGIN_ID,
      ...simpleTagsRegisterAdmin
    });
    app.customFields.register({
      pluginId: PLUGIN_ID,
      ...multiTagsRegisterAdmin
    });
    app.customFields.register({
      pluginId: PLUGIN_ID,
      ...colorPickerRegisterAdmin
    });
    app.customFields.register({
      pluginId: PLUGIN_ID,
      ...iconPickerRegisterAdmin
    });
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID
    });
  },
  async registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => import("./en-Byx4XI2L.mjs") }), `./translations/${locale}.json`, 3);
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  }
};
export {
  getTranslation as g,
  index as i
};
//# sourceMappingURL=index-jI-4ZG0N.mjs.map
