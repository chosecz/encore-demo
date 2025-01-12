import { api } from "encore.dev/api";
import log from "encore.dev/log";
import { Topic } from "encore.dev/pubsub";
import { errorHandler } from "../shared/errors";
import { db } from "./db";
export const publish = api(
  { expose: true, method: "POST", path: "/articles/:id/publish" },
  async ({ id }: { id: string }): Promise<PublishArticleResponse> => {
    try {
      log.info("Starting article publication process", { articleId: id });
      await db.exec`UPDATE article SET status = 'published', updated_at = NOW() WHERE id = ${id}`;
      log.info("Article status updated to published", { articleId: id });

      // publish to pubsub
      log.info("Publishing article to pubsub", { articleId: id });
      const messageId = await PublishedArticleTopic.publish({
        articleId: id,
      });
      log.info("Successfully published article to pubsub", {
        articleId: id,
        messageId,
      });

      return { message: "Article published" };
    } catch (error) {
      return errorHandler("Failed to publish article", {
        articleId: id,
        error,
      });
    }
  }
);

export interface PublishArticleEvent {
  articleId: string;
}

export interface PublishArticleResponse {
  message: string;
}

export const PublishedArticleTopic = new Topic<PublishArticleEvent>(
  "published-article",
  {
    deliveryGuarantee: "at-least-once",
  }
);
