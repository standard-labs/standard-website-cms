import { Article } from "./article";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  articles: Article[];
}
