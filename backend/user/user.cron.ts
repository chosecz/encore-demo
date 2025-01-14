import { errorHandler } from "@shared/errors";
import { api } from "encore.dev/api";
import { CronJob } from "encore.dev/cron";
import log from "encore.dev/log";
import { user } from "~encore/clients";

export const cleanupExpiredSessions = api({}, async () => {
  try {
    log.info("Starting cleanup of expired sessions");
    await user.cleanupExpiredSessions();
    log.info("Successfully cleaned up expired sessions");
    return { message: "Expired sessions cleaned up" };
  } catch (error) {
    return errorHandler(error, "Failed to cleanup expired sessions");
  }
});

// Runs every day at midnight to clean up expired sessions
new CronJob("cleanup-expired-sessions", {
  title: "Cleanup expired sessions",
  schedule: "0 0 * * *", // At 00:00 (midnight) every day
  endpoint: cleanupExpiredSessions,
});
