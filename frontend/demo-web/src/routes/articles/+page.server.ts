import { PUBLIC_API_URL } from "$env/static/public";
import Client from "$lib/encore-client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const client = new Client(PUBLIC_API_URL);
  return await client.article.list({ status: "published" });
};
