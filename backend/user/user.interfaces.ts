export interface CreateUserRequest {
  // Google ID of the user
  googleId: string;
  // Email of the user
  email: string;
  // Name of the user
  name: string;
  // Public URL of the user's profile picture
  picture: string;
}

export interface CreateUserResponse {
  // ID of the user
  id: string;
  // Message of the response
  message: string;
}

export interface GetUserRequest {
  // ID of the user
  id: string;
}

export interface GetUserResponse {
  // ID of the user
  id: string;
  // Email of the user
  email: string;
  // Name of the user
  name: string | null;
  // Public URL of the user's profile picture
  picture: string | null;
}

export interface UpdateUserRequest {
  // ID of the user
  id: string;
  // Email of the user
  email: string;
  // Name of the user
  name: string;
  // Public URL of the user's profile picture
  picture: string;
}

export interface GetUserFromGoogleIdRequest {
  // Google ID of the user
  googleId: string;
}

export interface CreateSessionRequest {
  // ID of the user
  userId: string;
  // Expiration date of the session
  expiresAt: Date;
}

export interface SessionResponse {
  // ID of the session
  id: string;
  // ID of the user
  userId: string;
  // Expiration date of the session
  expiresAt: Date;
  // Date the session was created
  createdAt: Date;
  // Date the session was last updated
  updatedAt: Date;
}

export interface GetSessionRequest {
  // ID of the session
  id: string;
}

export interface UpdateSessionExpirationRequest {
  // ID of the session
  id: string;
  // Expiration date of the session
  expiresAt: Date;
}
