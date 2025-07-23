/// <reference types="react" />
declare const _default: {
    name: string;
    type: string;
    icon: import("react").FC<{}>;
    intlLabel: {
        id: string;
        defaultMessage: string;
    };
    intlDescription: {
        id: string;
        defaultMessage: string;
    };
    components: {
        Input: () => Promise<typeof import("./input")>;
    };
    options: {
        base: {
            sectionTitle: null;
            items: ({
                name: string;
                type: string;
                intlLabel: {
                    id: string;
                    defaultMessage: string;
                };
                description: {
                    id: string;
                    defaultMessage: string;
                };
                placeholder: {
                    id: string;
                    defaultMessage: string;
                };
                defaultValue?: undefined;
            } | {
                name: string;
                type: string;
                intlLabel: {
                    id: string;
                    defaultMessage: string;
                };
                description: {
                    id: string;
                    defaultMessage: string;
                };
                defaultValue: string;
                placeholder?: undefined;
            })[];
        }[];
        advanced: {
            sectionTitle: {
                id: string;
                defaultMessage: string;
            };
            items: {
                name: string;
                type: string;
                intlLabel: {
                    id: string;
                    defaultMessage: string;
                };
                description: {
                    id: string;
                    defaultMessage: string;
                };
            }[];
        }[];
    };
};
export default _default;
