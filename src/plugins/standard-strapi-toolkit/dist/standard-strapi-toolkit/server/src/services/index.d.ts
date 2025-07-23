declare const _default: {
    service: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        getWelcomeMessage(): string;
    };
    landing: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
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
};
export default _default;
