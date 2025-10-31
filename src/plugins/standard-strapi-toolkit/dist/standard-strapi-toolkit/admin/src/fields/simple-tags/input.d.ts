import React from 'react';
interface Props {
    label: string;
    name: string;
    intlLabel: {
        id: string;
        defaultMessage: string;
    };
    attribute: {
        type: string;
    };
}
declare const SimpleTags: React.FC<Props>;
export default SimpleTags;
