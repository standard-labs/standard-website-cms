"use strict";
const jsxRuntime = require("react/jsx-runtime");
const designSystem = require("@strapi/design-system");
const icons = require("@strapi/icons");
const React = require("react");
const TagView = ({ text, onRemove }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Badge, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 1, children: [
    text,
    /* @__PURE__ */ jsxRuntime.jsx(icons.Cross, { style: { cursor: "pointer" }, onClick: () => onRemove() })
  ] }) });
};
const TagInput = ({ onAdd, ...other }) => {
  const [input, setInput] = React.useState("");
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
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.TextInput,
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
exports.TagInput = TagInput;
exports.TagView = TagView;
//# sourceMappingURL=tag-input-BmwXG1_C.js.map
