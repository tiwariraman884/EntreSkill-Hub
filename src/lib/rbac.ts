import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { Session } from "next-auth";

export async function requireAuth() {
  const session = (await getServerSession(authOptions)) as Session | null;
  if (!session?.user?.id) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { session };
}

export function requireRole(session: Session | null, role: string) {
  if ((session?.user?.role as string) !== role) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}

export function isAdmin(session: Session | null) {
  return (session?.user?.role as string) === "admin";
}

export function isMentor(session: Session | null) {
  return (session?.user?.role as string) === "mentor" || (session?.user?.role as string) === "admin";
}
