import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";
import { LearningResource, Feedback } from "@/models";

describe("resources service", () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterEach(async () => {
    await LearningResource.deleteMany({});
    await Feedback.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("creates a resource with pending status", async () => {
    const { createResource } = await import("@/domains/resources/service");
    const userId = new mongoose.Types.ObjectId();
    const resource = await createResource({
      title: "Test Resource",
      type: "article",
      url: "https://example.com",
      tags: ["tag1"],
      uploadedBy: userId.toString(),
    });

    expect(resource.approvalStatus).toBe("pending");
    expect(resource.title).toBe("Test Resource");
  });

  it("updates resource status", async () => {
    const { createResource, updateResourceStatus } = await import("@/domains/resources/service");
    const userId = new mongoose.Types.ObjectId();
    const resource = await createResource({
      title: "Test Resource",
      type: "article",
      url: "https://example.com",
      tags: [],
      uploadedBy: userId.toString(),
    });

    const updated = await updateResourceStatus(resource._id.toString(), "approved");
    expect(updated.approvalStatus).toBe("approved");
  });

  it("throws when updating non-existent resource", async () => {
    const { updateResourceStatus } = await import("@/domains/resources/service");
    const fakeId = new mongoose.Types.ObjectId().toString();
    await expect(updateResourceStatus(fakeId, "approved")).rejects.toThrow("Resource not found");
  });

  it("creates feedback for resource", async () => {
    const { createResourceFeedback } = await import("@/domains/resources/service");
    const resourceId = new mongoose.Types.ObjectId();
    const userId = new mongoose.Types.ObjectId();

    const feedback = await createResourceFeedback({
      resourceId: resourceId.toString(),
      submittedBy: userId.toString(),
      rating: 5,
      comment: "Great!",
    });

    expect(feedback.rating).toBe(5);
    expect(feedback.comment).toBe("Great!");
  });
});
