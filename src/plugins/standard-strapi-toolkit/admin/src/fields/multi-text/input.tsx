import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Field, Flex } from '@strapi/design-system';
import { useField } from '@strapi/strapi/admin';
import { useIntl } from 'react-intl';
import { Cross } from '@strapi/icons';
import { TextInput } from '@strapi/design-system';
import { Badge } from '@strapi/design-system';



type InputValue = string;

interface InputProps {
  label: string;
  name: string;
  intlLabel: { id: string; defaultMessage: string };
  description?: { id: string; defaultMessage: string };
  required?: boolean;
  attribute: { type: string };
}

const Input: React.FC<InputProps> = ({ label, name, intlLabel, description, required, attribute }) => {
  const { formatMessage } = useIntl();
  const { onChange, value = [], error } = useField(name);
  const [input, setInput] = useState<InputValue>('');

  const updateValue = (newValue: InputValue[]) => {
    onChange({ target: { name, value: newValue, type: attribute.type } } as any);
  }

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      updateValue([...value, trimmed]);
    }
    setInput('');
  };

  const handleRemove = (tag: InputValue) => {
    updateValue(value.filter((x: InputValue) => x !== tag));
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
      <Flex gap={1}>
        {value.map((tag: InputValue, i: number) => (
          <Badge key={i} variant="primary">
            <Flex gap={1}>
              {tag}
              <Cross style={{ cursor: 'pointer' }} onClick={() => handleRemove(tag)} />
            </Flex>
          </Badge>
        ))}
      </Flex>
    </Field.Root>
  );
};

export default Input;
