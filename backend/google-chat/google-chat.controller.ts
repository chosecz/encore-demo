import { APIError } from "encore.dev/api";

import { PublishArticleEvent } from "@article/article.interfaces";
import { PublishedArticleTopic } from "@article/article.service";
import {
  SendMessageRequest,
  SendMessageResponse,
} from "@google-chat/google-chat.interfaces";
import { errorHandler } from "@shared/errors";
import { api } from "encore.dev/api";
import { secret } from "encore.dev/config";
import log from "encore.dev/log";
import { Subscription } from "encore.dev/pubsub";
import { article } from "~encore/clients";

const WEB_URL = secret("WEB_URL");

// Send a message to google chat
export const sendMessage = api(
  { expose: false, method: "POST", path: "/google-chat/send-message" },
  async ({ message }: SendMessageRequest): Promise<SendMessageResponse> => {
    log.info("Received request to send message", { message });

    try {
      const res = await webhook(message);
      log.info("Message successfully sent", { res });
      return {
        success: true,
      };
    } catch (error) {
      return errorHandler(error, "Failed to send message");
    }
  }
);

const _ = new Subscription(PublishedArticleTopic, "send-chat-message", {
  handler: async (event: PublishArticleEvent) => {
    log.info("Received event to send message for published article", {
      articleId: event.articleId,
    });
    const _article = await article.get({ id: event.articleId });
    if (!_article) {
      log.error("Article not found", { articleID: event.articleId });
      throw APIError.notFound("Article not found").withDetails({
        articleID: event.articleId,
      });
    }

    const webUrl = WEB_URL();

    // Send notification message
    const { success } = await sendMessage({
      message: `Article "${_article.title}" has been published 🎉\n\n${webUrl}/articles/${_article.id}`,
    });

    if (!success) {
      log.error("Failed to send message", { success });
      throw APIError.internal("Failed to send message").withDetails({
        message: "Failed to send message",
      });
    }

    log.info("Message processed successfully");
    return { message: "Message sent" };
  },
});

async function webhook(text: string) {
  const url =
    "https://chat.googleapis.com/v1/spaces/AAAAi9NJE3U/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=ACCtSHFfeZp1rYc9ZzeM1_QLmw6bvyCq06gOfwHSbRI";
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ text }),
  });
  return await res.json();
}
