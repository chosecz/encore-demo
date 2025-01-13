import { env } from "$env/dynamic/private";
import { PUBLIC_WEB_URL } from "$env/static/public";
import { Google } from "arctic";

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  `${PUBLIC_WEB_URL}/login/google/callback`
);
