// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { user } from "$lib/encore-client";

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: user.GetUserResponse | null;
      session: user.SessionResponse | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
