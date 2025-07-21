import { Article } from "./article";

export interface Author {
  name: string;
  avatar: string;
  articles: Article[];
}
