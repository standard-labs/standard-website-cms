import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Field, Flex } from "@strapi/design-system";
import { useField } from "@strapi/strapi/admin";
import { useIntl } from "react-intl";
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
  const { formatMessage } = useIntl();
  const { onChange, value, error } = useField(name);
  const possibleOptions = useMemo(() => {
    return (attribute["options"] || []).map((option) => {
      const [label2, value2] = [...option.split(/:(.*)/s), option];
      if (!label2 || !value2) return null;
      return { label: label2, value: value2 };
    }).filter(Boolean);
  }, [attribute]);
  const sanitizedValue = useMemo(() => {
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
  const fieldError = useMemo(() => {
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
  return /* @__PURE__ */ jsx(
    Field.Root,
    {
      hint: description?.id ? formatMessage(description) : hint,
      error: fieldError,
      name,
      required,
      children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
        /* @__PURE__ */ jsx(Field.Label, { children: intlLabel?.id ? formatMessage(intlLabel) : label }),
        /* @__PURE__ */ jsx(Field.Hint, {}),
        /* @__PURE__ */ jsx(Field.Error, {})
      ] })
    }
  );
};
export {
  Input as default
};
//# sourceMappingURL=input-Dy6uz3A1.mjs.map
