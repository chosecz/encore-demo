import { globalErrorHandler } from "@shared/errors";
import { middleware } from "encore.dev/api";
import { Service } from "encore.dev/service";

/*
  This is the service for the article API.
  Use it to create, read, update, publish, and delete articles.
*/
export default new Service("article", {
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
