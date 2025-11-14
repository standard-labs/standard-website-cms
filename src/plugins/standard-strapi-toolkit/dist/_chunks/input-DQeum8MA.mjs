import { jsx, jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import { Tag, Field, Flex } from "@strapi/design-system";
import Select from "react-select";
import styled from "styled-components";
import { useField } from "@strapi/strapi/admin";
import { useIntl } from "react-intl";
import { Cross } from "@strapi/icons";
const SelectInput = ({ components, styles, error, ariaErrorMessage, ...props }) => {
  return /* @__PURE__ */ jsx(
    Select,
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
const ReactSelect = styled(SelectInput)`
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
  return /* @__PURE__ */ jsx(Tag, { tabIndex: -1, icon: /* @__PURE__ */ jsx(Cross, {}), onClick: handleTagClick(data), children: data.label });
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
        /* @__PURE__ */ jsx(
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
        /* @__PURE__ */ jsx(Field.Hint, {}),
        /* @__PURE__ */ jsx(Field.Error, {})
      ] })
    }
  );
};
export {
  Input as default
};
//# sourceMappingURL=input-DQeum8MA.mjs.map
