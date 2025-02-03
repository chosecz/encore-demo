import { db } from "@user/user.db";
import {
  CreateSessionRequest,
  CreateUserRequest,
  GetUserResponse,
  SessionResponse,
} from "@user/user.interfaces";
import { users as _users, sessions } from "@user/user.schema";
import { and, eq, gt, lt } from "drizzle-orm";
import { APIError } from "encore.dev/api";

export class UserRepository {
  async findById(id: string): Promise<GetUserResponse> {
    const [user] = await db
      .select()
      .from(_users)
      .where(eq(_users.id, id))
      .limit(1);
    if (!user) {
      throw APIError.notFound("User not found");
    }
    return user;
  }

  async findAll(): Promise<GetUserResponse[]> {
    return await db.select().from(_users);
  }

  async findByGoogleId(googleId: string): Promise<GetUserResponse> {
    const [user] = await db
      .select()
      .from(_users)
      .where(eq(_users.googleId, googleId))
      .limit(1);
    if (!user) {
      throw APIError.notFound("User not found");
    }
    return user;
  }

  async create(data: CreateUserRequest): Promise<{ id: string }> {
    const [result] = await db
      .insert(_users)
      .values(data)
      .returning({ id: _users.id });

    if (!result) {
      throw APIError.internal("Failed to create user");
    }
    return result;
  }

  async createSession(data: CreateSessionRequest): Promise<SessionResponse> {
    const [session] = await db
      .insert(sessions)
      .values({
        userId: data.userId,
        expiresAt: data.expiresAt.toISOString(),
      })
      .returning({
        id: sessions.id,
        userId: sessions.userId,
        expiresAt: sessions.expiresAt,
        createdAt: sessions.createdAt,
        updatedAt: sessions.updatedAt,
      });

    if (!session) {
      throw APIError.internal("Failed to create session");
    }
    return {
      ...session,
      expiresAt: new Date(session.expiresAt),
      createdAt: new Date(session.createdAt),
      updatedAt: new Date(session.updatedAt),
    };
  }

  async findSessionById(id: string): Promise<SessionResponse> {
    const [session] = await db
      .select()
      .from(sessions)
      .where(
        and(
          eq(sessions.id, id),
          gt(sessions.expiresAt, new Date().toISOString())
        )
      )
      .limit(1);

    if (!session) {
      throw APIError.notFound("Session not found or expired");
    }
    return {
      ...session,
      expiresAt: new Date(session.expiresAt),
      createdAt: new Date(session.createdAt),
      updatedAt: new Date(session.updatedAt),
    };
  }

  async deleteSession(id: string): Promise<void> {
    await db.delete(sessions).where(eq(sessions.id, id));
  }

  async deleteExpiredSessions(): Promise<void> {
    await db
      .delete(sessions)
      .where(lt(sessions.expiresAt, new Date().toISOString()));
  }

  async updateSessionExpiration(id: string, expiresAt: Date): Promise<void> {
    await db
      .update(sessions)
      .set({
        expiresAt: expiresAt.toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .where(eq(sessions.id, id));
  }
}

export const userRepository = new UserRepository();
