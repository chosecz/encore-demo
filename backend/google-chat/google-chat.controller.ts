import { APIError } from "encore.dev/api";

import { PublishArticleEvent } from "@article/article.interfaces";
import { PublishedArticleTopic } from "@article/article.topic";
import {
  SendMessageRequest,
  SendMessageResponse,
} from "@google-chat/google-chat.interfaces";
import { api } from "encore.dev/api";
import { secret } from "encore.dev/config";
import log from "encore.dev/log";
import { Subscription } from "encore.dev/pubsub";
import { article } from "~encore/clients";

const WEB_URL = secret("WEB_URL");
const GOOGLE_CHAT_TOKEN = secret("GOOGLE_CHAT_TOKEN");
const GOOGLE_CHAT_KEY = secret("GOOGLE_CHAT_KEY");

// Send a message to google chat
export const sendMessage = api(
  { expose: false, method: "POST", path: "/google-chat/send-message" },
  async ({ message }: SendMessageRequest): Promise<SendMessageResponse> => {
    log.info("Received request to send message", { message });

    const res = await webhook(message);
    log.info("Message successfully sent", { res });
    return {
      success: true,
    };
  }
);

const _ = new Subscription(PublishedArticleTopic, "send-chat-message", {
  handler: async (event: PublishArticleEvent) => {
    log.info("Received event to send message for published article", {
      articleId: event.articleId,
    });
    const _article = await article.get({ id: event.articleId });
    if (!_article) {
      log.error("Article not found", { articleId: event.articleId });
      throw APIError.notFound("Article not found").withDetails({
        articleId: event.articleId,
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
  const key = GOOGLE_CHAT_KEY();
  const token = GOOGLE_CHAT_TOKEN();
  const url = `https://chat.googleapis.com/v1/spaces/AAAAi9NJE3U/messages?key=${key}&token=${token}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) {
    const error = (await res.json()) as Object;
    throw APIError.internal("Failed to send message").withDetails(error);
  }
  return await res.json();
}
