import { jsx, jsxs } from "react/jsx-runtime";
import { Field, Flex } from "@strapi/design-system";
import { useField } from "@strapi/strapi/admin";
import * as React from "react";
import { useIntl } from "react-intl";
const Input = React.forwardRef((props, ref) => {
  const { label, attribute, description, disabled, intlLabel, name, required } = props;
  const { onChange, value = "", error } = useField(name);
  const { formatMessage } = useIntl();
  const handleChange = (e) => {
    onChange({ target: { name, type: attribute.type, value: e.currentTarget.value } });
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
        /* @__PURE__ */ jsx(
          Field.Input,
          {
            ref,
            type: "text",
            name,
            disabled,
            value,
            required,
            onChange: handleChange,
            style: { width: "100%", height: "38px", padding: "2px" }
          }
        ),
        /* @__PURE__ */ jsx("div", { children: "From https://lucide.dev/icons/ i.e AArrowDown" }),
        /* @__PURE__ */ jsx(Field.Hint, {}),
        /* @__PURE__ */ jsx(Field.Error, {})
      ] })
    }
  );
});
export {
  Input as default
};
//# sourceMappingURL=input-C3rUGP15.mjs.map
