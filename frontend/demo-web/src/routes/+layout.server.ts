import type { RequestEvent } from "@sveltejs/kit";

export async function load(event: RequestEvent) {
  if (event.locals.session === null || event.locals.user === null) {
    return {
      user: null,
    };
  }
  return {
    user: event.locals.user,
  };
}
