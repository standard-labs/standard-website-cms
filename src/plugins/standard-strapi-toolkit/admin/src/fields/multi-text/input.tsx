import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Field, Stack, Badge, Box, TextInput } from '@strapi/design-system';
import { Cross } from '@strapi/icons';
import { useField } from '@strapi/strapi/admin';
import type { FieldProps } from '@strapi/types';

interface InputProps {
  name: string;
  intlLabel: { defaultMessage: string };
  description?: { defaultMessage: string };
  required?: boolean;
  attribute: { type: string };
}

const Input: React.FC<InputProps> = ({ name, intlLabel, description, required, attribute }) => {
  const { value = [], onChange, error } = useField<string[]>({ name }) as FieldProps<string[]>;
  const [input, setInput] = useState<string>('');

  const handleAdd = () => {
    const trimmed = input.trim();
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

  //   return (
  //   <div>
  //     Another
  //   </div>
  // )

  return (
    <Field
      name={name}
      hint={description?.defaultMessage}
      error={error}
      id={name}
      required={required}
      label={intlLabel?.defaultMessage}
    >
      <Stack spacing={2}>
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
      </Stack>
    </Field>
  );
};

export default Input;
