import * as React from "react";
import { useIntl } from "react-intl";

type InputProps = {
  attribute: { type: string };
  disabled: boolean;
  intlLabel: { id: string; defaultMessage: string };
  name: string;
  onChange: (e: { target: { name: string; type: string; value: any } }) => void;
  required: boolean;
  value: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { attribute, disabled, intlLabel, name, onChange, required, value } = props;

  const { formatMessage } = useIntl();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      target: { name, type: attribute.type, value: e.currentTarget.value },
    });
  };

  return (
    <label style={{ display: "block" }}>
      {/* {formatMessage(intlLabel)} */}
      <input
        ref={ref}
        type="color"
        name={name}
        disabled={disabled}
        value={value}
        required={required}
        onChange={handleChange}
        style={{ width: "100%", marginTop: 4 }}
      />
    </label>
  );
});

export default Input;
