import { Client } from "$lib/server/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const client = Client(locals.session?.id ?? "");
  return await client.article.list(locals.user ? {} : { status: "published" });
};
