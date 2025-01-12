export interface CreateUserRequest {
  googleId: string;
  email: string;
  name: string;
  picture: string;
}

export interface CreateUserResponse {
  id: string;
}

export interface GetUserRequest {
  id: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export interface GetUserResponse {
  user?: User;
  found: boolean;
}

export interface UpdateUserRequest {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export interface GetUserFromGoogleIdRequest {
  googleId: string;
}

export interface CreateSessionRequest {
  userId: string;
  expiresAt: Date;
}

export interface SessionResponse {
  id: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetSessionRequest {
  id: string;
}
