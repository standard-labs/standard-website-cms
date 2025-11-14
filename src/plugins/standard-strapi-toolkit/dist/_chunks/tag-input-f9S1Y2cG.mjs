import { jsx, jsxs } from "react/jsx-runtime";
import { Badge, Flex, TextInput } from "@strapi/design-system";
import { Cross } from "@strapi/icons";
import { useState } from "react";
const TagView = ({ text, onRemove }) => {
  return /* @__PURE__ */ jsx(Badge, { children: /* @__PURE__ */ jsxs(Flex, { gap: 1, children: [
    text,
    /* @__PURE__ */ jsx(Cross, { style: { cursor: "pointer" }, onClick: () => onRemove() })
  ] }) });
};
const TagInput = ({ onAdd, ...other }) => {
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onAdd(input);
      setInput("");
    }
  };
  return /* @__PURE__ */ jsx(
    TextInput,
    {
      name: "multi-text-input",
      placeholder: "Type and press Enter",
      value: input,
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      ...other
    }
  );
};
export {
  TagInput as T,
  TagView as a
};
//# sourceMappingURL=tag-input-f9S1Y2cG.mjs.map
