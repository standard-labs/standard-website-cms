import { Article } from "./article";

export interface Author {
  id: number;
  name: string;
  avatar: string;
  articles: Article[];
}
