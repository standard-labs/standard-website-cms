import React, { useState } from "react";
import { Field, Flex, Button, Table, Thead, Tbody, Tr, Th, Td } from "@strapi/design-system";
import { Plus, Trash } from "@strapi/icons";
import { useField } from "@strapi/strapi/admin";
import { useIntl } from "react-intl";

interface TextMatrixProps {
  label: string;
  name: string;
  intlLabel: { id: string; defaultMessage: string };
  description?: { id: string; defaultMessage: string };
  required?: boolean;
  attribute: { type: string; options?: { columns?: number } };
}

const TextMatrix: React.FC<TextMatrixProps> = ({ label, name, intlLabel, description, required, attribute }) => {
  const { formatMessage } = useIntl();
  const { onChange, value = [], error } = useField<string[][]>(name);
  const [newRow, setNewRow] = useState<string[]>([]);
  const columnCount = attribute.options?.columns || 2; // Default to 2 columns

  const updateValue = (newValue: any) => {
    onChange({ target: { name, value: newValue, type: attribute.type } } as any);
  }

  // Initialize newRow with empty strings based on column count
  const initializeNewRow = () => Array(columnCount).fill("");

  // Handle cell value change
  const handleCellChange = (rowIndex: number, colIndex: number, newValue: string) => {
    const newGrid = [...value];
    if (!newGrid[rowIndex]) newGrid[rowIndex] = initializeNewRow();
    newGrid[rowIndex][colIndex] = newValue;
    updateValue(newGrid);
  };

  // Add a new row
  const handleAddRow = () => {
    if (newRow.every((val) => val.trim() !== "")) {
      updateValue([...value, [...newRow]]);
      setNewRow(initializeNewRow());
    }
  };

  // Remove a row
  const handleRemoveRow = (rowIndex: number) => {
    updateValue(value.filter((_, i) => i !== rowIndex));
  };

  // Handle new row input change
  const handleNewRowChange = (colIndex: number, newValue: string) => {
    const updatedRow = [...newRow];
    updatedRow[colIndex] = newValue;
    setNewRow(updatedRow);
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
      <Flex direction="column" alignItems="stretch" gap={2}>
        <Field.Label>{intlLabel?.id ? formatMessage(intlLabel) : label}</Field.Label>
        <Table>
          <Thead>
            <Tr>
              {Array.from({ length: columnCount }, (_, i) => (
                <Th key={i}>
                  <Field.Label>Column {i + 1}</Field.Label>
                </Th>
              ))}
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {value.map((row, rowIndex) => (
              <Tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <Td key={colIndex}>
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                      style={{ width: "100%", padding: "8px" }}
                    />
                  </Td>
                ))}
                <Td>
                  <Button
                    variant="danger-light"
                    startIcon={<Trash />}
                    onClick={() => handleRemoveRow(rowIndex)}
                  >
                    Remove
                  </Button>
                </Td>
              </Tr>
            ))}
            <Tr>
              {newRow.map((cell, colIndex) => (
                <Td key={colIndex}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleNewRowChange(colIndex, e.target.value)}
                    style={{ width: "100%", padding: "8px" }}
                  />
                </Td>
              ))}
              <Td>
                <Button
                  variant="secondary"
                  startIcon={<Plus />}
                  onClick={handleAddRow}
                  disabled={newRow.some((val) => val.trim() === "")}
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

export default TextMatrix;