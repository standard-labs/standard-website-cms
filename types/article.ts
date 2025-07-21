import { Author } from "./author";
import { Category } from "./category";

export interface Article {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  cover: string;
  reading_time: number;
  blocks: Array<ArticleBlock>;
  author: Author['id'];
  category: Category['id'];
  tags: string[];
  published_at: Date;
}

export interface ArticleBlock {
  __component: 'shared.media' | 'shared.quote' | 'shared.rich-text' | 'shared.slider';
  content: string;
}
