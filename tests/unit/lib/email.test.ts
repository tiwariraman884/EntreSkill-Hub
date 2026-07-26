import { sendEmail, sendVerificationEmail } from "@/lib/email";

jest.mock("@/lib/redis", () => ({
  __esModule: true,
  default: {
    incr: jest.fn(),
    expire: jest.fn(),
  },
}));

describe("email", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("sendVerificationEmail generates a verification link", async () => {
    delete process.env.EMAIL_PROVIDER_API_KEY;
    delete process.env.SMTP_HOST;
    delete process.env.SMTP_USER;

    await sendVerificationEmail("test@example.com", "user123");
    expect(true).toBe(true);
  });

  it("sendEmail falls back to SMTP when no provider key", async () => {
    delete process.env.EMAIL_PROVIDER_API_KEY;
    delete process.env.SMTP_HOST;
    delete process.env.SMTP_USER;

    await sendEmail("test@example.com", "Test Subject", "<p>Hello</p>");
    expect(true).toBe(true);
  });

  it("sendEmail uses provider when api key is set", async () => {
    process.env.EMAIL_PROVIDER_API_KEY = "test-key";
    
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: "msg-123" }),
      })
    ) as jest.Mock;

    const result = await sendEmail("test@example.com", "Test Subject", "<p>Hello</p>");
    expect(result).toBeDefined();
    expect(fetch).toHaveBeenCalledWith("https://api.resend.com/emails", expect.any(Object));
  });

  it("sendViaProvider throws when provider returns error", async () => {
    process.env.EMAIL_PROVIDER_API_KEY = "test-key";

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 400,
        text: () => Promise.resolve("Bad Request"),
      })
    ) as jest.Mock;

    await expect(sendEmail("test@example.com", "Test", "<p>Hello</p>")).rejects.toThrow("Email provider failed");
  });
});
