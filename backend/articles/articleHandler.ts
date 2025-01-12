import { api } from "encore.dev/api";
import { errorHandler } from "../shared/errors";
import { articleService } from "./articleService";
import {
  Article,
  CreateArticleRequest,
  CreateArticleResponse,
  DeleteArticleResponse,
  ListArticlesRequest,
  ListArticlesResponse,
  PublishArticleResponse,
  UpdateArticleRequest,
  UpdateArticleResponse,
} from "./types";

export const list = api(
  { expose: true, method: "GET", path: "/articles" },
  async (params: ListArticlesRequest): Promise<ListArticlesResponse> => {
    try {
      return {
        articles: await articleService.list(
          params.includeDeleted,
          params.status
        ),
      };
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
  async ({ id }: { id: string }): Promise<Article> => {
    try {
      return await articleService.get(id);
    } catch (error) {
      return errorHandler(error, "Failed to get article");
    }
  }
);

export const update = api(
  { expose: true, method: "PUT", path: "/articles/:id" },
  async (params: UpdateArticleRequest): Promise<UpdateArticleResponse> => {
    try {
      await articleService.update(params);
      return { message: "Article updated" };
    } catch (error) {
      return errorHandler(error, "Failed to update article");
    }
  }
);

export const remove = api(
  { expose: true, method: "DELETE", path: "/articles/:id" },
  async ({ id }: { id: string }): Promise<DeleteArticleResponse> => {
    try {
      await articleService.delete(id);
      return { message: "Article deleted" };
    } catch (error) {
      return errorHandler(error, "Failed to delete article");
    }
  }
);

export const publish = api(
  { expose: true, method: "POST", path: "/articles/:id/publish" },
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
