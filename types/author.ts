import { Article } from "./article";

export interface Author {
  id: string;
  name: string;
  avatar: string;
  articles: Article[];
}
