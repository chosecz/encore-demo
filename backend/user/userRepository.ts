import { APIError } from "encore.dev/api";
import { db } from "./db";
import {
  CreateSessionRequest,
  CreateUserRequest,
  GetUserResponse,
  SessionResponse,
} from "./types";

export class UserRepository {
  async findById(id: string): Promise<GetUserResponse> {
    const user = await db.queryRow<GetUserResponse>`
      SELECT id, email, name, picture
      FROM users
      WHERE id = ${id} AND deleted_at IS NULL
    `;
    if (!user) {
      throw APIError.notFound("User not found");
    }
    return user;
  }

  async findByGoogleId(googleId: string): Promise<GetUserResponse> {
    const user = await db.queryRow<GetUserResponse>`
      SELECT id, email, name, picture
      FROM users
      WHERE google_id = ${googleId} AND deleted_at IS NULL
    `;
    if (!user) {
      throw APIError.notFound("User not found");
    }
    return user;
  }

  async create(data: CreateUserRequest): Promise<{ id: string }> {
    const result = await db.queryRow<{ id: string }>`
      INSERT INTO users (email, google_id, name, picture)
      VALUES (${data.email}, ${data.googleId}, ${data.name}, ${data.picture})
      RETURNING id
    `;
    if (!result) {
      throw APIError.internal("Failed to create user");
    }
    return result;
  }

  async createSession(data: CreateSessionRequest): Promise<SessionResponse> {
    const session = await db.queryRow<SessionResponse>`
      INSERT INTO sessions (user_id, expires_at)
      VALUES (${data.userId}, ${data.expiresAt})
      RETURNING id, user_id as "userId", expires_at as "expiresAt",
        created_at as "createdAt", updated_at as "updatedAt"
    `;
    if (!session) {
      throw APIError.internal("Failed to create session");
    }
    return session;
  }

  async findSessionById(id: string): Promise<SessionResponse> {
    const session = await db.queryRow<SessionResponse>`
      SELECT id, user_id as "userId", expires_at as "expiresAt",
        created_at as "createdAt", updated_at as "updatedAt"
      FROM sessions
      WHERE id = ${id} AND expires_at > NOW()
    `;
    if (!session) {
      throw APIError.notFound("Session not found or expired");
    }
    return session;
  }

  async deleteSession(id: string): Promise<void> {
    await db.exec`
      DELETE FROM sessions
      WHERE id = ${id}
    `;
  }

  async deleteExpiredSessions(): Promise<void> {
    await db.exec`
      DELETE FROM sessions
      WHERE expires_at <= NOW()
    `;
  }
}

export const userRepository = new UserRepository();
