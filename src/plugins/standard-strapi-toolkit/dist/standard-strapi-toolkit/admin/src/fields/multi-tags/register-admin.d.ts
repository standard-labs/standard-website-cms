/// <reference types="react" />
export declare const FIELD_ID: string;
declare const _default: {
    name: string;
    type: string;
    intlLabel: {
        id: string;
        defaultMessage: string;
    };
    intlDescription: {
        id: string;
        defaultMessage: string;
    };
    icon: import("react").FC<{}>;
    components: {
        Input: () => Promise<typeof import("./input")>;
    };
};
export default _default;
