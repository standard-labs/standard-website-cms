"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const designSystem = require("@strapi/design-system");
const Select = require("react-select");
const styled = require("styled-components");
const admin = require("@strapi/strapi/admin");
const reactIntl = require("react-intl");
const icons = require("@strapi/icons");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const Select__default = /* @__PURE__ */ _interopDefault(Select);
const styled__default = /* @__PURE__ */ _interopDefault(styled);
const SelectInput = ({ components, styles, error, ariaErrorMessage, ...props }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Select__default.default,
    {
      menuPosition: "fixed",
      components: {
        IndicatorSeparator: () => null,
        LoadingIndicator: () => null,
        ...components
      },
      "aria-errormessage": error && ariaErrorMessage,
      "aria-invalid": !!error,
      styles: { ...styles },
      ...props
    }
  );
};
const ReactSelect = styled__default.default(SelectInput)`
  .select-control {
    height: auto;
    background: ${({ theme }) => theme.colors.neutral0};
    border: 1px solid ${({ theme }) => theme.colors.neutral200};

    & > div:first-child {
      padding: 4px;
      gap: 4px;

      & > div {
        padding-left: 8px;
      }
    }

    .select-multi-value-container {
      margin-right: -8px;
    }

    & [aria-disabled='true'] {
      background: ${({ theme }) => theme.colors.neutral150};
      border: 1px solid ${({ theme }) => theme.colors.neutral200};
    }
  }
  .select-menu {
    background: ${({ theme }) => theme.colors.neutral0};

    .option-focused {
      background: ${({ theme }) => theme.colors.neutral200};
    }
  }
`;
const ValueContainer = ({
  selectProps,
  data
}) => {
  const handleTagClick = (data2) => (e) => {
    e.preventDefault();
    selectProps.onChange(selectProps.value.filter((v) => v !== data2));
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tag, { tabIndex: -1, icon: /* @__PURE__ */ jsxRuntime.jsx(icons.Cross, {}), onClick: handleTagClick(data), children: data.label });
};
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
        /* @__PURE__ */ jsxRuntime.jsx(
          ReactSelect,
          {
            isSearchable: true,
            isMulti: true,
            error: fieldError,
            name,
            id: name,
            isOptionDisabled: () => sanitizedValue.length >= attribute["max"] || false,
            isDisabled: disabled || possibleOptions.length === 0,
            placeholder,
            defaultValue: sanitizedValue.map((val) => ({
              label: formatMessage({
                id: val.label,
                defaultMessage: val.label
              }),
              value: val.value
            })),
            components: {
              MultiValueContainer: ValueContainer
            },
            options: possibleOptions.map((option) => ({
              ...option,
              label: formatMessage({
                id: option.label,
                defaultMessage: option.label
              })
            })),
            onChange: (val) => {
              onChange({
                target: {
                  name,
                  value: val?.length && val.filter((v) => !!v) ? JSON.stringify(val.filter((v) => !!v).map((v) => v.value)) : null,
                  type: attribute.type
                }
              });
            },
            classNames: {
              control: (_state) => "select-control",
              multiValue: (_state) => "select-multi-value",
              placeholder: (_state) => "select-placeholder",
              menuList: (_state) => "select-listbox",
              menu: (_state) => "select-menu",
              option: (state) => state.isFocused ? "option-focused" : "option"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {}),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
      ] })
    }
  );
};
exports.default = Input;
//# sourceMappingURL=input-Cm6KLToc.js.map
