import {
  CreateSessionRequest,
  CreateUserRequest,
  CreateUserResponse,
  GetSessionRequest,
  GetUserFromGoogleIdRequest,
  GetUserRequest,
  GetUserResponse,
  SessionResponse,
  UpdateSessionExpirationRequest,
} from "@user/types";
import { api } from "encore.dev/api";
import { errorHandler } from "../shared/errors";
import { userService } from "./userService";

export const createUser = api(
  { expose: true, method: "POST", path: "/users/create" },
  async (data: CreateUserRequest): Promise<CreateUserResponse> => {
    try {
      return await userService.createUser(data);
    } catch (error) {
      return errorHandler(error, "Failed to create user");
    }
  }
);

export const getUserFromGoogleId = api(
  { expose: true, method: "GET", path: "/users/get-from-google-id/:googleId" },
  async ({
    googleId,
  }: GetUserFromGoogleIdRequest): Promise<GetUserResponse> => {
    try {
      return await userService.getUserByGoogleId(googleId);
    } catch (error) {
      return errorHandler(error, "Failed to get user from Google ID");
    }
  }
);

export const getUser = api(
  { expose: true, method: "GET", path: "/users/:id" },
  async ({ id }: GetUserRequest): Promise<GetUserResponse> => {
    try {
      return await userService.getUserById(id);
    } catch (error) {
      return errorHandler(error, "Failed to get user");
    }
  }
);

export const createSession = api(
  { expose: true, method: "POST", path: "/users/sessions" },
  async (data: CreateSessionRequest): Promise<SessionResponse> => {
    try {
      return await userService.createSession(data);
    } catch (error) {
      return errorHandler(error, "Failed to create session");
    }
  }
);

export const getSession = api(
  { expose: true, method: "GET", path: "/users/sessions/:id" },
  async ({ id }: GetSessionRequest): Promise<SessionResponse> => {
    try {
      return await userService.getSession(id);
    } catch (error) {
      return errorHandler(error, "Failed to get session");
    }
  }
);

export const deleteSession = api(
  { expose: true, method: "DELETE", path: "/users/sessions/:id" },
  async ({ id }: GetSessionRequest): Promise<void> => {
    try {
      await userService.deleteSession(id);
    } catch (error) {
      return errorHandler(error, "Failed to delete session");
    }
  }
);

export const updateSessionExpiration = api(
  {
    expose: true,
    method: "POST",
    path: "/users/sessions/:id/update-expiration",
  },
  async ({ id, expiresAt }: UpdateSessionExpirationRequest): Promise<void> => {
    try {
      await userService.updateSessionExpiration(id, expiresAt);
    } catch (error) {
      return errorHandler(error, "Failed to update session expiration");
    }
  }
);
