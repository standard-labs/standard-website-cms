import { Article } from "./article";

export interface Category {
  name: string;
  slug: string;
  description: string;
  articles: Article[];
}
