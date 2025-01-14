export interface SendMessageRequest {
  // Message to send
  message: string;
}

export interface SendMessageResponse {
  // Whether the message was sent successfully
  success: boolean;
}
