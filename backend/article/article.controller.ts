import {
  ArticleResponse,
  CreateArticleRequest,
  CreateArticleResponse,
  DeleteArticleResponse,
  ListArticlesRequest,
  ListArticlesResponse,
  PublishArticleResponse,
  PublishedArticlesCountResponse,
  UpdateArticleRequest,
  UpdateArticleResponse,
} from "@article/article.interfaces";
import { articleService } from "@article/article.service";
import { errorHandler } from "@shared/errors";
import { api } from "encore.dev/api";

export const list = api(
  { expose: true, method: "GET", path: "/articles" },
  async ({
    includeDeleted = false,
    status,
    offset = 0,
    limit = 10,
  }: ListArticlesRequest): Promise<ListArticlesResponse> => {
    try {
      return await articleService.list({
        includeDeleted,
        status,
        offset,
        limit,
      });
    } catch (error) {
      return errorHandler(error, "Failed to list articles");
    }
  }
);

export const create = api(
  { expose: true, method: "POST", path: "/articles" },
  async (data: CreateArticleRequest): Promise<CreateArticleResponse> => {
    try {
      const article = await articleService.create(data);
      return { id: article.id, message: "Article created" };
    } catch (error) {
      return errorHandler(error, "Failed to create article");
    }
  }
);

export const get = api(
  { expose: true, method: "GET", path: "/articles/:id" },
  async ({ id }: { id: string }): Promise<ArticleResponse> => {
    try {
      return await articleService.get(id);
    } catch (error) {
      return errorHandler(error, "Failed to get article", {
        articleId: id,
      });
    }
  }
);

export const update = api(
  { expose: true, method: "PUT", path: "/articles/:id", auth: true },
  async (params: UpdateArticleRequest): Promise<UpdateArticleResponse> => {
    try {
      await articleService.update(params);
      return { message: "Article updated" };
    } catch (error) {
      return errorHandler(error, "Failed to update article", {
        articleId: params.id,
      });
    }
  }
);

export const remove = api(
  { expose: true, method: "DELETE", path: "/articles/:id", auth: true },
  async ({ id }: { id: string }): Promise<DeleteArticleResponse> => {
    try {
      await articleService.delete(id);
      return { message: "Article deleted" };
    } catch (error) {
      return errorHandler(error, "Failed to delete article", {
        articleId: id,
      });
    }
  }
);

export const publish = api(
  { expose: true, method: "POST", path: "/articles/:id/publish", auth: true },
  async ({ id }: { id: string }): Promise<PublishArticleResponse> => {
    try {
      await articleService.publish(id);
      return { message: "Article published" };
    } catch (error) {
      return errorHandler(error, "Failed to publish article", {
        articleId: id,
      });
    }
  }
);

export const count = api(
  { expose: false, method: "GET", path: "/articles/count" },
  async (): Promise<PublishedArticlesCountResponse> => {
    return await articleService.publishedArticlesCount();
  }
);
