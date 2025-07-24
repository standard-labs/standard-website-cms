import { Core } from "@strapi/strapi";

export function getServerUrl(ctx, strapi: Core.Strapi): string {
  const { request } = ctx;
  const isDevelopment = strapi.config.get('environment') === 'development';
  return isDevelopment ? `${request.protocol}://${request.host}` : '';
}
