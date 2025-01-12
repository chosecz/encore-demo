import { APIError } from "encore.dev/api";
import log from "encore.dev/log";
import { db } from "./db";
import { Article, CreateArticleRequest, UpdateArticleRequest } from "./types";

export class ArticleRepository {
  async findById(id: string): Promise<Article> {
    const article = await db.queryRow<Article>`
      SELECT * FROM article WHERE id = ${id} AND deleted_at IS NULL
    `;
    if (!article) {
      throw APIError.notFound("Article not found");
    }
    return article;
  }

  async list(includeDeleted?: boolean, status?: string): Promise<Article[]> {
    let query;
    if (status && includeDeleted) {
      query = await db.query<Article>`
          SELECT * FROM article
          WHERE status = ${status}
        `;
    } else if (status) {
      query = await db.query<Article>`
          SELECT * FROM article
          WHERE status = ${status}
          AND deleted_at IS NULL
        `;
    } else if (includeDeleted) {
      query = await db.query<Article>`
          SELECT * FROM article
        `;
    } else {
      query = await db.query<Article>`
          SELECT * FROM article
          WHERE deleted_at IS NULL
        `;
    }
    const articles: Article[] = [];
    for await (const article of query) {
      articles.push(article);
    }
    return articles;
  }

  async create(data: CreateArticleRequest): Promise<Article> {
    const result = await db.queryRow<Article>`
      INSERT INTO article (title, description, created_at)
      VALUES (${data.title}, ${data.description}, NOW())
      RETURNING *
    `;
    if (!result) {
      throw APIError.internal("Failed to create article");
    }
    return result;
  }

  async update(params: UpdateArticleRequest): Promise<void> {
    await db.exec`
      UPDATE article
      SET title = ${params.title},
          description = ${params.description},
          updated_at = NOW()
      WHERE id = ${params.id} AND deleted_at IS NULL
    `;
  }

  async delete(id: string): Promise<void> {
    await db.exec`
      UPDATE article
      SET deleted_at = NOW()
      WHERE id = ${id} AND deleted_at IS NULL
    `;
  }

  async publish(id: string): Promise<void> {
    log.info("Updating article status to published", { articleId: id });
    await db.exec`
      UPDATE article
      SET status = 'published',
          updated_at = NOW()
      WHERE id = ${id} AND deleted_at IS NULL
    `;
  }
}

export const articleRepository = new ArticleRepository();
