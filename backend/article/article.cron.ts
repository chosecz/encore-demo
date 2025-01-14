import { api } from "encore.dev/api";
import { CronJob } from "encore.dev/cron";
import { article, google_chat } from "~encore/clients";

export const sendPublishedArticlesCount = api({}, async () => {
  const count = await article.count();
  return google_chat.sendMessage({
    message: `There are ${count} published articles`,
  });
});

// Sends notification with number of published articles every day at 9:00 AM
const _ = new CronJob("published-articles", {
  title: "Publish articles",
  schedule: "0 9 * * *",
  endpoint: sendPublishedArticlesCount,
});
