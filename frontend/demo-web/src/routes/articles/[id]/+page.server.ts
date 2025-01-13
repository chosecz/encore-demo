import { Client } from "$lib/server/client";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params, locals }) => {
  try {
    const client = Client(locals.session?.id ?? "");
    const article = await client.article.get(params.id);
    return {
      article,
    };
  } catch (e) {
    throw error(404, "Article not found");
  }
}) satisfies PageServerLoad;
