import { Author } from "./author";
import { Category } from "./category";

export interface Article {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  cover: string;
  readingTime: number;
  blocks: Array<ArticleBlock>;
  author: Author;
  category: Category;
  tags: string[];
  publishedOn: Date;
}

export interface ArticleBlock {
  __component: 'shared.media' | 'shared.quote' | 'shared.rich-text' | 'shared.slider';
  content: string;
}
