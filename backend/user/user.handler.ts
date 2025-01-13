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
} from "@user/user.interfaces";
import { userService } from "@user/user.service";
import { api } from "encore.dev/api";

export const createUser = api(
  { expose: true, method: "POST", path: "/users/create" },
  async (data: CreateUserRequest): Promise<CreateUserResponse> => {
    return await userService.createUser(data);
  }
);

export const getUserFromGoogleId = api(
  { expose: true, method: "GET", path: "/users/get-from-google-id/:googleId" },
  async ({
    googleId,
  }: GetUserFromGoogleIdRequest): Promise<GetUserResponse> => {
    return await userService.getUserByGoogleId(googleId);
  }
);

export const getUser = api(
  { expose: true, method: "GET", path: "/users/:id" },
  async ({ id }: GetUserRequest): Promise<GetUserResponse> => {
    return await userService.getUserById(id);
  }
);

export const createSession = api(
  { expose: true, method: "POST", path: "/users/sessions" },
  async (data: CreateSessionRequest): Promise<SessionResponse> => {
    return await userService.createSession(data);
  }
);

export const getSession = api(
  { expose: true, method: "GET", path: "/users/sessions/:id" },
  async ({ id }: GetSessionRequest): Promise<SessionResponse> => {
    return await userService.getSession(id);
  }
);

export const deleteSession = api(
  { expose: true, method: "DELETE", path: "/users/sessions/:id" },
  async ({ id }: GetSessionRequest): Promise<void> => {
    await userService.deleteSession(id);
  }
);

export const updateSessionExpiration = api(
  {
    expose: true,
    method: "POST",
    path: "/users/sessions/:id/update-expiration",
  },
  async ({ id, expiresAt }: UpdateSessionExpirationRequest): Promise<void> => {
    await userService.updateSessionExpiration(id, expiresAt);
  }
);
