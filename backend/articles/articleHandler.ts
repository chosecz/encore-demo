import { api } from "encore.dev/api";
import { errorHandler } from "../shared/errors";
import { articleService } from "./articleService";
import { CreateArticleRequest, ListArticlesRequest } from "./types";

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
    return articleService.create(data);
  }
);
