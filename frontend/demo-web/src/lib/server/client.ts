import { PUBLIC_API_URL } from "$env/static/public";
import EncoreClient from "$lib/encore-client";

export const Client = (sessionId?: string) => {
  return new EncoreClient(PUBLIC_API_URL, {
    auth: {
      authorization: sessionId ?? "",
    },
  });
};
