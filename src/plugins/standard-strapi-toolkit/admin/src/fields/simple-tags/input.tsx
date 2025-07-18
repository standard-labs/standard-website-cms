import React from 'react';
import { Field, Flex } from '@strapi/design-system';
import { useField } from '@strapi/strapi/admin';
import { useIntl } from 'react-intl';
import { TagView } from '../../components/tag-view';
import { TagInput } from '../../components/tag-input';


type InputValue = string;

interface Props {
  label: string;
  name: string;
  intlLabel: { id: string; defaultMessage: string };
  attribute: { type: string };
}

const SimpleTags: React.FC<Props> = ({ label, name, intlLabel, attribute }) => {
  const { formatMessage } = useIntl();
  const { onChange, value = [], error } = useField(name);


  const updateValue = (newValue: InputValue[]) => {
    onChange({ target: { name, value: newValue, type: attribute.type } } as any);
  }

  const handleAdd = (input: InputValue) => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      updateValue([...value, trimmed]);
    }
  };

  const handleRemove = (tag: InputValue) => {
    updateValue(value.filter((x: InputValue) => x !== tag));
  };


  return (
    <Field.Root
      id={name}
      name={name}
      error={error}
      label={intlLabel?.defaultMessage}
    >
      <Flex direction="column" alignItems="stretch" gap={1}>
        <Field.Label>{intlLabel?.id ? formatMessage(intlLabel) : label}</Field.Label>
        <TagInput onAdd={handleAdd} />
        <Field.Hint />
        <Field.Error />
      </Flex>
      <Flex gap={1}>
        {value.map((tag: InputValue) => (
          <TagView key={tag} text={tag} onRemove={() => handleRemove(tag)} />
        ))}
      </Flex>
    </Field.Root>
  );
};

export default SimpleTags;
