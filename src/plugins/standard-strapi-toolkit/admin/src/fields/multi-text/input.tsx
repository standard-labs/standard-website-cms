import React, { useMemo, useState } from 'react';
import { Field, Flex } from '@strapi/design-system';
import { useField } from '@strapi/strapi/admin';
import { useIntl } from 'react-intl';

import Select from 'react-select';
import styled from 'styled-components';


import { Tag } from '@strapi/design-system';
import { Cross } from '@strapi/icons';
import { TextInput } from '@strapi/design-system';
import { Box } from '@strapi/design-system';
import { Badge } from '@strapi/design-system';

const ValueContainer = ({
  selectProps,
  data,
}: {
  selectProps: any;
  data: {
    value: string;
    label: string;
  };
}) => {
  const handleTagClick = (data: { value: string; label: string }) => (e: React.UIEvent<any>) => {
    e.preventDefault();
    selectProps.onChange(selectProps.value.filter((v: any) => v !== data));
  };
  return (
    <Tag tabIndex={-1} icon={<Cross />} onClick={handleTagClick(data)}>
      {data.label}
    </Tag>
  );
};



const SelectInput = ({ components, styles, error, ariaErrorMessage, ...props }: any) => {
  return (
    <Select
      menuPosition="fixed"
      components={{
        IndicatorSeparator: () => null,
        LoadingIndicator: () => null,
        ...components,
      }}
      aria-errormessage={error && ariaErrorMessage}
      aria-invalid={!!error}
      styles={{ ...styles }}
      {...props}
    />
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
  const { onChange, value = [], error } = useField(name);

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

  const [input, setInput] = useState<string>('');

  const handleAdd = () => {
    const trimmed = input.trim();
    console.log(value);
    
    if (trimmed && !value.includes(trimmed)) {
      onChange({ target: { name, value: [...value, trimmed], type: attribute.type } });
    }
    setInput('');
  };

  const handleRemove = (tag: string) => {
    onChange({ target: { name, value: value.filter(t => t !== tag), type: attribute.type } });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <Field.Root
      name={name}
      hint={description?.defaultMessage}
      error={error}
      id={name}
      required={required}
      label={intlLabel?.defaultMessage}
    >
      <Flex direction="column" alignItems="stretch" gap={1}>
        <Field.Label>{intlLabel?.id ? formatMessage(intlLabel) : label}</Field.Label>
        {/* 
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
        /> */}
        <Box display="flex" gap={2} wrap="wrap">
          {value.map((tag, i) => (
            <Badge
              key={i}
              variant="primary"
              onClick={() => handleRemove(tag)}
              cursor="pointer"
              icon={<Cross />}
            >
              {tag}
            </Badge>
          ))}
        </Box>
        <TextInput
          name="multi-text-input"
          placeholder="Type and press Enter"
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Field.Hint />
        <Field.Error />
      </Flex>
    </Field.Root>
  );
};

export default Input;
