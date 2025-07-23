import { jsxs, jsx } from "react/jsx-runtime";
import { Field, Flex } from "@strapi/design-system";
import { useField } from "@strapi/strapi/admin";
import { useIntl } from "react-intl";
import { T as TagInput, a as TagView } from "./tag-input-f9S1Y2cG.mjs";
const SimpleTags = ({ label, name, intlLabel, attribute }) => {
  const { formatMessage } = useIntl();
  const { onChange, value = [], error } = useField(name);
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
  return /* @__PURE__ */ jsxs(
    Field.Root,
    {
      id: name,
      name,
      error,
      children: [
        /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
          /* @__PURE__ */ jsx(Field.Label, { children: intlLabel?.id ? formatMessage(intlLabel) : label }),
          /* @__PURE__ */ jsx(TagInput, { onAdd: handleAdd }),
          /* @__PURE__ */ jsx(Field.Hint, {}),
          /* @__PURE__ */ jsx(Field.Error, {})
        ] }),
        /* @__PURE__ */ jsx(Flex, { gap: 1, children: value.map((tag) => /* @__PURE__ */ jsx(TagView, { text: tag, onRemove: () => handleRemove(tag) }, tag)) })
      ]
    }
  );
};
export {
  SimpleTags as default
};
//# sourceMappingURL=input-B1N-tHVV.mjs.map
