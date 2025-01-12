import { api, APIError } from "encore.dev/api";
import log from "encore.dev/log";
import { db } from "./db";
import {
  Article,
  DeleteArticleResponse,
  UpdateArticleRequest,
  UpdateArticleResponse,
} from "./types";

// Return a single article or 404 if not found
export const get = api(
  { expose: true, method: "GET", path: "/articles/:id" },
  async ({ id }: { id: string }): Promise<Article> => {
    log.info("Received request to get article", { id });
    const article =
      await db.queryRow<Article>`SELECT * FROM article WHERE id = ${id}`;
    if (!article) {
      log.error("Article not found", { id });
      throw APIError.notFound("Article not found");
    }
    return article;
  }
);

// Update an existing article
export const update = api(
  { expose: true, method: "PUT", path: "/articles/:id" },
  async ({
    id,
    title,
    description,
  }: UpdateArticleRequest): Promise<UpdateArticleResponse> => {
    log.info("Received request to update article", { id, title, description });
    try {
      await db.exec`UPDATE article SET title = ${title}, description = ${description}, updated_at = NOW() WHERE id = ${id}`;
      return { message: "Article updated" };
    } catch (error) {
      log.error("Error updating article", { error });
      throw APIError.internal("Failed to update article").withDetails({
        message: (error as Error).message,
      });
    }
  }
);

// Delete an existing article
export const remove = api(
  { expose: true, method: "DELETE", path: "/articles/:id" },
  async ({ id }: { id: string }): Promise<DeleteArticleResponse> => {
    log.info("Received request to delete article", { id });
    try {
      await db.exec`UPDATE article SET deleted_at = NOW() WHERE id = ${id}`;
      return { message: "Article deleted" };
    } catch (error) {
      log.error("Error deleting article", { error });
      throw APIError.internal("Failed to delete article").withDetails({
        message: (error as Error).message,
      });
    }
  }
);
