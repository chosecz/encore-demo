export interface SendEmailRequest {
  email: string[];
  subject: string;
  html: string;
  text: string;
}

export interface SendEmailResponse {
  id?: string;
  success: boolean;
}
