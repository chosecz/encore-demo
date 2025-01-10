import { PublishArticleEvent } from "@articles/types";
import { api, APIError } from "encore.dev/api";
import { secret } from "encore.dev/config";
import log from "encore.dev/log";
import { Subscription } from "encore.dev/pubsub";
import { Resend } from "resend";
import { articles } from "~encore/clients";
import { publishArticle } from "../articles/api";
import { SendEmailRequest, SendEmailResponse } from "./types";

const resendApiKey = secret("RESEND_API_KEY");

// Send an email
export const sendEmail = api(
  { expose: false, method: "POST", path: "/email/send" },
  async ({
    email,
    subject,
    html,
    text,
  }: SendEmailRequest): Promise<SendEmailResponse> => {
    log.info("Received request to send email", { email, subject });

    const resend = new Resend(resendApiKey());

    const { data, error } = await resend.emails.send({
      from: "Groupon <noreply@sonic.suprovoucher.com>",
      to: email,
      subject: subject,
      text,
      html,
    });

    if (error) {
      log.error("Error sending email", { error });
      throw APIError.internal("Failed to send email").withDetails({
        message: error.message,
      });
    }

    log.info("Email successfully sent", { id: data?.id });
    return {
      id: data?.id,
      success: true,
    };
  }
);

const _ = new Subscription(publishArticle, "send-notification-email", {
  handler: async (event: PublishArticleEvent) => {
    log.info("Received event to send email for published article", {
      articleID: event.articleID,
    });
    const _article = await articles.article({ id: event.articleID });
    if (!_article) {
      log.error("Article not found", { articleID: event.articleID });
      throw APIError.notFound("Article not found").withDetails({
        articleID: event.articleID,
      });
    }

    // Send notification email
    const { id, success } = await sendEmail({
      email: ["josef.sima@gmail.com"],
      subject: `Article published (id: ${_article.id})`,
      html: `<p>Article "${_article.title}" has been published</p>`,
      text: `Article "${_article.title}" has been published`,
    });

    if (!success) {
      log.error("Failed to send email", { emailID: id, success });
      throw APIError.internal("Failed to send email").withDetails({
        message: "Failed to send email",
      });
    }

    log.info("Message processed successfully");

    return { id, message: "Email sent" };
  },
});
