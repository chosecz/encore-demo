import { globalErrorHandler } from "@shared/errors";
import { middleware } from "encore.dev/api";
import { Service } from "encore.dev/service";

/*
  This is the service for the google chat API.
  Use it to send messages to google chat.
*/
export default new Service("google-chat", {
  middlewares: [
    // Global error handler
    middleware({}, async (req, next) => {
      try {
        return await next(req);
      } catch (error) {
        return globalErrorHandler(error);
      }
    }),
  ],
});
