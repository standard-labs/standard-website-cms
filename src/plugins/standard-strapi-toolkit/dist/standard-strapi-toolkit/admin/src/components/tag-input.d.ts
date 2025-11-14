import type { ComponentProps } from 'react';
import { TextInput } from "@strapi/design-system";
import React from "react";
type Props = ComponentProps<typeof TextInput> & {
    onAdd: (text: string) => void;
};
export declare const TagInput: React.FC<Props>;
export {};
