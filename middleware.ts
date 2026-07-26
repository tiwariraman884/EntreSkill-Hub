import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Routes that are always public (no auth required)
const publicPaths = [
  "/",
  "/about",
  "/privacy",
  "/terms",
  "/contact",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/api/auth",
  "/assessment",
];

// Routes that require authentication
const protectedPaths = [
  "/learn",
  "/mentors",
  "/dashboard",
  "/profile",
  "/bookmarks",
  "/settings",
  "/notifications",
  "/recommendations",
  "/roadmaps",
  "/admin",
];

// Maps protected path prefixes to their contextual login page
const loginRedirectMap: Record<string, string> = {
  "/learn": "/login/learn",
  "/mentors": "/login/mentor",
};

function getLoginRedirect(pathname: string): string {
  // Check for specific context-aware redirects first
  for (const [prefix, loginPath] of Object.entries(loginRedirectMap)) {
    if (pathname === prefix || pathname.startsWith(prefix + "/")) {
      return loginPath;
    }
  }
  // Default fallback login page
  return "/login";
}

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = request.nextUrl;

  // Always allow public paths (exact match or prefix)
  if (publicPaths.some((path) => pathname === path || pathname.startsWith(path + "/"))) {
    return NextResponse.next();
  }

  // Check if the path is a protected route
  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  if (!isProtected) {
    // Static assets, API routes, etc. — let them pass
    return NextResponse.next();
  }

  // Not authenticated — redirect to context-aware login
  if (!token) {
    const loginUrl = getLoginRedirect(pathname);
    const redirectUrl = new URL(loginUrl, request.url);
    // Preserve the original destination so we can redirect back after login
    redirectUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Authenticated — check admin paths
  if (pathname.startsWith("/admin")) {
    if ((token.role as string) !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)" ],
};
