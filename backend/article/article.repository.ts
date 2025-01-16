import { db } from "@article/article.db";
import {
  Article,
  ArticleResponse,
  CreateArticleRequest,
  ListArticlesRequest,
  UpdateArticleRequest,
} from "@article/article.interfaces";
import { articles } from "@article/article.schema";
import { GetUserResponse } from "@user/user.interfaces";
import { and, count, desc, eq, isNull, or } from "drizzle-orm";
import { APIError } from "encore.dev/api";
import log from "encore.dev/log";
import { getAuthData } from "~encore/auth";
import { user } from "~encore/clients";

export class ArticleRepository {
  async findById(id: string): Promise<ArticleResponse> {
    const [article] = await db
      .select()
      .from(articles)
      .where(eq(articles.id, id));
    if (!article) {
      throw APIError.notFound("Article not found").withDetails({
        articleId: id,
      });
    }
    const author = await user.getUser({ id: article.authorId });
    return { ...article, author };
  }

  async list({
    includeDeleted = false,
    status,
    offset = 0,
    limit = 10,
  }: ListArticlesRequest): Promise<ArticleResponse[]> {
    const { userID = null } = getAuthData() || {};

    const conditions = [];

    // Add user-specific conditions
    if (userID) {
      conditions.push(
        or(eq(articles.authorId, userID), eq(articles.status, "published"))
      );
    }

    // Add status filter if provided
    if (status) {
      conditions.push(eq(articles.status, status));
    }

    // Add soft delete condition unless including deleted
    if (!includeDeleted) {
      conditions.push(isNull(articles.deletedAt));
    }

    const response = await db
      .select()
      .from(articles)
      .where(and(...conditions))
      .orderBy(desc(articles.createdAt))
      .offset(offset)
      .limit(limit);

    const authors = new Map<string, GetUserResponse>();
    const results: ArticleResponse[] = [];

    for (const article of response) {
      if (!authors.has(article.authorId)) {
        const author = await user.getUser({ id: article.authorId });
        authors.set(article.authorId, author);
      }
      results.push({ ...article, author: authors.get(article.authorId)! });
    }

    return results;
  }

  async create(data: CreateArticleRequest): Promise<Article> {
    log.info("Creating article", { data });

    const [result] = await db.insert(articles).values(data).returning();
    if (!result) {
      throw APIError.internal("Failed to create article");
    }

    log.info("Article created", { articleId: result.id });
    return result;
  }

  async update(data: UpdateArticleRequest): Promise<void> {
    log.info("Updating article", { articleId: data.id });

    await db.update(articles).set(data).where(eq(articles.id, data.id));

    log.info("Article updated", { articleId: data.id });
  }

  async delete(id: string): Promise<void> {
    log.info("Deleting article", { articleId: id });

    await db
      .update(articles)
      .set({ deletedAt: new Date().toISOString() })
      .where(eq(articles.id, id));

    log.info("Article deleted", { articleId: id });
  }

  async publish(id: string): Promise<void> {
    log.info("Publishing article", { articleId: id });

    await db
      .update(articles)
      .set({ status: "published", updatedAt: new Date().toISOString() })
      .where(eq(articles.id, id));

    log.info("Article published", { articleId: id });
  }

  async publishedArticlesCount(): Promise<number> {
    const [result] = await db
      .select({ count: count() })
      .from(articles)
      .where(and(eq(articles.status, "published"), isNull(articles.deletedAt)));

    return result?.count || 0;
  }
}

export const articleRepository = new ArticleRepository();
