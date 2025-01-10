import { PUBLIC_API_URL } from "$env/static/public";
import Client from "$lib/encore-client";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  try {
    const client = new Client(PUBLIC_API_URL);
    const article = await client.articles.article(params.id);
    return {
      article,
    };
  } catch (e) {
    throw error(404, "Article not found");
  }
}) satisfies PageServerLoad;
