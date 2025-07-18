import React, { useEffect, useState } from "react";
import { Box, Field, Flex, Button, Divider } from "@strapi/design-system";
import { Plus, Trash } from "@strapi/icons";
import { useField } from "@strapi/strapi/admin";
import { useIntl } from "react-intl";
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
  const [newTagInputs, setNewTagInputs] = useState<InputType[]>([]);

  const updateValue = (newValue: any) => {
    onChange({ target: { name, value: newValue, type: attribute.type } } as any);
  }
  const initializeNewRowInput = () => "";

  const handleAddTag = (rowIndex: number, tag: InputType) => {
    const trimmed = tag.trim();
    if (trimmed) {
      const newGrid = [...value];
      if (!newGrid[rowIndex]) newGrid[rowIndex] = [];
      if (!newGrid[rowIndex].includes(trimmed)) {
        newGrid[rowIndex] = [...newGrid[rowIndex], trimmed];
        updateValue(newGrid);
      }
      const newInputs = [...newTagInputs];
      newInputs[rowIndex] = "";
      setNewTagInputs(newInputs);
    }
  };

  const handleRemoveTag = (rowIndex: number, tag: InputType) => {
    const newGrid = [...value];
    newGrid[rowIndex] = newGrid[rowIndex].filter((t) => t !== tag);
    updateValue(newGrid);
  };

  const handleAddRow = () => {
    updateValue([...value, []]);
    setNewTagInputs([...newTagInputs, initializeNewRowInput()]);
  };

  const handleRemoveRow = (rowIndex: number) => {
    const newGrid = value.filter((_, i) => i !== rowIndex);
    const newInputs = newTagInputs.filter((_, i) => i !== rowIndex);
    updateValue(newGrid);
    setNewTagInputs(newInputs);
  };

  useEffect(() => {
    setNewTagInputs(value.map(() => initializeNewRowInput()));
  }, []);


  return (
    <Field.Root
      id={name}
      name={name}
      hint={description?.defaultMessage}
      error={error}
      label={intlLabel?.defaultMessage}
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