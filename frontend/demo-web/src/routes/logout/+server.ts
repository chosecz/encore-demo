import { PUBLIC_API_URL } from "$env/static/public";
import Client from "$lib/encore-client";
import { deleteSessionTokenCookie } from "$lib/server/session";
import type { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
  const sessionToken = event.cookies.get("session");
  if (sessionToken) {
    const client = new Client(PUBLIC_API_URL);
    try {
      await client.user.deleteSession(sessionToken);
    } catch (error) {
      // Ignore errors when deleting session, as we want to logout anyway
    }
  }

  deleteSessionTokenCookie(event);

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
}
