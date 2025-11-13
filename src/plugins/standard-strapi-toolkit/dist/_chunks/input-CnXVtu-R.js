"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const designSystem = require("@strapi/design-system");
const admin = require("@strapi/strapi/admin");
const React = require("react");
const reactIntl = require("react-intl");
function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const React__namespace = /* @__PURE__ */ _interopNamespace(React);
const Input = React__namespace.forwardRef((props, ref) => {
  const { label, attribute, description, disabled, intlLabel, name, required } = props;
  const { onChange, value = "", error } = admin.useField(name);
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Field.Root,
    {
      id: name,
      name,
      hint: description?.defaultMessage,
      error,
      children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: intlLabel?.id ? formatMessage(intlLabel) : label }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {}),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
      ] })
    }
  );
});
exports.default = Input;
//# sourceMappingURL=input-CnXVtu-R.js.map
