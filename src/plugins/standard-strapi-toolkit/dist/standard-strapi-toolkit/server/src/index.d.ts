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
            articles(ctx: any): Promise<void>;
            articleDetail(ctx: any): Promise<void>;
            books(ctx: any): Promise<void>;
            bookDetail(ctx: any): Promise<void>;
            jobs(ctx: any): Promise<void>;
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
                message: string;
                founders: any;
                humans: any;
                aiAgents: any;
                orbitCentralAgent: any;
                orbitPeripheralAgents: any;
            }>;
            getArticles(ctx: any): Promise<{
                statusCode: number;
                success: boolean;
                message: string;
                articles: any;
            }>;
            getArticleDetail(ctx: any): Promise<{
                statusCode: number;
                success: boolean;
                message: string;
                article: any;
            }>;
            getBooks(ctx: any): Promise<{
                statusCode: number;
                success: boolean;
                message: string;
                books: ({
                    id: import("@strapi/types/dist/data").ID;
                } & {
                    [key: string]: any;
                }) | ({
                    id: import("@strapi/types/dist/data").ID;
                } & {
                    [key: string]: any;
                })[];
            }>;
            getBookDetail(ctx: any): Promise<{
                statusCode: number;
                success: boolean;
                message: string;
                book: any;
            }>;
            getJobs(ctx: any): Promise<{
                statusCode: number;
                success: boolean;
                message: string;
                jobs: ({
                    id: import("@strapi/types/dist/data").ID;
                } & {
                    [key: string]: any;
                }) | ({
                    id: import("@strapi/types/dist/data").ID;
                } & {
                    [key: string]: any;
                })[];
            }>;
        };
    };
    contentTypes: {};
    policies: {};
    middlewares: {};
};
export default _default;
