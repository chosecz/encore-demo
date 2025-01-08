import { api, APIError } from "encore.dev/api";
import { db } from "./db";
import {
  AllArticlesResponse,
  Article,
  CreateArticleRequest,
  CreateArticleResponse,
  DeleteArticleResponse,
  PublishArticleResponse,
  UpdateArticleRequest,
  UpdateArticleResponse,
} from "./types";

// Return all articles
export const list = api(
  { expose: true, method: "GET", path: "/articles" },
  async ({
    includeDeleted = false,
  }: {
    includeDeleted?: boolean;
  }): Promise<AllArticlesResponse> => {
    try {
      const query = includeDeleted
        ? await db.query<Article>`SELECT * FROM article`
        : await db.query<Article>`SELECT * FROM article WHERE deleted_at IS NULL`;

      const articles: Article[] = [];
      for await (const article of query) {
        articles.push(article);
      }
      return { articles };
    } catch (error) {
      throw APIError.internal("Failed to list articles").withDetails({
        message: (error as Error).message,
      });
    }
  }
);

// Return a single article or 404 if not found
export const article = api(
  { expose: true, method: "GET", path: "/articles/:id" },
  async ({ id }: { id: string }): Promise<Article> => {
    const article =
      await db.queryRow<Article>`SELECT * FROM article WHERE id = ${id} AND deleted_at IS NULL`;
    if (!article) {
      throw APIError.notFound("Article not found");
    }
    return article;
  }
);

// Create a new article
export const create = api(
  { expose: true, method: "POST", path: "/articles" },
  async ({
    title,
    description,
  }: CreateArticleRequest): Promise<CreateArticleResponse> => {
    try {
      const result = await db.queryRow<{ id: string }>`
        INSERT INTO article (title, description)
        VALUES (${title}, ${description})
        RETURNING id
    `;
      if (!result) {
        throw APIError.internal("Failed to create article");
      }
      return { id: result.id, message: "Article created" };
    } catch (error) {
      throw APIError.internal("Failed to create article").withDetails({
        message: (error as Error).message,
      });
    }
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
    try {
      await db.exec`UPDATE article SET title = ${title}, description = ${description}, updated_at = NOW() WHERE id = ${id}`;
      return { message: "Article updated" };
    } catch (error) {
      throw APIError.internal("Failed to update article").withDetails({
        message: (error as Error).message,
      });
    }
  }
);

export const publish = api(
  { expose: true, method: "POST", path: "/articles/:id/publish" },
  async ({ id }: { id: string }): Promise<PublishArticleResponse> => {
    try {
      await db.exec`UPDATE article SET status = 'published', updated_at = NOW() WHERE id = ${id}`;
      return { message: "Article published" };
    } catch (error) {
      throw APIError.internal("Failed to publish article").withDetails({
        message: (error as Error).message,
      });
    }
  }
);

// Delete an existing article
export const remove = api(
  { expose: true, method: "DELETE", path: "/articles/:id" },
  async ({ id }: { id: string }): Promise<DeleteArticleResponse> => {
    try {
      await db.exec`UPDATE article SET deleted_at = NOW() WHERE id = ${id}`;
      return { message: "Article deleted" };
    } catch (error) {
      throw APIError.internal("Failed to delete article").withDetails({
        message: (error as Error).message,
      });
    }
  }
);
