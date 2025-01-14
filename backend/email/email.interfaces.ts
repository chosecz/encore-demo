export interface SendEmailRequest {
  // Email addresses to send the email to
  email: string[];
  // Subject of the email
  subject: string;
  // HTML content of the email
  html: string;
  // Text content of the email
  text: string;
}

export interface SendEmailResponse {
  // ID of the email
  id?: string;
  // Whether the email was sent successfully
  success: boolean;
}
