import { jsx, jsxs } from "react/jsx-runtime";
import { Field, Flex } from "@strapi/design-system";
import { useField } from "@strapi/strapi/admin";
import * as React from "react";
import { useIntl } from "react-intl";
const Input = React.forwardRef((props, ref) => {
  const {
    label,
    attribute,
    description,
    disabled,
    intlLabel,
    name,
    required,
    hint,
    placeholder
  } = props;
  const { formatMessage } = useIntl();
  const field = useField(name);
  if (!field) {
    console.error(`Field "${name}" is not properly initialized in form context`);
    return null;
  }
  const { onChange, value = "", error } = field;
  const handleChange = (e) => {
    if (onChange) {
      onChange({
        target: {
          name,
          type: attribute.type,
          value: e.currentTarget.value
        }
      });
    }
  };
  return /* @__PURE__ */ jsx(
    Field.Root,
    {
      id: name,
      name,
      hint: description?.defaultMessage || hint,
      error,
      required,
      children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
        /* @__PURE__ */ jsx(Field.Label, { children: intlLabel?.id ? formatMessage(intlLabel) : label }),
        /* @__PURE__ */ jsx(
          Field.Input,
          {
            ref,
            type: "text",
            name,
            disabled,
            value: value || "",
            required,
            onChange: handleChange,
            placeholder: placeholder || "e.g., AArrowDown",
            style: { width: "100%", height: "38px", padding: "8px" }
          }
        ),
        /* @__PURE__ */ jsx("div", { children: "From https://lucide.dev/icons/ i.e AArrowDown" }),
        /* @__PURE__ */ jsx(Field.Error, {})
      ] })
    }
  );
});
Input.displayName = "LucideIconInput";
export {
  Input as default
};
//# sourceMappingURL=input-Bk7DWBoO.mjs.map
