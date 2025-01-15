import { globalErrorHandler } from "@shared/errors";
import { middleware } from "encore.dev/api";
import { Service } from "encore.dev/service";

/*
  This is the service for the users API.
  Use it to manage users.
*/
export default new Service("user", {
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
