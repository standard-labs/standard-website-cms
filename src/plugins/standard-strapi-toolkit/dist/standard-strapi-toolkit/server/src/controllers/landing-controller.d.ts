import type { Core } from '@strapi/strapi';
declare const landing: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    index(ctx: any): void;
    teamMembers(ctx: any): Promise<void>;
};
export default landing;
