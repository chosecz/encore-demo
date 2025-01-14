import { Client } from "$lib/server/client";
import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load = (async ({ params, locals }) => {
  try {
    const client = Client(locals.session?.id);
    const article = await client.article.get(params.id);
    return {
      article,
    };
  } catch (e) {
    throw error(404, "Article not found");
  }
}) satisfies PageServerLoad;

export const actions = {
  publish: async (event) => {
    const client = Client(event.locals.session?.id);
    const formData = await event.request.formData();
    const articleId = formData.get("articleId");

    try {
      await client.article.publish(articleId as string);
    } catch (e) {
      return fail(500, {
        error: "Failed to publish article",
      });
    }
  },
  delete: async (event) => {
    const client = Client(event.locals.session?.id);
    const formData = await event.request.formData();
    const articleId = formData.get("articleId");

    try {
      await client.article.remove(articleId as string);
    } catch (e) {
      return fail(500, {
        error: "Failed to delete article",
      });
    }
    throw redirect(302, "/articles");
  },
} satisfies Actions;
