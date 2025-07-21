import { Author } from "./author";
import { Category } from "./category";

export interface Article {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover: string;
  reading_time: number;
  content: JSON;
  author: Author['id'];
  category: Category['id'];
  tags: string[];
}
