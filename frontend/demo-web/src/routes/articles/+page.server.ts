import { PUBLIC_API_URL } from "$env/static/public";
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
    const photo = formData.get("photo") as File | null;

    if (!title || !description) {
      return fail(400, {
        title,
        description,
        error: "Title and description are required",
      });
    }

    // If we have a photo, upload it
    let imageUrl = null;
    let imageBucketKey = null;
    if (photo && photo.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", photo, photo.name);

      const response = await fetch(`${PUBLIC_API_URL}/article/upload`, {
        method: "POST",
        body: uploadFormData,
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Error uploading photo", error);
        throw new Error(error.error);
      }

      const photoUrlResponse = await response.json();
      if (!photoUrlResponse.success) {
        throw new Error(photoUrlResponse.error);
      }

      imageUrl = photoUrlResponse.publicUrl;
      imageBucketKey = photoUrlResponse.filename;
    }

    let article = null;
    try {
      article = await client.article.create({
        title,
        description,
        author_id: event.locals.user.id,
        ...(imageUrl ? { image_url: imageUrl } : {}),
        ...(imageBucketKey ? { image_bucket_key: imageBucketKey } : {}),
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
