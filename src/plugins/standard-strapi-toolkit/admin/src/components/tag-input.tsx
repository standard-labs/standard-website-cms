import { Flex } from "@strapi/design-system"
import { TextInput } from "@strapi/design-system";
import { Badge } from "@strapi/design-system"
import { Cross } from "@strapi/icons";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";



type Props = {
  onAdd: (text: string) => void;
}
export const TagInput: React.FC<Props> = ({ onAdd }) => {
  const [input, setInput] = useState<string>('');


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAdd(input);
      setInput('');
    }
  };


  return (
    <TextInput
      name="multi-text-input"
      placeholder="Type and press Enter"
      value={input}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  )
}
