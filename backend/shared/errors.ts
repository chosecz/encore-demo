import { APIError } from "encore.dev/api";
import log from "encore.dev/log";

export function errorHandler(
  error: any,
  message: string,
  metadata?: object
): never {
  log.error(message, {
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    ...metadata,
  });
  if (error instanceof APIError) {
    throw error;
  }

  throw APIError.internal(message);
}
