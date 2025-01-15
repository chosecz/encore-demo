import {
  ArticleResponse,
  CreateArticleRequest,
  CreateArticleResponse,
  DeleteArticleRequest,
  DeleteArticleResponse,
  FileUploadResponse,
  GetArticleRequest,
  ListArticlesRequest,
  ListArticlesResponse,
  PublishArticleRequest,
  PublishArticleResponse,
  PublishedArticlesCountResponse,
  UpdateArticleRequest,
  UpdateArticleResponse,
} from "@article/article.interfaces";
import { articleService } from "@article/article.service";
import { api } from "encore.dev/api";

// Gets an article
export const get = api(
  { expose: true, method: "GET", path: "/articles/:id" },
  async ({ id }: GetArticleRequest): Promise<ArticleResponse> => {
    return await articleService.get(id);
  }
);

// Lists articles based on filters
export const list = api(
  { expose: true, method: "GET", path: "/articles" },
  async (params: ListArticlesRequest): Promise<ListArticlesResponse> => {
    return await articleService.list(params);
  }
);

// Creates an article
export const create = api(
  { expose: true, method: "POST", path: "/articles" },
  async (params: CreateArticleRequest): Promise<CreateArticleResponse> => {
    const article = await articleService.create(params);
    return { id: article.id, message: "Article created" };
  }
);

// Updates an article
export const update = api(
  { expose: true, method: "PUT", path: "/articles/:id", auth: true },
  async (params: UpdateArticleRequest): Promise<UpdateArticleResponse> => {
    await articleService.update(params);
    return { message: "Article updated" };
  }
);

// Deletes an article
export const remove = api(
  { expose: true, method: "DELETE", path: "/articles/:id", auth: true },
  async ({ id }: DeleteArticleRequest): Promise<DeleteArticleResponse> => {
    await articleService.delete(id);
    return { message: "Article deleted" };
  }
);

// Publishes an article
export const publish = api(
  { expose: true, method: "POST", path: "/articles/:id/publish", auth: true },
  async ({ id }: PublishArticleRequest): Promise<PublishArticleResponse> => {
    await articleService.publish(id);
    return { message: "Article published" };
  }
);

// Counts the number of published articles
export const count = api(
  { expose: false, method: "GET", path: "/articles/count" },
  async (): Promise<PublishedArticlesCountResponse> => {
    return await articleService.publishedArticlesCount();
  }
);

// Handles file uploads for article photos
export const upload = api.raw(
  { expose: true, method: "POST", path: "/article/upload", bodyLimit: null },
  async (req, res): Promise<FileUploadResponse> => {
    return await articleService.upload(req, res);
  }
);
