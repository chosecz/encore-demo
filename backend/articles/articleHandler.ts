import { api } from "encore.dev/api";
import { errorHandler } from "../shared/errors";
import { articleService } from "./articleService";
import {
  Article,
  CreateArticleRequest,
  DeleteArticleResponse,
  ListArticlesRequest,
  PublishArticleResponse,
  UpdateArticleRequest,
  UpdateArticleResponse,
} from "./types";

export const list = api(
  { expose: true, method: "GET", path: "/articles" },
  async (params: ListArticlesRequest) => {
    try {
      const articles = await articleService.list(
        params.includeDeleted,
        params.status
      );
      return { articles };
    } catch (error) {
      return errorHandler(error, "Failed to list articles");
    }
  }
);

export const create = api(
  { expose: true, method: "POST", path: "/articles" },
  async (data: CreateArticleRequest) => {
    try {
      return await articleService.create(data);
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
      return await articleService.update(params);
    } catch (error) {
      return errorHandler(error, "Failed to update article");
    }
  }
);

export const remove = api(
  { expose: true, method: "DELETE", path: "/articles/:id" },
  async ({ id }: { id: string }): Promise<DeleteArticleResponse> => {
    try {
      return await articleService.delete(id);
    } catch (error) {
      return errorHandler(error, "Failed to delete article");
    }
  }
);

export const publish = api(
  { expose: true, method: "POST", path: "/articles/:id/publish" },
  async ({ id }: { id: string }): Promise<PublishArticleResponse> => {
    try {
      return await articleService.publish(id);
    } catch (error) {
      return errorHandler(error, "Failed to publish article", {
        articleId: id,
      });
    }
  }
);
