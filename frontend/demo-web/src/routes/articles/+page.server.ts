import { Client } from "$lib/server/client";
import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const client = Client(locals.session?.id);
  return await client.article.list(locals.user ? {} : { status: "published" });
};

export const actions = {
  create: async (event) => {
    if (!event.locals.user) {
      throw error(401, "Unauthorized");
    }

    const client = Client(event.locals.session?.id);
    const formData = await event.request.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    let article = null;
    try {
      article = await client.article.create({
        title,
        description,
        author_id: event.locals.user.id,
      });
    } catch (error) {
      return fail(500, {
        title,
        description,
        error: error instanceof Error ? error.message : "Failed to create article",
      });
    }
    redirect(303, `/articles/${article.id}`);
  },
} satisfies Actions;
