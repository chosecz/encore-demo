import { api } from "encore.dev/api";

// Root endpoint. It doesn't do anything, but it's useful for testing the API.
export const get = api(
  { expose: true, method: "GET", path: "/" },
  async (): Promise<{ message: string }> => {
    return { message: "Welcome to the Groupon API" };
  }
);
