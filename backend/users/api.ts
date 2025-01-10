import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserFromGoogleIdRequest,
  GetUserRequest,
  GetUserResponse,
} from "@users/types";
import { api } from "encore.dev/api";

export const createUser = api(
  { expose: true, method: "POST", path: "/users/create" },
  async ({
    googleId,
    email,
    name,
    picture,
  }: CreateUserRequest): Promise<CreateUserResponse> => {
    return { id: "123" };
  }
);

export const getUserFromGoogleId = api(
  { expose: true, method: "GET", path: "/users/get-from-google-id" },
  async ({
    googleId,
  }: GetUserFromGoogleIdRequest): Promise<GetUserResponse> => {
    return {
      id: "123",
      email: "test@test.com",
      name: "John Doe",
      picture: "https://test.com/test.jpg",
    };
  }
);

export const getUser = api(
  { expose: true, method: "GET", path: "/users/get" },
  async ({ id }: GetUserRequest): Promise<GetUserResponse> => {
    return {
      id: "123",
      email: "test@test.com",
      name: "John Doe",
      picture: "https://test.com/test.jpg",
    };
  }
);
