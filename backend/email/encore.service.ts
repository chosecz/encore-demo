import { globalErrorHandler } from "@shared/errors";
import { middleware } from "encore.dev/api";
import { Service } from "encore.dev/service";

/*
  This is the service for the email API.
  Use it to send emails.
*/
export default new Service("email", {
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
