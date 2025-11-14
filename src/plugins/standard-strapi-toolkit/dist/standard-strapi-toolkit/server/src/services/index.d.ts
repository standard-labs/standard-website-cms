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
export default _default;
