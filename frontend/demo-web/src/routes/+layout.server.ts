import type { RequestEvent } from "@sveltejs/kit";

export async function load(event: RequestEvent) {
  return {
    user: event.locals.user,
  };
}
