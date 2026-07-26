import { connectToDatabase } from "@/lib/mongoose";
import { AuditLog } from "@/models";

export async function writeAuditLog(input: {
  actorId: string;
  action: string;
  targetUserId: string;
  reason?: string;
}) {
  await connectToDatabase();
  return AuditLog.create({
    actorId: input.actorId,
    action: input.action,
    targetUserId: input.targetUserId,
    reason: input.reason || "",
  });
}
