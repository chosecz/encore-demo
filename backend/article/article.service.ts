import {
  Article,
  ArticleResponse,
  CreateArticleRequest,
  DeleteArticleResponse,
  ListArticlesRequest,
  ListArticlesResponse,
  PublishArticleEvent,
  PublishArticleResponse,
  UpdateArticleRequest,
  UpdateArticleResponse,
} from "@article/article.interfaces";
import { articleRepository } from "@article/article.repository";
import log from "encore.dev/log";
import { Topic } from "encore.dev/pubsub";

export const PublishedArticleTopic = new Topic<PublishArticleEvent>(
  "published-article",
  {
    deliveryGuarantee: "at-least-once",
  }
);

class ArticleService {
  async get(id: string): Promise<ArticleResponse> {
    return await articleRepository.findById(id);
  }

  async list(params: ListArticlesRequest): Promise<ListArticlesResponse> {
    return { articles: await articleRepository.list(params) };
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

  async publish(id: string): Promise<PublishArticleResponse> {
    await articleRepository.publish(id);

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
