import { GetUserResponse } from "@user/types";
import { Query } from "encore.dev/api";
import { Max, Min } from "encore.dev/validate";

export interface AllArticlesResponse {
  articles: Article[];
}

export interface CreateArticleRequest {
  title: string;
  description: string;
  author_id: string;
}

export interface CreateArticleResponse {
  id: string;
  message: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  status: "draft" | "published" | "archived";
  author_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  author: GetUserResponse;
}

export interface UpdateArticleRequest {
  id: string;
  title: string;
  description: string;
}

export interface UpdateArticleResponse {
  message: string;
}

export interface DeleteArticleResponse {
  message: string;
}

export interface ListArticlesRequest {
  includeDeleted?: boolean;
  status?: "draft" | "published" | "archived";
  limit?: Query<number> & Max<10>;
  offset?: Query<number> & Min<0>;
}

export interface PublishArticleResponse {
  message: string;
}

export interface ListArticlesResponse {
  articles: Article[];
}

export interface PublishArticleEvent {
  articleId: string;
}
