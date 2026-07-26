import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const publicPagePaths = [
  "/",
  "/login",
  "/register",
  "/api/auth",
  "/learn",
  "/mentors",
  "/assessment",
  "/recommendations",
];

const adminPrefixes = ["/admin"];
const mentorPrefixes = ["/api/mentors/apply"];

function isPublicPage(pathname: string) {
  return publicPagePaths.some((path) => pathname === path || pathname.startsWith(path));
}

function matchesPrefixes(pathname: string, prefixes: string[]) {
  return prefixes.some((prefix) => pathname.startsWith(prefix));
}

function generateNonce() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Buffer.from(array).toString("base64url");
}

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  if (isPublicPage(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (matchesPrefixes(pathname, adminPrefixes)) {
    if ((token.role as string) !== "admin") {
      if (pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (matchesPrefixes(pathname, mentorPrefixes)) {
    if ((token.role as string) !== "mentor" && (token.role as string) !== "admin") {
      if (pathname.startsWith("/api")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  const nonce = generateNonce();
  const response = NextResponse.next();
  response.cookies.set("__csp_nonce", nonce, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });
  response.headers.set("x-csp-nonce", nonce);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
