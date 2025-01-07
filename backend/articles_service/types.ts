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
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
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
