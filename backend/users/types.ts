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

export interface GetUserResponse {
  id: string;
  email: string;
  name: string;
  picture: string;
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
