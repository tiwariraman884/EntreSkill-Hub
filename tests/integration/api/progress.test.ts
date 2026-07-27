import { markStepComplete } from "@/domains/roadmaps/service";
import { connectToDatabase } from "@/lib/mongoose";

describe("POST /api/progress/[roadmapId]/step/[stepId]/complete", () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  it("marks step complete and returns updated progress", async () => {
    const uid = "user123";
    const rid = "roadmap123";
    const sid = "step001";

    const progress = await markStepComplete(uid, rid, sid);
    expect(progress.completedStepIds).toContain(sid);
    expect(progress.completionPercent).toBeGreaterThanOrEqual(10);

    const double = await markStepComplete(uid, rid, sid);
    expect(double.completedStepIds.length).toBe(1);
  });
});
