import { Resend } from "resend";
import { describe, expect, test, vi } from "vitest";
import { sendEmail } from "./api";

// Mock the secret function and make it return the API key directly
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
    // Override the mock to simulate an error
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
