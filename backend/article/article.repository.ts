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
      throw APIError.notFound("Article not found");
    }
    const author = await user.getUser({ id: article.author_id });
    return { ...article, author };
  }

  async list(params: ListArticlesRequest): Promise<ArticleResponse[]> {
    const { userID = null } = getAuthData() || {};

    const _articles = await this.buildArticleListQuery(
      userID,
      params.includeDeleted,
      params.status,
      params.offset,
      params.limit
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

  async create(data: CreateArticleRequest): Promise<Article> {
    // check if user exists
    const userExists = await user.getUser({ id: data.author_id });
    if (!userExists) {
      throw APIError.failedPrecondition(
        `User with id ${data.author_id} not found`
      );
    }

    // create article
    const result = await db.queryRow<Article>`
      INSERT INTO article (title, description, author_id, created_at)
      VALUES (${data.title}, ${data.description}, ${data.author_id}, NOW())
      RETURNING *
    `;
    if (!result) {
      throw APIError.internal("Failed to create article");
    }
    return result;
  }

  async update(params: UpdateArticleRequest): Promise<void> {
    const { userID = null } = getAuthData() || {};

    const article = await this.findById(params.id);
    if (article.author_id !== userID) {
      throw APIError.permissionDenied(
        "Only the author can update this article"
      );
    }

    await db.exec`
      UPDATE article
      SET title = ${params.title},
          description = ${params.description},
          updated_at = NOW()
      WHERE id = ${params.id} AND deleted_at IS NULL
    `;
  }

  async delete(id: string): Promise<void> {
    const { userID = null } = getAuthData() || {};

    const article = await this.findById(id);
    if (article.author_id !== userID) {
      throw APIError.permissionDenied(
        "Only the author can delete this article"
      );
    }

    await db.exec`
      UPDATE article
      SET deleted_at = NOW()
      WHERE id = ${id} AND deleted_at IS NULL
    `;
  }

  async publish(id: string): Promise<void> {
    // get article
    const article = await this.findById(id);

    // get user id
    const { userID = null } = getAuthData() || {};

    // check if user is the author
    if (article.author_id !== userID) {
      throw APIError.permissionDenied(
        "Only the author can publish this article"
      );
    }

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
