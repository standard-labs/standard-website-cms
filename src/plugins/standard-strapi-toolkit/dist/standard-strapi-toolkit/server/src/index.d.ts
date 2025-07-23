declare const _default: {
    register: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    bootstrap: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    destroy: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    config: {
        default: {};
        validator(): void;
    };
    controllers: {
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
    routes: {
        'content-api': {
            type: string;
            routes: {
                method: string;
                path: string;
                handler: string;
                /**
                 * Plugin server methods
                 */
                config: {
                    auth: boolean;
                };
            }[];
        };
        landing: {
            type: string;
            routes: {
                method: string;
                path: string;
                handler: string;
                config: {
                    auth: boolean;
                };
            }[];
        };
    };
    services: {
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
    contentTypes: {};
    policies: {};
    middlewares: {};
};
export default _default;
