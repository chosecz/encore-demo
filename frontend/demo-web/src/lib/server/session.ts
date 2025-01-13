import { PUBLIC_API_URL } from "$env/static/public";
import Client, { type user } from "$lib/encore-client";
import type { RequestEvent } from "@sveltejs/kit";

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
  event.cookies.set("session", token, {
    httpOnly: true,
    path: "/",
    secure: import.meta.env.PROD,
    sameSite: "lax",
    expires: expiresAt,
  });
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
  event.cookies.set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

export async function invalidateSession(sessionId: string): Promise<void> {
  const client = new Client(PUBLIC_API_URL);
  await client.user.deleteSession(sessionId);
}

export async function validateSessionToken(
  sessionToken: string
): Promise<{ session: user.SessionResponse; user: user.GetUserResponse } | null> {
  if (!sessionToken) {
    return null;
  }
  const client = new Client(PUBLIC_API_URL);

  try {
    const session = await client.user.getSession(sessionToken);
    if (new Date(session.expiresAt) <= new Date()) {
      return null;
    }
    const user = await client.user.getUser(session.userId);
    return { session, user };
  } catch (error) {
    return null;
  }
}

export async function getSession(sessionId: string): Promise<user.SessionResponse | null> {
  const client = new Client(PUBLIC_API_URL);
  return await client.user.getSession(sessionId);
}
