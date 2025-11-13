import { jsx, jsxs } from "react/jsx-runtime";
import { Field, Flex } from "@strapi/design-system";
import { useField } from "@strapi/strapi/admin";
import * as React from "react";
import { useIntl } from "react-intl";
const Input = React.forwardRef((props, ref) => {
  const { label, attribute, description, disabled, intlLabel, name, required } = props;
  const { onChange, value = "", error } = useField(name);
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(
    Field.Root,
    {
      id: name,
      name,
      hint: description?.defaultMessage,
      error,
      children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
        /* @__PURE__ */ jsx(Field.Label, { children: intlLabel?.id ? formatMessage(intlLabel) : label }),
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
//# sourceMappingURL=input-zh120hkl.mjs.map
