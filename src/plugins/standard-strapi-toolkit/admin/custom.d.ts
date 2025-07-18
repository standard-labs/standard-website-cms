declare module '@strapi/design-system/*';
declare module '@strapi/design-system';

import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      neutral0: string;
      neutral100: string;
      neutral200: string;
      neutral800: string;
      primary100: string;
      primary600: string;
      danger700: string;
      [key: string]: string;
    };
  }
}
