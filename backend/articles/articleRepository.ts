import { db } from "./db";
import { Article, CreateArticleRequest, CreateArticleResponse } from "./types";

export class ArticleRepository {
  async findById(id: string): Promise<Article | null> {
    return db.queryRow<Article>`SELECT * FROM article WHERE id = ${id}`;
  }

  async findAll(includeDeleted: boolean, status?: string): Promise<Article[]> {
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

  async create(data: CreateArticleRequest): Promise<CreateArticleResponse> {
    const result = await db.queryRow<{ id: string }>`
      INSERT INTO article (title, description)
      VALUES (${data.title}, ${data.description})
      RETURNING id
    `;
    if (!result) {
      throw new Error("Failed to create article");
    }
    return { id: result.id, message: "Article created" };
  }
}

export const articleRepository = new ArticleRepository();
