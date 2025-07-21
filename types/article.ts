import { Author } from "./author";
import { Category } from "./category";

export interface Article {
  title: string;
  slug: string;
  description: string;
  cover: string;
  reading_time: number;
  content: JSON;
  author: Author;
  category: Category;
  tags: string[];
}
