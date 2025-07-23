declare const _default: {
    controller: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        index(ctx: any): void;
    };
    landing: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        index(ctx: any): void;
        teamMembers(ctx: any): Promise<void>;
    };
};
export default _default;
