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
  setSessionTokenCookie(event, token, new Date(session.expiresAt));

  event.locals.session = session;
  event.locals.user = user;
  return resolve(event);
};

export const handle = sequence(authHandle);
