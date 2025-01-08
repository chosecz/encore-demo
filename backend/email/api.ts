import { api, APIError } from "encore.dev/api";
import { secret } from "encore.dev/config";
import log from "encore.dev/log";
import { Resend } from "resend";
import { SendEmailRequest, SendEmailResponse } from "./types";

const resendApiKey = secret("RESEND_API_KEY");

// Send an email
export const sendEmail = api(
  { expose: true, method: "POST", path: "/email/send" },
  async ({
    email,
    subject,
    html,
    text,
  }: SendEmailRequest): Promise<SendEmailResponse> => {
    log.info("Sending email", { email, subject });
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
      throw APIError.internal(error.message, error);
    }

    log.info("Email sent", { id: data?.id });
    return {
      id: data?.id,
      success: true,
    };
  }
);
