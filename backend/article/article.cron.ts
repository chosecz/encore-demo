import { errorHandler } from "@shared/errors";
import { api } from "encore.dev/api";
import { CronJob } from "encore.dev/cron";
import { article, google_chat } from "~encore/clients";

export const sendPublishedArticlesCount = api({}, async () => {
  try {
    const response = await article.count();
    return await google_chat.sendMessage({
      message: `There are ${response.count} published articles`,
    });
  } catch (error) {
    return errorHandler(error, "Failed to send published articles count");
  }
});

// Sends notification with number of published articles every day at 9:00 AM
const _ = new CronJob("published-articles", {
  title: "Publish articles",
  schedule: "0 9 * * *",
  endpoint: sendPublishedArticlesCount,
});
