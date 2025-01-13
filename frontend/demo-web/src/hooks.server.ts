import { PUBLIC_API_URL } from "$env/static/public";
import Client from "$lib/encore-client";
import {
  deleteSessionTokenCookie,
  setSessionTokenCookie,
  validateSessionToken,
} from "$lib/server/session";
import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const authHandle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get("session") ?? null;
  if (token === null) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const sessionResponse = await validateSessionToken(token);
  if (sessionResponse === null) {
    deleteSessionTokenCookie(event);
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, user } = sessionResponse;

  // Extend session expiration by 30 days from now
  const newExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

  try {
    const client = new Client(PUBLIC_API_URL);
    await client.user.updateSessionExpiration(token, {
      expiresAt: newExpiresAt.toISOString(),
    });
    setSessionTokenCookie(event, token, newExpiresAt);
  } catch (error) {
    // If we fail to extend the session, continue with the current expiration
    setSessionTokenCookie(event, token, new Date(session.expiresAt));
  }

  event.locals.session = session;
  event.locals.user = user;
  return resolve(event);
};

export const handle = sequence(authHandle);
