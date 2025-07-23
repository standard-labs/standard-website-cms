import React from "react";
interface RowTagsInputProps {
    label: string;
    name: string;
    intlLabel: {
        id: string;
        defaultMessage: string;
    };
    description?: {
        id: string;
        defaultMessage: string;
    };
    attribute: {
        type: string;
    };
}
declare const RowTagsInput: React.FC<RowTagsInputProps>;
export default RowTagsInput;
