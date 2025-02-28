import { PUBLIC_API_URL } from "$env/static/public";
import Client, { APIError } from "$lib/encore-client";
import { google } from "$lib/server/oauth";
import { createSession, setSessionTokenCookie } from "$lib/server/session";
import { ObjectParser } from "@pilcrowjs/object-parser";
import type { RequestEvent } from "@sveltejs/kit";
import type { OAuth2Tokens } from "arctic";
import { decodeIdToken } from "arctic";

export async function GET(event: RequestEvent): Promise<Response> {
  const client = new Client(PUBLIC_API_URL);
  const code = event.url.searchParams.get("code");
  const state = event.url.searchParams.get("state");
  const storedState = event.cookies.get("google_oauth_state") ?? null;
  const codeVerifier = event.cookies.get("google_code_verifier") ?? null;
  if (code === null || state === null || storedState === null || codeVerifier === null) {
    return new Response(null, {
      status: 400,
    });
  }
  if (state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  let tokens: OAuth2Tokens;
  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier);
  } catch (e) {
    return new Response(null, {
      status: 400,
    });
  }
  const claims = decodeIdToken(tokens.idToken());
  const claimsParser = new ObjectParser(claims);
  const googleId = claimsParser.getString("sub");
  const name = claimsParser.getString("name");
  const picture = claimsParser.getString("picture");
  const email = claimsParser.getString("email");

  let existingUser = undefined;
  try {
    existingUser = await client.user.getUserFromGoogleId(googleId);
  } catch (error) {
    // do nothing, when returns 404 it is ok
    if (error instanceof APIError && error.status === 404) {
      existingUser = undefined;
    } else {
      throw error;
    }
  }

  if (existingUser) {
    const session = await createSession(existingUser.id);
    setSessionTokenCookie(event, session.id, new Date(session.expiresAt));
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  }

  const user = await client.user.createUser({
    googleId,
    name,
    email,
    picture,
  });

  const session = await createSession(user.id);
  setSessionTokenCookie(event, session.id, new Date(session.expiresAt));
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
}
