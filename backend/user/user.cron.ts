import { userService } from "@user/user.service";
import { api, APIError } from "encore.dev/api";
import { CronJob } from "encore.dev/cron";
import log from "encore.dev/log";

export const cleanupExpiredSessions = api(
  {},
  async (): Promise<{ message: string }> => {
    try {
      log.info("Starting cleanup of expired sessions");
      await userService.cleanupExpiredSessions();
      log.info("Successfully cleaned up expired sessions");
      return { message: "Expired sessions cleaned up" };
    } catch (error) {
      throw APIError.internal("Failed to cleanup expired sessions");
    }
  }
);

// Runs every day at midnight to clean up expired sessions
new CronJob("cleanup-expired-sessions", {
  title: "Cleanup expired sessions",
  schedule: "0 0 * * *", // At 00:00 (midnight) every day
  endpoint: cleanupExpiredSessions,
});
