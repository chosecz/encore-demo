import { articleService } from "@article/article.service";
import { appMeta } from "encore.dev";
import { api } from "encore.dev/api";
import { CronJob } from "encore.dev/cron";
import { google_chat } from "~encore/clients";

export const sendPublishedArticlesCount = api(
  {},
  async (): Promise<{ message: string }> => {
    const { count } = await articleService.publishedArticlesCount();
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

    await google_chat.sendMessage({
      message: `${formattedDate} we have ${count} published articles in ${resolveRegion(
        appMeta().environment.name
      )}`,
    });
    return { message: "Published articles count sent" };
  }
);

// Sends notification with number of published articles every day at 9:00 AM
new CronJob("published-articles", {
  title: "Count published articles",
  schedule: "0 8 * * *",
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
