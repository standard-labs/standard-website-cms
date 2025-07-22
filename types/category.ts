import { Article } from "./article";

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  articles: Article[];
}
