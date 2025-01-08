import { api, APIError } from "encore.dev/api";
import log from "encore.dev/log";
import { Topic } from "encore.dev/pubsub";
import { db } from "./db";
import {
  AllArticlesResponse,
  Article,
  CreateArticleRequest,
  CreateArticleResponse,
  DeleteArticleResponse,
  PublishArticleEvent,
  PublishArticleResponse,
  UpdateArticleRequest,
  UpdateArticleResponse,
} from "./types";

// Return all articles
export const articles = api(
  { expose: true, method: "GET", path: "/articles" },
  async ({
    includeDeleted = false,
  }: {
    includeDeleted?: boolean;
  }): Promise<AllArticlesResponse> => {
    log.info("Received request to list articles", { includeDeleted });
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
      log.error("Error listing articles", { error });
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

// Create a new article
export const create = api(
  { expose: true, method: "POST", path: "/articles" },
  async ({
    title,
    description,
  }: CreateArticleRequest): Promise<CreateArticleResponse> => {
    log.info("Received request to create article", { title, description });
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
      log.error("Error creating article", { error });
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

export const publish = api(
  { expose: true, method: "POST", path: "/articles/:id/publish" },
  async ({ id }: { id: string }): Promise<PublishArticleResponse> => {
    log.info("Received request to publish article", { id });
    try {
      await db.exec`UPDATE article SET status = 'published', updated_at = NOW() WHERE id = ${id}`;

      // publish to pubsub
      log.info("Publishing article to pubsub", { articleID: id });
      const messageId = await publishArticle.publish({ articleID: id });
      log.info("Published article to pubsub", { articleID: id, messageId });

      return { message: "Article published" };
    } catch (error) {
      log.error("Error publishing article", { error });
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

export const publishArticle = new Topic<PublishArticleEvent>(
  "publish-article",
  {
    deliveryGuarantee: "at-least-once",
  }
);
