import { APIError } from "encore.dev/api";
import log from "encore.dev/log";

export const errorHandler = (
  error: unknown,
  message: string,
  details?: Record<string, any>
) => {
  log.error(message, {
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    ...details,
  });
  if (error instanceof APIError) {
    throw error;
  }
  throw APIError.internal(message).withDetails({
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  });
};
