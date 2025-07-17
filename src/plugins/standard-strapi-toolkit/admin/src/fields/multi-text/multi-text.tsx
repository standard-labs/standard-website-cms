import React, { useState } from 'react';
import { Badge, TextInput } from '@strapi/design-system';

const MultiText = ({ name, onChange, value = [], ...rest }: any) => {
  // const handleChange = (newValue: string[]) => {
  //   onChange({ target: { name, value: newValue } });
  // };

  const [input, setInput] = useState('');

  const addTag = () => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInput('');
    }
  };

  const removeTag = (tag: string) => {
    onChange(value.filter(t => t !== tag));
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
        {value.map(tag => (
          <Badge key={tag} onClick={() => removeTag(tag)}>{tag} ✕</Badge>
        ))}
      </div>
      <TextInput
        placeholder="Type and press Enter"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
          }
        }}
      />
    </div>
  );
};

export default MultiText;
