import { describe, expect, test } from "vitest";
import { get, remove, update } from "./api";
import { create, list } from "./articleHandler";

// Store the article ID for use across tests
let testArticleId: string;

describe("Article API Tests", () => {
  test("should create an article", async () => {
    const resp = await create({
      title: "Test Article",
      description: "This is a test article",
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
