import type { Core } from '@strapi/strapi';
declare const landing: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    index(ctx: any): void;
    teamMembers(ctx: any): Promise<void>;
    articles(ctx: any): Promise<void>;
    articleDetail(ctx: any): Promise<void>;
    books(ctx: any): Promise<void>;
    bookDetail(ctx: any): Promise<void>;
};
export default landing;
