import {
  AllArticlesResponse,
  Article,
  CreateArticleRequest,
  CreateArticleResponse,
  DeleteArticleResponse,
  UpdateArticleRequest,
  UpdateArticleResponse,
} from "@articles/types";
import { api, APIError } from "encore.dev/api";
import { db } from "./db";

// Return all articles
export const list = api(
  { expose: true, method: "GET", path: "/list" },
  async ({
    includeDeleted = false,
  }: {
    includeDeleted?: boolean;
  }): Promise<AllArticlesResponse> => {
    const query = includeDeleted
      ? await db.query<Article>`SELECT * FROM article`
      : await db.query<Article>`SELECT * FROM article WHERE deleted_at IS NULL`;

    const articles: Article[] = [];
    for await (const article of query) {
      articles.push(article);
    }
    return { articles };
  }
);

// Return a single article or 404 if not found
export const article = api(
  { expose: true, method: "GET", path: "/article/:id" },
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
  { expose: true, method: "POST", path: "/article" },
  async ({
    title,
    description,
  }: CreateArticleRequest): Promise<CreateArticleResponse> => {
    const result = await db.queryRow<{ id: string }>`
      INSERT INTO article (title, description)
      VALUES (${title}, ${description})
      RETURNING id
    `;
    if (!result) {
      throw APIError.internal("Failed to create article");
    }
    return { id: result.id, message: "Article created" };
  }
);

// Update an existing article
export const update = api(
  { expose: true, method: "PUT", path: "/article/:id" },
  async ({
    id,
    title,
    description,
  }: UpdateArticleRequest): Promise<UpdateArticleResponse> => {
    await db.exec`UPDATE article SET title = ${title}, description = ${description}, updated_at = NOW() WHERE id = ${id}`;
    return { message: "Article updated" };
  }
);

// Delete an existing article
export const remove = api(
  { expose: true, method: "DELETE", path: "/article/:id" },
  async ({ id }: { id: string }): Promise<DeleteArticleResponse> => {
    await db.exec`UPDATE article SET deleted_at = NOW() WHERE id = ${id}`;
    return { message: "Article deleted" };
  }
);

// ==================================================================

// Encore comes with a built-in development dashboard for
// exploring your API, viewing documentation, debugging with
// distributed tracing, and more. Visit your API URL in the browser:
//
//     http://localhost:9400
//

// ==================================================================

// Next steps
//
// 1. Deploy your application to the cloud
//
//     git add -A .
//     git commit -m 'Commit message'
//     git push encore
//
// 2. To continue exploring Encore, check out these topics in docs:
//
//    Building a REST API:   https://encore.dev/docs/ts/tutorials/rest-api
//    Creating Services:      https://encore.dev/docs/ts/primitives/services
//    Creating APIs:         https://encore.dev/docs/ts/primitives/defining-apis
//    Using SQL Databases:        https://encore.dev/docs/ts/primitives/databases
//    Using Pub/Sub:         https://encore.dev/docs/ts/primitives/pubsub
//    Authenticating users:  https://encore.dev/docs/ts/develop/auth
//    Using Cron Jobs: https://encore.dev/docs/ts/primitives/cron-jobs
//    Using Secrets: https://encore.dev/docs/ts/primitives/secrets
