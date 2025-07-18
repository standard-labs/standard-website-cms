import React, { useState } from "react";
import { Field, Flex, Button, Table, Thead, Tbody, Tr, Th, Td, Badge } from "@strapi/design-system";
import { Plus, Trash, Cross } from "@strapi/icons";
import { useField } from "@strapi/strapi/admin";
import { useIntl } from "react-intl";


type InputType = string;

interface RowTagsInputProps {
  label: string;
  name: string;
  intlLabel: { id: string; defaultMessage: string };
  description?: { id: string; defaultMessage: string };
  required?: boolean;
  attribute: { type: string };
}

const RowTagsInput: React.FC<RowTagsInputProps> = ({ label, name, intlLabel, description, required, attribute }) => {
  const { formatMessage } = useIntl();
  const { onChange, value = [[]], error } = useField<InputType[][]>(name);
  const [newTagInputs, setNewTagInputs] = useState<InputType[]>([]);

  const updateValue = (newValue: any) => {
    onChange({ target: { name, value: newValue, type: attribute.type } } as any);
  }
  // Initialize input for a new row
  const initializeNewRowInput = () => "";

  // Handle tag addition in a row
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

  // Handle tag removal in a row
  const handleRemoveTag = (rowIndex: number, tag: InputType) => {
    const newGrid = [...value];
    newGrid[rowIndex] = newGrid[rowIndex].filter((t) => t !== tag);
    updateValue(newGrid);
  };

  // Add a new row
  const handleAddRow = () => {
    updateValue([...value, []]);
    setNewTagInputs([...newTagInputs, initializeNewRowInput()]);
  };

  // Remove a row
  const handleRemoveRow = (rowIndex: number) => {
    const newGrid = value.filter((_, i) => i !== rowIndex);
    const newInputs = newTagInputs.filter((_, i) => i !== rowIndex);
    updateValue(newGrid);
    setNewTagInputs(newInputs);
  };

  // Handle input change for a row
  const handleInputChange = (rowIndex: number, newValue: InputType) => {
    const newInputs = [...newTagInputs];
    newInputs[rowIndex] = newValue;
    setNewTagInputs(newInputs);
  };

  // Handle Enter key for adding tags
  const handleKeyDown = (rowIndex: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag(rowIndex, newTagInputs[rowIndex] || "");
    }
  };

  // Initialize newTagInputs for existing rows
  React.useEffect(() => {
    setNewTagInputs(value.map(() => initializeNewRowInput()));
  }, []);

  return (
    <Field.Root
      name={name}
      hint={description?.defaultMessage}
      error={error}
      id={name}
      required={required}
      label={intlLabel?.defaultMessage}
    >
      <Flex direction="column" alignItems="stretch" gap={2}>
        <Field.Label>{intlLabel?.id ? formatMessage(intlLabel) : label}</Field.Label>
        <Table>
          <Thead>
            <Tr>
              <Th>
                <Field.Label>Tag Input</Field.Label>
              </Th>
              <Th>
                <Field.Label>Tags</Field.Label>
              </Th>
              <Th>
                <Field.Label>Actions</Field.Label>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {value.map((row, rowIndex) => (
              <Tr key={rowIndex}>
                <Td>
                  <input
                    type="text"
                    value={newTagInputs[rowIndex] || ""}
                    onChange={(e) => handleInputChange(rowIndex, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(rowIndex, e)}
                    placeholder="Type and press Enter"
                    style={{ width: "100%", padding: "8px" }}
                  />
                </Td>
                <Td>
                  <Flex gap={1} wrap="wrap">
                    {row.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        backgroundColor="neutral200"
                        textColor="neutral800"
                      >
                        <Flex gap={1}>
                          {tag}
                          <Cross
                            style={{ cursor: "pointer" }}
                            onClick={() => handleRemoveTag(rowIndex, tag)}
                          />
                        </Flex>
                      </Badge>
                    ))}
                  </Flex>
                </Td>
                <Td>
                  <Button
                    variant="danger-light"
                    startIcon={<Trash />}
                    onClick={() => handleRemoveRow(rowIndex)}
                  >
                    Remove Row
                  </Button>
                </Td>
              </Tr>
            ))}
            <Tr>
              <Td colSpan={3}>
                <Button
                  variant="secondary"
                  startIcon={<Plus />}
                  onClick={handleAddRow}
                  fullWidth
                >
                  Add Row
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Field.Hint />
        <Field.Error />
      </Flex>
    </Field.Root>
  );
};

export default RowTagsInput;