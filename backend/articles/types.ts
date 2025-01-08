export interface AllArticlesResponse {
  articles: Article[];
}

export interface CreateArticleRequest {
  title: string;
  description: string;
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
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
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

export interface PublishArticleResponse {
  message: string;
}

export interface PublishArticleEvent {
  articleID: string;
}

export interface ListArticlesRequest {
  includeDeleted?: boolean;
  status?: "draft" | "published" | "archived";
}
