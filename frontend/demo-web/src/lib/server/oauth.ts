import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";
import { PUBLIC_WEB_URL } from "$env/static/public";
import { Google } from "arctic";

export const google = new Google(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  `${PUBLIC_WEB_URL}/login/google/callback`
);
