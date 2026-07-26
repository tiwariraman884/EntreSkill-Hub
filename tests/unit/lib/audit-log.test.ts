import mongoose from "mongoose";
import { writeAuditLog } from "@/lib/audit-log";
import { connectToDatabase } from "@/lib/mongoose";

describe("writeAuditLog", () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterEach(async () => {
    await mongoose.models.AuditLog?.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("writes an audit log entry with reason", async () => {
    const actorId = new mongoose.Types.ObjectId().toString();
    const targetUserId = new mongoose.Types.ObjectId().toString();
    
    const log = await writeAuditLog({
      actorId,
      action: "test_action",
      targetUserId,
      reason: "test reason",
    });

    expect(log.actorId.toString()).toBe(actorId);
    expect(log.action).toBe("test_action");
    expect(log.targetUserId.toString()).toBe(targetUserId);
    expect(log.reason).toBe("test reason");
  });
});
