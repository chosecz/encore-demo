import { PublishArticleEvent } from "@article/article.interfaces";
import { Topic } from "encore.dev/pubsub";

export const PublishedArticleTopic = new Topic<PublishArticleEvent>(
  "published-article",
  {
    deliveryGuarantee: "at-least-once",
  }
);
