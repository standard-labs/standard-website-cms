import { Field, Flex } from "@strapi/design-system";
import { useField } from "@strapi/strapi/admin";
import * as React from "react";
import { useIntl } from "react-intl";

type InputProps = {
  label: string;
  attribute: { type: string };
  disabled: boolean;
  intlLabel: { id: string; defaultMessage: string };
  name: string;
  required: boolean;
  description?: { id: string; defaultMessage: string };
  hint?: string;
  placeholder?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    attribute,
    description,
    disabled,
    intlLabel,
    name,
    required,
    hint,
    placeholder
  } = props;

  const { formatMessage } = useIntl();

  const field = useField(name);

  if (!field) {
    console.error(`Field "${name}" is not properly initialized in form context`);
    return null;
  }

  const { onChange, value = '', error } = field;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange({
        target: {
          name,
          type: attribute.type,
          value: e.currentTarget.value
        }
      } as any);
    }
  };

  return (
    <Field.Root
      id={name}
      name={name}
      hint={description?.defaultMessage || hint}
      error={error}
      required={required}
    >
      <Flex direction="column" alignItems="stretch" gap={2}>
        <Field.Label>{intlLabel?.id ? formatMessage(intlLabel) : label}</Field.Label>
        <Field.Input
          ref={ref}
          type="text"
          name={name}
          disabled={disabled}
          value={value || ''}
          required={required}
          onChange={handleChange}
          placeholder={placeholder || "e.g., AArrowDown"}
          style={{ width: "100%", height: '38px', padding: '8px' }}
        />
        <div>From https://lucide.dev/icons/ i.e AArrowDown</div>
        <Field.Error />
      </Flex>
    </Field.Root>
  );
});

Input.displayName = 'LucideIconInput';

export default Input;
