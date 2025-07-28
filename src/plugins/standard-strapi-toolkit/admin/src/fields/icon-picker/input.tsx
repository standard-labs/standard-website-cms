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
};

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, attribute, description, disabled, intlLabel, name, required } = props;
  const { onChange, value = '', error } = useField<''>(name);

  const { formatMessage } = useIntl();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ target: { name, type: attribute.type, value: e.currentTarget.value } } as any);
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
        <Field.Input
          ref={ref}
          type="text"
          name={name}
          disabled={disabled}
          value={value}
          required={required}
          onChange={handleChange}
          style={{ width: "100%", height: '38px', padding: '2px' }}
        />
        <div>From https://lucide.dev/icons/ i.e AArrowDown</div>
        <Field.Hint />
        <Field.Error />
      </Flex>
    </Field.Root>
  );
});

export default Input;
