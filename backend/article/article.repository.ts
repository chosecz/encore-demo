import { db } from "@article/article.db";
import {
  Article,
  ArticleResponse,
  CreateArticleRequest,
  ListArticlesRequest,
  UpdateArticleRequest,
} from "@article/article.interfaces";
import { GetUserResponse } from "@user/user.interfaces";
import { APIError } from "encore.dev/api";
import log from "encore.dev/log";
import { getAuthData } from "~encore/auth";
import { user } from "~encore/clients";

export class ArticleRepository {
  async findById(id: string): Promise<ArticleResponse> {
    const article = await db.queryRow<ArticleResponse>`
      SELECT * FROM article WHERE id = ${id} AND deleted_at IS NULL
    `;
    if (!article) {
      throw APIError.notFound("Article not found").withDetails({
        articleId: id,
      });
    }
    const author = await user.getUser({ id: article.author_id });
    return { ...article, author };
  }

  async list({
    includeDeleted = false,
    status,
    offset = 0,
    limit = 10,
  }: ListArticlesRequest): Promise<ArticleResponse[]> {
    const { userID = null } = getAuthData() || {};
    const _articles = await this.buildArticleListQuery(
      userID,
      includeDeleted,
      status,
      offset,
      limit
    );

    const articles: ArticleResponse[] = [];
    const authors = new Map<string, GetUserResponse>();

    for await (const article of _articles) {
      if (!authors.has(article.author_id)) {
        const author = await user.getUser({ id: article.author_id });
        authors.set(article.author_id, author);
      }
      articles.push({ ...article, author: authors.get(article.author_id)! });
    }

    return articles;
  }

  async create(params: CreateArticleRequest): Promise<Article> {
    log.info("Creating article", { params });
    let result: Article | null = null;
    if (params.image_url && params.image_bucket_key) {
      result = await db.queryRow<Article>`
        INSERT INTO article (title, description, image_url, image_bucket_key, author_id, created_at)
        VALUES (${params.title}, ${params.description}, ${params.image_url}, ${params.image_bucket_key}, ${params.author_id}, NOW())
        RETURNING *
      `;
    } else {
      result = await db.queryRow<Article>`
        INSERT INTO article (title, description, author_id, created_at)
        VALUES (${params.title}, ${params.description}, ${params.author_id}, NOW())
        RETURNING *
      `;
    }

    if (!result) {
      throw APIError.internal("Failed to create article");
    }
    return result;
  }

  async update(params: UpdateArticleRequest): Promise<void> {
    log.info("Updating article", { articleId: params.id });
    if (params.image_url && params.image_bucket_key) {
      await db.exec`
        UPDATE article
        SET title = ${params.title},
            description = ${params.description},
            image_url = ${params.image_url},
            image_bucket_key = ${params.image_bucket_key},
            updated_at = NOW()
        WHERE id = ${params.id} AND deleted_at IS NULL
      `;
    } else {
      await db.exec`
        UPDATE article
        SET title = ${params.title},
            description = ${params.description},
            updated_at = NOW()
        WHERE id = ${params.id} AND deleted_at IS NULL
      `;
    }
  }

  async delete(id: string): Promise<void> {
    log.info("Deleting article", { articleId: id });
    await db.exec`
      UPDATE article
      SET deleted_at = NOW()
      WHERE id = ${id} AND deleted_at IS NULL
    `;
  }

  async publish(id: string): Promise<void> {
    // update article status
    log.info("Updating article status to published", { articleId: id });
    await db.exec`
      UPDATE article
      SET status = 'published',
          updated_at = NOW()
      WHERE id = ${id} AND deleted_at IS NULL
    `;
  }

  async publishedArticlesCount(): Promise<number> {
    const result = await db.queryRow<{ count: number }>`
      SELECT COUNT(*) as count FROM article WHERE status = 'published' AND deleted_at IS NULL
    `;
    return result?.count || 0;
  }

  private async buildArticleListQuery(
    userID: string | null,
    includeDeleted?: boolean,
    status?: Article["status"],
    offset: number = 0,
    limit: number = 10
  ): Promise<AsyncGenerator<Article>> {
    // if userID is provided, build query for user's articles
    if (userID) {
      if (includeDeleted && status) {
        return db.query<Article>`
          SELECT * FROM article
          WHERE (author_id = ${userID} AND status = ${status})
          ORDER BY created_at DESC
          OFFSET ${offset}
          LIMIT ${limit}
        `;
      }

      if (includeDeleted) {
        return db.query<Article>`
        SELECT * FROM article
        WHERE author_id = ${userID}
        ORDER BY created_at DESC
        OFFSET ${offset}
        LIMIT ${limit}
      `;
      }

      if (status) {
        return db.query<Article>`
          SELECT * FROM article
          WHERE (author_id = ${userID} AND status = ${status})
          AND deleted_at IS NULL
          ORDER BY created_at DESC
          OFFSET ${offset}
          LIMIT ${limit}
        `;
      }

      return db.query<Article>`
        SELECT * FROM article
        WHERE (author_id = ${userID} AND deleted_at IS NULL)
        OR (status = 'published')
        ORDER BY created_at DESC
        OFFSET ${offset}
        LIMIT ${limit}
      `;
    }

    if (status) {
      return db.query<Article>`
        SELECT * FROM article
        WHERE status = ${status}
        AND deleted_at IS NULL
        ORDER BY created_at DESC
        OFFSET ${offset}
        LIMIT ${limit}
      `;
    }

    // Default case: show only published, non-deleted articles
    return db.query<Article>`
        SELECT * FROM article
        WHERE status = 'published'
        AND deleted_at IS NULL
        ORDER BY created_at DESC
        OFFSET ${offset}
        LIMIT ${limit}
      `;
  }
}

export const articleRepository = new ArticleRepository();
