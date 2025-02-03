import { create, get, list, remove, update } from "@article/article.controller";
import { describe, expect, test, vi } from "vitest";

function mockUserId() {
  return "503e9fc7-4327-4382-bfb5-447de09daba5";
}

vi.mock("~encore/auth", () => ({
  getAuthData: () => ({
    userID: mockUserId(),
  }),
  auth: () => ({
    userID: mockUserId(),
  }),
  gateway: {
    authHandler: vi.fn(),
  },
}));

vi.mock("~encore/clients", () => ({
  user: {
    getUser: vi.fn().mockResolvedValue({
      id: mockUserId(),
      email: "test@example.com",
      name: "Test User",
      picture: "https://example.com/picture.jpg",
    }),
  },
}));

let testArticleId: string;

describe("Article API Tests", () => {
  test("should create an article", async () => {
    const resp = await create({
      title: "Test Article",
      description: "This is a test article",
      authorId: mockUserId(),
    });
    expect(resp.id).toBeDefined();
    testArticleId = resp.id;
  });

  test("should return all articles", async () => {
    const resp = await list({ includeDeleted: true });
    expect(resp.articles).toBeDefined();
    expect(resp.articles.length).toBeGreaterThan(0);
  });

  test("should return a single article", async () => {
    const resp = await get({ id: testArticleId });
    expect(resp.id).toBeDefined();
    expect(resp.title).toBe("Test Article");
    expect(resp.description).toBe("This is a test article");
  });

  test("should update an article", async () => {
    const resp = await update({
      id: testArticleId,
      title: "Updated Test Article",
      description: "This is an updated test article",
    });
    expect(resp.message).toBe("Article updated");
  });

  test("should return a single updated article", async () => {
    const resp = await get({ id: testArticleId });
    expect(resp.id).toBeDefined();
    expect(resp.title).toBe("Updated Test Article");
    expect(resp.description).toBe("This is an updated test article");
  });

  test("should delete the test article", async () => {
    const resp = await remove({ id: testArticleId });
    expect(resp.message).toBe("Article deleted");
  });
});
