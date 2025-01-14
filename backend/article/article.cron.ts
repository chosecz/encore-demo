import { appMeta } from "encore.dev";
import { api, APIError } from "encore.dev/api";
import { CronJob } from "encore.dev/cron";
import { article, google_chat } from "~encore/clients";

export const sendPublishedArticlesCount = api({}, async () => {
  try {
    const response = await article.count();
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

    return await google_chat.sendMessage({
      message: `${formattedDate} we have ${
        response.count
      } published articles in ${resolveRegion(appMeta().environment.name)}`,
    });
  } catch (error) {
    throw APIError.internal("Failed to send published articles count");
  }
});

// Sends notification with number of published articles every day at 9:00 AM
new CronJob("published-articles", {
  title: "Count published articles",
  schedule: "0 9 * * *",
  endpoint: sendPublishedArticlesCount,
});

function resolveRegion(environment: string) {
  switch (environment) {
    case "prod-eu":
      return "EU (production)";
    case "prod-us":
      return "US (production)";
    case "staging-us":
      return "US (staging)";
    case "staging-eu":
      return "EU (staging)";
    default:
      return "local";
  }
}
