import { env } from "$env/dynamic/private";
import { Google } from "arctic";

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  "http://localhost:5173/login/google/callback"
);
