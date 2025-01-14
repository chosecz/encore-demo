import { GetUserResponse } from "@user/user.interfaces";
import { Query } from "encore.dev/api";
import { Max, Min } from "encore.dev/validate";

export interface CreateArticleRequest {
  // Title of the article
  title: string;
  // Description of the article
  description: string;
  // ID of the author
  author_id: string;
  // Public URL of the article image
  image_url?: string;
  // Bucket key of the article image
  image_bucket_key?: string;
}

export interface CreateArticleResponse {
  // ID of the article
  id: string;
  // Message of the response
  message: string;
}

export interface Article {
  // ID of the article
  id: string;
  // Title of the article
  title: string;
  // Description of the article
  description: string;
  // Status of the article
  status: "draft" | "published" | "archived";
  // ID of the author
  author_id: string;
  // Date the article was created
  created_at: string;
  // Date the article was last updated
  updated_at: string;
  // Date the article was deleted
  deleted_at: string | null;
  // Public URL of the article image
  image_url?: string;
  // Bucket key of the article image
  image_bucket_key?: string;
}

export interface ArticleResponse extends Article {
  // Author of the article
  author: GetUserResponse;
}

export interface UpdateArticleRequest {
  id: string;
  // Title of the article
  title: string;
  // Description of the article
  description: string;
  // Public URL of the article image
  image_url?: string;
  // Bucket key of the article image
  image_bucket_key?: string;
}

export interface UpdateArticleResponse {
  // Message of the response
  message: string;
}

export interface DeleteArticleResponse {
  // Message of the response
  message: string;
}

export interface ListArticlesRequest {
  // Whether to include deleted articles
  includeDeleted?: boolean;
  // Status of the articles to include
  status?: "draft" | "published" | "archived";
  // Limit the number of articles to return
  limit?: 10 | (Query<number> & Max<10>);
  // Offset the number of articles to return
  offset?: 0 | (Query<number> & Min<0>);
}

export interface PublishArticleResponse {
  // Message of the response
  message: string;
}

export interface ListArticlesResponse {
  // Articles
  articles: ArticleResponse[];
}

export interface PublishArticleEvent {
  // ID of the article
  articleId: string;
}

export interface PublishedArticlesCountResponse {
  // Count of published articles
  count: number;
}

export interface FileUploadResponse {
  // Whether the file upload was successful
  success: boolean;
  // Original filename of the file
  originalFilename: string;
  // Filename of the file in the bucket
  filename: string;
  // MIME type of the file
  mimeType: string;
  // Public URL of the file
  publicUrl: string;
  // Error message if the file upload failed
  error?: string;
}
