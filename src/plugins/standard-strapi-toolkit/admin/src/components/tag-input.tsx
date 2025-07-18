import type { ComponentProps } from 'react';
import { TextInput } from "@strapi/design-system";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";



type Props = ComponentProps<typeof TextInput> & {
  onAdd: (text: string) => void;
}
export const TagInput: React.FC<Props> = ({ onAdd, ...other }) => {
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
      {...other}
    />
  )
}
