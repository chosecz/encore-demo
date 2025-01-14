import { PublishArticleEvent } from "@article/article.interfaces";
import { PublishedArticleTopic } from "@article/article.service";
import { SendEmailRequest, SendEmailResponse } from "@email/email.interfaces";
import { errorHandler } from "@shared/errors";
import { api, APIError } from "encore.dev/api";
import { secret } from "encore.dev/config";
import log from "encore.dev/log";
import { Subscription } from "encore.dev/pubsub";
import { Resend } from "resend";
import { article } from "~encore/clients";

const resendApiKey = secret("RESEND_API_KEY");
const WEB_URL = secret("WEB_URL");

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

    try {
      const resend = new Resend(resendApiKey());

      const { data, error } = await resend.emails.send({
        from: "Groupon <noreply@sonic.suprovoucher.com>",
        to: email,
        subject: subject,
        text,
        html,
      });

      if (error) {
        throw APIError.internal("Failed to send email").withDetails({
          error: error.message,
          name: error.name,
        });
      }

      log.info("Email successfully sent", { id: data?.id });
      return {
        id: data?.id,
        success: true,
      };
    } catch (error) {
      return errorHandler(error, "Failed to send email");
    }
  }
);

const _ = new Subscription(PublishedArticleTopic, "send-notification-email", {
  handler: async (event: PublishArticleEvent) => {
    log.info("Received event to send email for published article", {
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

    // Send notification email
    const { id, success } = await sendEmail({
      email: ["josef.sima@gmail.com"],
      subject: `Article published (id: ${_article.id})`,
      html: `<p>Article "${_article.title}" has been published</p><p><a href="${webUrl}/articles/${_article.id}">View article</a></p>`,
      text: `Article "${_article.title}" has been published\n\n${webUrl}/articles/${_article.id}`,
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
