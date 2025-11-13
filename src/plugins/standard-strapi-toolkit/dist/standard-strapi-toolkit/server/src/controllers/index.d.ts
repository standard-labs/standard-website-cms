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
        articles(ctx: any): Promise<void>;
        articleDetail(ctx: any): Promise<void>;
        books(ctx: any): Promise<void>;
        bookDetail(ctx: any): Promise<void>;
        jobs(ctx: any): Promise<void>;
    };
};
export default _default;
