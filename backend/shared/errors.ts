import { APIError } from "encore.dev/api";
import log from "encore.dev/log";

export function errorHandler(
  error: any,
  message: string,
  metadata?: object
): never {
  if (error instanceof APIError) {
    throw error;
  }

  log.error(message, { error, ...metadata });
  throw APIError.internal(message);
}
