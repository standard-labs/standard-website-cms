import type { Core } from '@strapi/strapi';
declare const landing: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    getWelcomeMessage(): string;
    getTeamMembers(ctx: any): Promise<{
        statusCode: number;
        success: boolean;
        serverUrl: string;
        message: string;
        founders: any;
        humans: any;
        aiAgents: any;
    }>;
};
export default landing;
