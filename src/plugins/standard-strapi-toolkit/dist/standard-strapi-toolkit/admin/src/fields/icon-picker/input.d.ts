import * as React from "react";
type InputProps = {
    label: string;
    attribute: {
        type: string;
    };
    disabled: boolean;
    intlLabel: {
        id: string;
        defaultMessage: string;
    };
    name: string;
    required: boolean;
    description?: {
        id: string;
        defaultMessage: string;
    };
};
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export default Input;
