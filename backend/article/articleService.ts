import { articleRepository } from "@article/articleRepository";
import {
  Article,
  CreateArticleRequest,
  DeleteArticleResponse,
  PublishArticleEvent,
  PublishArticleResponse,
  UpdateArticleRequest,
  UpdateArticleResponse,
} from "@article/types";
import log from "encore.dev/log";
import { Topic } from "encore.dev/pubsub";

export const PublishedArticleTopic = new Topic<PublishArticleEvent>(
  "published-article",
  {
    deliveryGuarantee: "at-least-once",
  }
);

class ArticleService {
  async get(id: string): Promise<Article> {
    return await articleRepository.findById(id);
  }

  async list(
    includeDeleted?: boolean,
    status?: Article["status"],
    userId?: string
  ): Promise<Article[]> {
    return await articleRepository.list(includeDeleted, status, userId);
  }

  async create(data: CreateArticleRequest): Promise<Article> {
    return await articleRepository.create(data);
  }

  async update(params: UpdateArticleRequest): Promise<UpdateArticleResponse> {
    await articleRepository.update(params);
    return { message: "Article updated" };
  }

  async delete(id: string): Promise<DeleteArticleResponse> {
    await articleRepository.delete(id);
    return { message: "Article deleted" };
  }

  async publish(id: string, userId: string): Promise<PublishArticleResponse> {
    // Update the article status with author verification
    await articleRepository.publish(id, userId);

    // Publish to pubsub
    log.info("Publishing article to pubsub", { articleId: id });
    const messageId = await PublishedArticleTopic.publish({
      articleId: id,
    });

    log.info("Successfully published article to pubsub", {
      articleId: id,
      messageId,
    });

    return { message: "Article published" };
  }
}

export const articleService = new ArticleService();
