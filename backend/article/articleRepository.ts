import { db } from "@article/db";
import {
  Article,
  CreateArticleRequest,
  UpdateArticleRequest,
} from "@article/types";
import { APIError } from "encore.dev/api";
import log from "encore.dev/log";

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

  async list(
    includeDeleted?: boolean,
    status?: Article["status"],
    userID?: string
  ): Promise<Article[]> {
    let query;
    if (status && includeDeleted) {
      query = await db.query<Article>`
          SELECT * FROM article
          WHERE status = ${status}
          ORDER BY created_at DESC
        `;
    } else if (status) {
      query = await db.query<Article>`
          SELECT * FROM article
          WHERE status = ${status}
          AND deleted_at IS NULL
          ORDER BY created_at DESC
        `;
    } else if (includeDeleted) {
      query = await db.query<Article>`
          SELECT * FROM article
          ORDER BY created_at DESC
        `;
    } else {
      query = await db.query<Article>`
          SELECT * FROM article
          WHERE deleted_at IS NULL
          ORDER BY created_at DESC
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

  async publish(id: string, userId: string): Promise<void> {
    // get article
    const article = await this.findById(id);

    // check if user is the author
    if (article.author_id !== userId) {
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
}

export const articleRepository = new ArticleRepository();
