import { api } from "encore.dev/api";
import { SendEmailRequest } from "./types";

// Send an email
export const sendEmail = api(
  { expose: true, method: "POST", path: "/email/send" },
  async ({ email, subject, body }: SendEmailRequest): Promise<void> => {
    console.log(
      `Sending email to ${email} with subject ${subject} and body ${body}`
    );
  }
);
