import { PUBLIC_API_URL } from "$env/static/public";
import Client from "$lib/encore-client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const client = new Client(PUBLIC_API_URL);
  const data = await client.articles.articles({ status: "published" });

  return {
    articles: data.articles,
  };
};
