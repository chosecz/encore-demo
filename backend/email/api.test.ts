import { Resend } from "resend";
import { describe, expect, test, vi } from "vitest";
import { sendEmail } from "./sendEmail";

// Mock the secret function
vi.mock("encore.dev/config", () => ({
  secret: () => vi.fn(() => "mock_resend_api_key"),
}));

// Mock the Resend module
vi.mock("resend", () => ({
  Resend: vi.fn(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({
        data: { id: "test_email_id" },
        error: null,
      }),
    },
  })),
}));

// Mock the encore.dev/log module
vi.mock("encore.dev/log", () => ({
  default: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock the encore clients
vi.mock("~encore/clients", () => ({
  articles: {
    article: vi.fn().mockResolvedValue({
      id: "test-article-id",
      title: "Test Article",
      description: "Test Description",
      status: "published",
      created_at: "2024-03-14T00:00:00Z",
      updated_at: "2024-03-14T00:00:00Z",
      deleted_at: null,
    }),
  },
}));

describe("Email API Tests", () => {
  test("should send an email successfully", async () => {
    const emailData = {
      email: ["test@example.com"],
      subject: "Test Email",
      html: "<p>Test content</p>",
      text: "Test content",
    };

    const response = await sendEmail(emailData);

    expect(response.success).toBe(true);
    expect(response.id).toBe("test_email_id");
  });

  test("should handle email sending error", async () => {
    const mockError = new Error("Failed to send email");

    vi.mocked(Resend).mockImplementationOnce(() => ({
      // @ts-ignore
      emails: {
        send: vi.fn().mockResolvedValue({
          data: null,
          error: mockError,
        }),
      },
    }));

    const emailData = {
      email: ["test@example.com"],
      subject: "Test Email",
      html: "<p>Test content</p>",
      text: "Test content",
    };

    await expect(sendEmail(emailData)).rejects.toThrow("Failed to send email");
  });
});
