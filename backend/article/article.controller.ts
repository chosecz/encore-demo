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
  TestExternalCallResponse,
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
    return await articleService.update(params);
  }
);

// Deletes an article
export const remove = api(
  { expose: true, method: "DELETE", path: "/articles/:id", auth: true },
  async ({ id }: DeleteArticleRequest): Promise<DeleteArticleResponse> => {
    return await articleService.delete(id);
  }
);

// Publishes an article
export const publish = api(
  { expose: true, method: "POST", path: "/articles/:id/publish", auth: true },
  async ({ id }: PublishArticleRequest): Promise<PublishArticleResponse> => {
    return await articleService.publish(id);
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

export const testExternalCall = api(
  { expose: true, method: "GET", path: "/articles/test-external-call" },
  async (): Promise<TestExternalCallResponse> => {
    const response = await fetch("https://sonic.fly.dev/api/calltest", {
      method: "GET",
      headers: {
        "x-encore-header": "demo value of header from encore",
      },
    });
    const data = await response.json();
    return {
      status: "success",
      message: "External call successful",
      data,
    };
  }
);
