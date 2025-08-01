import React, { useMemo } from 'react';
import { Field, Flex } from '@strapi/design-system';
import ReactSelect from './react-select';
import { useField } from '@strapi/strapi/admin';
import { useIntl } from 'react-intl';
import ValueContainer from './value-container';


const Input = ({
  hint,
  label,
  name,
  intlLabel,
  required,
  attribute,
  description,
  placeholder,
  disabled,
}: {
  hint: string;
  label: string;
  name: string;
  intlLabel: any;
  required: boolean;
  attribute: any;
  description: any;
  placeholder: string;
  disabled: boolean;
}) => {
  const { formatMessage } = useIntl();
  const { onChange, value, error } = useField(name);

  const possibleOptions = useMemo(() => {
    return (attribute['options'] || [])
      .map((option: string) => {
        const [label, value] = [...option.split(/:(.*)/s), option];
        if (!label || !value) return null;
        return { label, value };
      })
      .filter(Boolean);
  }, [attribute]);

  const sanitizedValue = useMemo(() => {
    let parsedValue;
    try {
      parsedValue = typeof value !== 'string' ? value || [] : JSON.parse(value || '[]');
    } catch (e) {
      parsedValue = [];
    }
    return Array.isArray(parsedValue)
      ? parsedValue
        .map((val) =>
          possibleOptions.find((option: { label: string; value: string }) => option.value === val)
        )
        .filter((option) => !!option)
      : [];
  }, [value, possibleOptions]);

  const fieldError = useMemo(() => {
    if (error) return error;

    const { min, max } = attribute;
    const hasNoOptions = required && (!possibleOptions.length);
    const belowMin = sanitizedValue.length < min && (required || sanitizedValue.length > 0);
    const aboveMax = sanitizedValue.length > max;

    if (hasNoOptions) {
      return 'No options, but field is required';
    }

    if (belowMin) {
      return `Select at least ${min} options`;
    }

    if (aboveMax) {
      return `Select at most ${max} options`;
    }

    return null;
  }, [required, error, possibleOptions, sanitizedValue, attribute]);

  return (
    <Field.Root
      hint={description?.id ? formatMessage(description) : hint}
      error={fieldError as string}
      name={name}
      required={required}
    >
      <Flex direction="column" alignItems="stretch" gap={1}>
        <Field.Label>{intlLabel?.id ? formatMessage(intlLabel) : label}</Field.Label>
        <ReactSelect
          isSearchable={true}
          isMulti={true}
          error={fieldError}
          name={name}
          id={name}
          isOptionDisabled={() => sanitizedValue.length >= attribute['max'] || false}
          isDisabled={disabled || possibleOptions.length === 0}
          placeholder={placeholder}
          defaultValue={sanitizedValue.map((val: { label: string; value: string }) => ({
            label: formatMessage({
              id: val.label,
              defaultMessage: val.label,
            }),
            value: val.value,
          }))}
          components={{
            MultiValueContainer: ValueContainer,
          }}
          options={possibleOptions.map((option: { label: string; value: string }) => ({
            ...option,
            label: formatMessage({
              id: option.label,
              defaultMessage: option.label,
            }),
          }))}
          onChange={(val: any) => {
            onChange({
              target: {
                name: name,
                value:
                  val?.length && val.filter((v: any) => !!v)
                    ? JSON.stringify(val.filter((v: any) => !!v).map((v: any) => v.value))
                    : null,
                type: attribute.type,
              },
            } as React.ChangeEvent<HTMLInputElement>);
          }}
          classNames={{
            control: (_state: any) => 'select-control',
            multiValue: (_state: any) => 'select-multi-value',
            placeholder: (_state: any) => 'select-placeholder',
            menuList: (_state: any) => 'select-listbox',
            menu: (_state: any) => 'select-menu',
            option: (state: any) => (state.isFocused ? 'option-focused' : 'option'),
          }}
        />
        <Field.Hint />
        <Field.Error />
      </Flex>
    </Field.Root>
  );
};

export default Input;
