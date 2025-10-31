"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const designSystem = require("@strapi/design-system");
const icons = require("@strapi/icons");
const admin = require("@strapi/strapi/admin");
const reactIntl = require("react-intl");
const tagInput = require("./tag-input-BmwXG1_C.js");
const RowTagsInput = ({ label, name, intlLabel, description, attribute }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { onChange, value = [[]], error } = admin.useField(name);
  const updateValue = (newValue) => {
    onChange({ target: { name, value: newValue, type: attribute.type } });
  };
  const handleAddTag = (rowIndex, tag) => {
    const trimmed = tag.trim();
    if (trimmed) {
      const newValue = [...value];
      if (!newValue[rowIndex]) newValue[rowIndex] = [];
      if (!newValue[rowIndex].includes(trimmed)) {
        newValue[rowIndex] = [...newValue[rowIndex], trimmed];
        updateValue(newValue);
      }
    }
  };
  const handleRemoveTag = (rowIndex, tag) => {
    const newValue = [...value];
    newValue[rowIndex] = newValue[rowIndex].filter((t) => t !== tag);
    updateValue(newValue);
  };
  const handleAddRow = () => {
    updateValue([...value, []]);
  };
  const handleRemoveRow = (rowIndex) => {
    const newValue = value.filter((_, i) => i !== rowIndex);
    updateValue(newValue);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Field.Root,
    {
      id: name,
      name,
      hint: description?.defaultMessage,
      error,
      children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: intlLabel?.id ? formatMessage(intlLabel) : label }),
        value.map((row, rowIndex) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 1, children: [
          rowIndex > 0 && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Divider, { style: { width: "100%" } }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "row", gap: 2, style: { width: "100%" }, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { style: { width: "100%" }, children: /* @__PURE__ */ jsxRuntime.jsx(tagInput.TagInput, { onAdd: (val) => handleAddTag(rowIndex, val) }) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Button,
              {
                variant: "danger-light",
                onClick: () => handleRemoveRow(rowIndex),
                children: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {})
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { style: { width: "100%" }, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { gap: 1, wrap: "wrap", children: row.map((tag, tagIndex) => /* @__PURE__ */ jsxRuntime.jsx(tagInput.TagView, { text: tag, onRemove: () => handleRemoveTag(rowIndex, tag) }, tagIndex)) }) })
        ] }, rowIndex)),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Button,
          {
            variant: "secondary",
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}),
            onClick: handleAddRow,
            fullWidth: true,
            children: "Add Row"
          }
        ) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {}),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
      ] })
    }
  );
};
exports.default = RowTagsInput;
//# sourceMappingURL=input-D432vG8N.js.map
