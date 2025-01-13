import { type user } from "$lib/encore-client";
import { Client } from "$lib/server/client";
import type { RequestEvent } from "@sveltejs/kit";

const client = Client();

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

export async function createSession(
  userId: string,
  expiresAt: Date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
): Promise<user.SessionResponse> {
  return await client.user.createSession({
    userId,
    expiresAt: expiresAt.toISOString(),
  });
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await client.user.deleteSession(sessionId);
}

export async function validateSessionToken(
  sessionToken: string
): Promise<{ session: user.SessionResponse; user: user.GetUserResponse } | null> {
  if (!sessionToken) {
    return null;
  }

  try {
    const session = await client.user.getSession(sessionToken);
    if (new Date(session.expiresAt) <= new Date()) {
      return null;
    }
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString();

    await client.user.updateSessionExpiration(sessionToken, {
      expiresAt: session.expiresAt,
    });

    const user = await client.user.getUser(session.userId);
    return { session, user };
  } catch (error) {
    return null;
  }
}

export async function getSession(sessionId: string): Promise<user.SessionResponse | null> {
  return await client.user.getSession(sessionId);
}
