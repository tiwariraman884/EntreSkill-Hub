import { requireAuth, requireRole, isAdmin, isMentor } from "@/lib/rbac";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import type { Session } from "next-auth";

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(),
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, opts) => ({ data, status: opts?.status || 200 })),
  },
}));

const mockGetServerSession = getServerSession as jest.MockedFunction<typeof getServerSession>;
const mockJson = NextResponse.json as jest.MockedFunction<typeof NextResponse.json>;

describe("rbac", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("requireAuth returns error when no session", async () => {
    mockGetServerSession.mockResolvedValue(null);
    const result = await requireAuth();
    expect(result.error).toBeDefined();
  });

  it("requireAuth returns session when authenticated", async () => {
    mockGetServerSession.mockResolvedValue({ user: { id: "1" } } as Session);
    const result = await requireAuth();
    expect(result.error).toBeUndefined();
    expect(result.session).toBeDefined();
  });

  it("requireRole returns error for wrong role", () => {
    const session = { user: { role: "user" } } as Session;
    const result = requireRole(session, "admin");
    expect(result).toBeDefined();
    expect(mockJson).toHaveBeenCalledWith({ error: "Forbidden" }, { status: 403 });
  });

  it("requireRole returns null for correct role", () => {
    const session = { user: { role: "admin" } } as Session;
    const result = requireRole(session, "admin");
    expect(result).toBeNull();
  });

  it("isAdmin returns true for admin role", () => {
    const session = { user: { role: "admin" } } as Session;
    expect(isAdmin(session)).toBe(true);
  });

  it("isMentor returns true for mentor role", () => {
    const session = { user: { role: "mentor" } } as Session;
    expect(isMentor(session)).toBe(true);
  });

  it("isMentor returns true for admin role", () => {
    const session = { user: { role: "admin" } } as Session;
    expect(isMentor(session)).toBe(true);
  });

  it("isMentor returns false for user role", () => {
    const session = { user: { role: "user" } } as Session;
    expect(isMentor(session)).toBe(false);
  });
});
