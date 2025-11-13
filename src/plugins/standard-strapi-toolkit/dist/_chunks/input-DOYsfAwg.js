"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const designSystem = require("@strapi/design-system");
const admin = require("@strapi/strapi/admin");
const reactIntl = require("react-intl");
const Input = ({
  hint,
  label,
  name,
  intlLabel,
  required,
  attribute,
  description,
  placeholder,
  disabled
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const { onChange, value, error } = admin.useField(name);
  const possibleOptions = React.useMemo(() => {
    return (attribute["options"] || []).map((option) => {
      const [label2, value2] = [...option.split(/:(.*)/s), option];
      if (!label2 || !value2) return null;
      return { label: label2, value: value2 };
    }).filter(Boolean);
  }, [attribute]);
  const sanitizedValue = React.useMemo(() => {
    let parsedValue;
    try {
      parsedValue = typeof value !== "string" ? value || [] : JSON.parse(value || "[]");
    } catch (e) {
      parsedValue = [];
    }
    return Array.isArray(parsedValue) ? parsedValue.map(
      (val) => possibleOptions.find((option) => option.value === val)
    ).filter((option) => !!option) : [];
  }, [value, possibleOptions]);
  const fieldError = React.useMemo(() => {
    if (error) return error;
    const { min, max } = attribute;
    const hasNoOptions = required && !possibleOptions.length;
    const belowMin = sanitizedValue.length < min && (required || sanitizedValue.length > 0);
    const aboveMax = sanitizedValue.length > max;
    if (hasNoOptions) {
      return "No options, but field is required";
    }
    if (belowMin) {
      return `Select at least ${min} options`;
    }
    if (aboveMax) {
      return `Select at most ${max} options`;
    }
    return null;
  }, [required, error, possibleOptions, sanitizedValue, attribute]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Field.Root,
    {
      hint: description?.id ? formatMessage(description) : hint,
      error: fieldError,
      name,
      required,
      children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: intlLabel?.id ? formatMessage(intlLabel) : label }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {}),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
      ] })
    }
  );
};
exports.default = Input;
//# sourceMappingURL=input-DOYsfAwg.js.map
