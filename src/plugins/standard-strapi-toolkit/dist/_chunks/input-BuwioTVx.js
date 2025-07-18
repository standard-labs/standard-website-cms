"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const designSystem = require("@strapi/design-system");
const admin = require("@strapi/strapi/admin");
const reactIntl = require("react-intl");
const tagInput = require("./tag-input-BmwXG1_C.js");
const SimpleTags = ({ label, name, intlLabel, attribute }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { onChange, value = [], error } = admin.useField(name);
  const updateValue = (newValue) => {
    onChange({ target: { name, value: newValue, type: attribute.type } });
  };
  const handleAdd = (input) => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      updateValue([...value, trimmed]);
    }
  };
  const handleRemove = (tag) => {
    updateValue(value.filter((x) => x !== tag));
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Field.Root,
    {
      id: name,
      name,
      error,
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: intlLabel?.id ? formatMessage(intlLabel) : label }),
          /* @__PURE__ */ jsxRuntime.jsx(tagInput.TagInput, { onAdd: handleAdd }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {}),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { gap: 1, children: value.map((tag) => /* @__PURE__ */ jsxRuntime.jsx(tagInput.TagView, { text: tag, onRemove: () => handleRemove(tag) }, tag)) })
      ]
    }
  );
};
exports.default = SimpleTags;
