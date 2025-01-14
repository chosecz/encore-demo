import {
  CreateSessionRequest,
  CreateUserRequest,
  CreateUserResponse,
  GetUserResponse,
  SessionResponse,
} from "@user/user.interfaces";
import { userRepository } from "@user/user.repository";

class UserService {
  async getUserById(id: string): Promise<GetUserResponse> {
    return await userRepository.findById(id);
  }

  async getUserByGoogleId(googleId: string): Promise<GetUserResponse> {
    return await userRepository.findByGoogleId(googleId);
  }

  async createUser(data: CreateUserRequest): Promise<CreateUserResponse> {
    const result = await userRepository.create(data);
    return {
      id: result.id,
      message: "User created successfully",
    };
  }

  async createSession(data: CreateSessionRequest): Promise<SessionResponse> {
    return await userRepository.createSession(data);
  }

  async getSession(id: string): Promise<SessionResponse> {
    return await userRepository.findSessionById(id);
  }

  async deleteSession(id: string): Promise<void> {
    await userRepository.deleteSession(id);
  }

  async cleanupExpiredSessions(): Promise<void> {
    await userRepository.deleteExpiredSessions();
  }

  async updateSessionExpiration(id: string, expiresAt: Date): Promise<void> {
    await userRepository.updateSessionExpiration(id, expiresAt);
  }
}

export const userService = new UserService();
