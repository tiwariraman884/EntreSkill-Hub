import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";
import { User, BusinessIdea, LearningResource, MentorProfile } from "@/models";

describe("admin service", () => {
  beforeAll(async () => {
    await connectToDatabase();
  });

  afterEach(async () => {
    await User.deleteMany({});
    await BusinessIdea.deleteMany({});
    await LearningResource.deleteMany({});
    await MentorProfile.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("getAllUsers returns users", async () => {
    const { getAllUsers } = await import("@/domains/admin/service");
    await User.create({
      name: "Admin User",
      email: "admin-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "user",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    const users = await getAllUsers();
    expect(users.length).toBeGreaterThan(0);
  });

  it("getAllUsers filters by role", async () => {
    const { getAllUsers } = await import("@/domains/admin/service");
    await User.create({
      name: "Mentor User",
      email: "mentor-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "mentor",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    const users = await getAllUsers({ role: "mentor" });
    expect(users.length).toBeGreaterThan(0);
    users.forEach((u) => expect(u.role).toBe("mentor"));
  });

  it("getPendingResources returns pending resources", async () => {
    const { getPendingResources } = await import("@/domains/admin/service");

    const user = await User.create({
      name: "Uploader",
      email: "uploader-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "user",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    await LearningResource.create({
      title: "Pending Resource",
      type: "article",
      url: "https://example.com",
      uploadedBy: user._id,
      approvalStatus: "pending",
      tags: [],
    });

    const pending = await getPendingResources();
    expect(pending.length).toBeGreaterThan(0);
    expect(pending[0].approvalStatus).toBe("pending");
  });

  it("getAnalytics returns counts", async () => {
    const { getAnalytics } = await import("@/domains/admin/service");

    await User.create({
      name: "Analytics User",
      email: "analytics-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "user",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    const analytics = await getAnalytics();
    expect(analytics.totalUsers).toBeGreaterThanOrEqual(1);
    expect(analytics.totalIdeas).toBeGreaterThanOrEqual(0);
    expect(analytics.totalResources).toBeGreaterThanOrEqual(0);
    expect(analytics.totalMentors).toBeGreaterThanOrEqual(0);
  });

  it("suspendUser changes role to suspended", async () => {
    const { suspendUser } = await import("@/domains/admin/service");

    const user = await User.create({
      name: "Suspend User",
      email: "suspend-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "user",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    const suspended = await suspendUser(user._id.toString());
    expect(suspended.role).toBe("suspended");
  });

  it("suspendUser throws for non-existent user", async () => {
    const { suspendUser } = await import("@/domains/admin/service");
    await expect(suspendUser(new mongoose.Types.ObjectId().toString())).rejects.toThrow("User not found");
  });

  it("approveResource changes approval status", async () => {
    const { approveResource } = await import("@/domains/admin/service");

    const user = await User.create({
      name: "Approver",
      email: "approver-" + Date.now() + "@example.com",
      passwordHash: "stub",
      role: "user",
      skills: [],
      interests: [],
      location: { state: "Karnataka", district: "Bengaluru", isRural: false },
    });

    const resource = await LearningResource.create({
      title: "Approvable Resource",
      type: "article",
      url: "https://example.com",
      uploadedBy: user._id,
      approvalStatus: "pending",
      tags: [],
    });

    const approved = await approveResource(resource._id.toString(), "approved");
    expect(approved.approvalStatus).toBe("approved");
  });

  it("approveResource throws for non-existent resource", async () => {
    const { approveResource } = await import("@/domains/admin/service");
    await expect(approveResource(new mongoose.Types.ObjectId().toString(), "approved")).rejects.toThrow("Resource not found");
  });
});
