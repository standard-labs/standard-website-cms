import React from "react";
import { Box, Field, Flex, Button, Divider } from "@strapi/design-system";
import { Plus, Trash } from "@strapi/icons";
import { useField } from "@strapi/strapi/admin";
import { useIntl } from "react-intl";
// import { TagInput } from "../../components/tag-input";
import { TagInput } from "../../components/tag-input";
import { TagView } from "../../components/tag-view";



type InputType = string;

interface RowTagsInputProps {
  label: string;
  name: string;
  intlLabel: { id: string; defaultMessage: string };
  description?: { id: string; defaultMessage: string };
  attribute: { type: string };
}

const RowTagsInput: React.FC<RowTagsInputProps> = ({ label, name, intlLabel, description, attribute }) => {
  const { formatMessage } = useIntl();
  const { onChange, value = [[]], error } = useField<InputType[][]>(name);


  const updateValue = (newValue: any) => {
    onChange({ target: { name, value: newValue, type: attribute.type } } as any);
  }

  const handleAddTag = (rowIndex: number, tag: InputType) => {
    const trimmed = tag.trim();
    if (trimmed) {
      const newValue = [...value];
      if (!newValue[rowIndex]) newValue[rowIndex] = [];
      if (!newValue[rowIndex].includes(trimmed)) {
        newValue[rowIndex] = [...newValue[rowIndex], trimmed];
        updateValue(newValue);
      }
    }
  };

  const handleRemoveTag = (rowIndex: number, tag: InputType) => {
    const newValue = [...value];
    newValue[rowIndex] = newValue[rowIndex].filter((t) => t !== tag);
    updateValue(newValue);
  };

  const handleAddRow = () => {
    updateValue([...value, []]);
  };

  const handleRemoveRow = (rowIndex: number) => {
    const newValue = value.filter((_, i) => i !== rowIndex);
    updateValue(newValue);
  };


  return (
    <Field.Root
      id={name}
      name={name}
      hint={description?.defaultMessage}
      error={error}
    >
      <Flex direction="column" alignItems="stretch" gap={2}>
        <Field.Label>{intlLabel?.id ? formatMessage(intlLabel) : label}</Field.Label>

        {value.map((row, rowIndex) => (
          <Flex key={rowIndex} direction="column" gap={1}>
            {rowIndex > 0 && (<Divider style={{ width: '100%' }} />)}
            <Flex direction="row" gap={2} style={{ width: '100%' }}>
              <Box style={{ width: '100%' }}>
                <TagInput onAdd={(val: string) => handleAddTag(rowIndex, val)} />
              </Box>
              <Button
                variant="danger-light"
                onClick={() => handleRemoveRow(rowIndex)}
              >
                <Trash />
              </Button>
            </Flex>
            <Box style={{ width: '100%' }}>
              <Flex gap={1} wrap="wrap">
                {row.map((tag, tagIndex) => (
                  <TagView key={tagIndex} text={tag} onRemove={() => handleRemoveTag(rowIndex, tag)} />
                ))}
              </Flex>
            </Box>
          </Flex>
        ))}

        <Flex>
          <Button
            variant="secondary"
            startIcon={<Plus />}
            onClick={handleAddRow}
            fullWidth
          >
            Add Row
          </Button>
        </Flex>
        <Field.Hint />
        <Field.Error />
      </Flex>
    </Field.Root>
  );
};

export default RowTagsInput;
