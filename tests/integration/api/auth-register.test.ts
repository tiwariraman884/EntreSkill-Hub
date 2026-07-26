import { NextRequest } from "next/server";
import { POST } from "@/app/api/auth/register/route";

describe("POST /api/auth/register", () => {
  it("returns 409 for duplicate email", async () => {
    const req = new NextRequest("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: "User",
        email: "duplicate@example.com",
        password: "password123",
      }),
    });

    const first = await POST(req);
    expect(first.status).toBe(201);

    const second = await POST(req);
    expect(second.status).toBe(409);
  });

  it("returns 400 for missing fields", async () => {
    const req = new NextRequest("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name: "User" }),
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
