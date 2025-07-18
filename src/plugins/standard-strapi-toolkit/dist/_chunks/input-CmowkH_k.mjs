import { jsx, jsxs } from "react/jsx-runtime";
import { Field, Flex, Divider, Box, Button } from "@strapi/design-system";
import { Trash, Plus } from "@strapi/icons";
import { useField } from "@strapi/strapi/admin";
import { useIntl } from "react-intl";
import { T as TagInput, a as TagView } from "./tag-input-f9S1Y2cG.mjs";
const RowTagsInput = ({ label, name, intlLabel, description, attribute }) => {
  const { formatMessage } = useIntl();
  const { onChange, value = [[]], error } = useField(name);
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
  return /* @__PURE__ */ jsx(
    Field.Root,
    {
      id: name,
      name,
      hint: description?.defaultMessage,
      error,
      children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
        /* @__PURE__ */ jsx(Field.Label, { children: intlLabel?.id ? formatMessage(intlLabel) : label }),
        value.map((row, rowIndex) => /* @__PURE__ */ jsxs(Flex, { direction: "column", gap: 1, children: [
          rowIndex > 0 && /* @__PURE__ */ jsx(Divider, { style: { width: "100%" } }),
          /* @__PURE__ */ jsxs(Flex, { direction: "row", gap: 2, style: { width: "100%" }, children: [
            /* @__PURE__ */ jsx(Box, { style: { width: "100%" }, children: /* @__PURE__ */ jsx(TagInput, { onAdd: (val) => handleAddTag(rowIndex, val) }) }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "danger-light",
                onClick: () => handleRemoveRow(rowIndex),
                children: /* @__PURE__ */ jsx(Trash, {})
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Box, { style: { width: "100%" }, children: /* @__PURE__ */ jsx(Flex, { gap: 1, wrap: "wrap", children: row.map((tag, tagIndex) => /* @__PURE__ */ jsx(TagView, { text: tag, onRemove: () => handleRemoveTag(rowIndex, tag) }, tagIndex)) }) })
        ] }, rowIndex)),
        /* @__PURE__ */ jsx(Flex, { children: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "secondary",
            startIcon: /* @__PURE__ */ jsx(Plus, {}),
            onClick: handleAddRow,
            fullWidth: true,
            children: "Add Row"
          }
        ) }),
        /* @__PURE__ */ jsx(Field.Hint, {}),
        /* @__PURE__ */ jsx(Field.Error, {})
      ] })
    }
  );
};
export {
  RowTagsInput as default
};
